import { Module } from '@nestjs/common';
import { DataLabelingController } from './data-labeling.controller';
import { DataLabelingService } from './data-labeling.service';

@Module({
  controllers: [DataLabelingController],
  providers: [DataLabelingService],
})
export class DataLabelingModule {}
