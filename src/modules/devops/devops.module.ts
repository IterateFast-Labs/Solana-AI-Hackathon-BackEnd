import { Module } from '@nestjs/common';
import { DevopsController } from '@modules/devops/devops.controller';

@Module({
  controllers: [DevopsController],
})
export class DevopsModule {}
