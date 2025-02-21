import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSuccessResponseDto } from '../bases/base-response.dto';

@Injectable()
export class TransformResponseInterceptor<T>
  implements NestInterceptor<T, BaseSuccessResponseDto<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<BaseSuccessResponseDto<T>> {
    return next
      .handle()
      .pipe(map((data) => BaseSuccessResponseDto.build(data)));
  }
}
