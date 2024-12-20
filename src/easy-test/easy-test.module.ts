import { Module } from '@nestjs/common';
import { EasyTestController } from './easy-test.controller';
import { EasyTestService } from './easy-test.service';

@Module({
  controllers: [EasyTestController],
  providers: [EasyTestService],
})
export class EasyTestModule {}
