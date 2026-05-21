import { Injectable } from '@nestjs/common';
import Anthropic from '@anthropic-ai/sdk';
import { Response } from 'express';

@Injectable()
export class ClaudeService {
  private client: Anthropic;

  constructor() {
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  async streamResponse(question: string, res: Response): Promise<void> {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const sendEvent = (event: string, data: object) => {
      res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
    };

    try {
      const stream = this.client.messages.stream({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        messages: [{ role: 'user', content: question }],
      });

      for await (const chunk of stream) {
        if (
          chunk.type === 'content_block_delta' &&
          chunk.delta.type === 'text_delta'
        ) {
          sendEvent('delta', { text: chunk.delta.text });
        }
      }

      const finalMessage = await stream.finalMessage();
      sendEvent('done', { usage: finalMessage.usage });
    } catch (error: any) {
      sendEvent('error', { message: error.message });
    } finally {
      res.end();
    }
  }
}