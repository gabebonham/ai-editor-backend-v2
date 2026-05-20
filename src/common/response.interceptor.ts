import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponseDto } from './api-response.dto';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return new ApiResponseDto(true, 'Request successful', data);
      }),
    );
  }
}