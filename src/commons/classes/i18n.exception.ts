import { HttpException } from '@nestjs/common';

export class I18nException extends HttpException {
  constructor(arg: {
    message: string;
    args: string;
    isI18nError: boolean;
    status: number;
  }) {
    super(JSON.stringify(arg), arg.status);
  }
}
