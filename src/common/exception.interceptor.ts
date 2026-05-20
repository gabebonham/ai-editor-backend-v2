import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Request, Response } from 'express';

import { ApiResponseDto } from './api-response.dto';

@Catch()
export class GlobalExceptionFilter
  implements ExceptionFilter
{
  catch(
    exception: unknown,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();

    const response =
      ctx.getResponse<Response>();

    const request =
      ctx.getRequest<Request>();

    let status =
      HttpStatus.INTERNAL_SERVER_ERROR;

    let message: string | string[] =
      'Internal server error';

    let error: any = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();

      const exceptionResponse =
        exception.getResponse();

      if (
        typeof exceptionResponse === 'string'
      ) {
        message = exceptionResponse;
      } else {
        const responseObject =
          exceptionResponse as any;

        message =
          responseObject.message || message;

        error = responseObject.error;
      }
    }

    response.status(status).json(
      new ApiResponseDto(
        false,
        message,
        {
          statusCode: status,
          path: request.url,
          method: request.method,
          timestamp:
            new Date().toISOString(),
          error,
        },
      ),
    );
  }
}