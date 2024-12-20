import { Controller, Get, Query } from '@nestjs/common';
import { EasyTestService } from './easy-test.service';

@Controller('easy-test')
export class EasyTestController {
  constructor(private readonly easyTestService: EasyTestService) {}

  @Get('login')
  public async login(@Query('walletAddress') walletAddress: string) {
    return await this.easyTestService.login(walletAddress);
  }
}
