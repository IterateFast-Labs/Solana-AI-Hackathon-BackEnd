import { Module } from '@nestjs/common';
import { ClickerController } from './clicker.controller';
import { ClickerService } from './clicker.service';

@Module({
  controllers: [ClickerController],
  providers: [ClickerService],
})
export class ClickerModule {}
