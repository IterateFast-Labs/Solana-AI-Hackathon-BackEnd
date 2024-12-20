import { Module } from '@nestjs/common';
import { PeriodicService } from './periodic.service';

@Module({
  providers: [PeriodicService],
})
export class PeriodicModule {}
