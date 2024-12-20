import { Controller, Get } from '@nestjs/common';

@Controller('devops')
export class DevopsController {
  @Get('ping')
  public pong(): string {
    return 'pong';
  }

  @Get('version')
  public version(): string {
    return process.env.VERSION || 'unknown';
  }
}
