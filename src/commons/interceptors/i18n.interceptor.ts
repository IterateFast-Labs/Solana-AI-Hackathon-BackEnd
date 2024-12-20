import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { I18nException } from '../classes/i18n.exception';

@Injectable()
export class I18nInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(async (err) => {
        const error = err.response;
        const errorMessage: string | string[] = error.message;
        const parsedErrorMessage = Array.isArray(errorMessage)
          ? errorMessage[0]
          : errorMessage;

        if (parsedErrorMessage.includes('|')) {
          const [message, args] = parsedErrorMessage.split('|');
          error.message = message;

          throw new I18nException({
            message,
            args,
            isI18nError: true,
            status: error.statusCode,
          });
        }

        throw err;
      }),
    );
  }
}
