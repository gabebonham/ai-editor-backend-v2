import { Body, Controller, Get, Logger, Post, Query, Res, UseGuards } from '@nestjs/common';
import { ClaudeService } from './claude.service';
import { AuthGuard } from 'src/common/auth.guard';
import { ClaudeAskRequest } from './claude-ask.request';
import type { Response } from 'express';

@Controller('claude')
export class ClaudeController {
  private readonly logger: Logger = new Logger(ClaudeController.name);
  constructor(private readonly claudeService: ClaudeService) {}

  @Post('ask')
  @UseGuards(AuthGuard)
  async getPaginated(@Body() dto: ClaudeAskRequest, @Res() res:Response): Promise<void> {
    await this.claudeService.streamResponse(dto.prompt, res);
  }
}
