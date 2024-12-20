import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter {
  constructor() {}

  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const error = exception.getResponse() as
      | string
      | { error: string; statusCode: number; message: string | string[] };

    response.statusMessage =
      typeof error === 'object' && typeof error.message === 'string'
        ? error.message
        : (response.statusMessage = JSON.stringify(error));

    if (typeof error === 'string') {
      // 에러 자체가 string
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: error,
      });
    } else {
      // 에러 자체는 객체인데,
      if (typeof error.error === 'string') {
        // 에러 내부에 error 가 string 일 때
        let errorStackLines = error.error.trim().split('\n');

        if (errorStackLines.length > 1) {
          let parsedErrorStack: string = '';
          for (let line of errorStackLines) {
            parsedErrorStack += '\n' + line.trim();
          }
          response['parsedErrorStack'] = parsedErrorStack;
        } else {
          response['parsedErrorStack'] = error.error;
        }
      } else {
        // 에러 자체는 객체인데, error 가 string 이 아닐 때
        response['parsedErrorStack'] = JSON.stringify(error);
      }

      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        message: error.message,
      });
    }
  }
}
