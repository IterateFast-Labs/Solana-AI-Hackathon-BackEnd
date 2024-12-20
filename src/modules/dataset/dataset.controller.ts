import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/commons/decorators/request/user.decorator';
import { AuthGuard } from 'src/commons/guards/auth.guard';
import { AuthUser } from 'src/types';
import { DatasetService } from './dataset.service';
@Controller('dataset')
@ApiTags('Dataset')
@UseGuards(AuthGuard)
@ApiBearerAuth('accessToken')
export class DatasetController {
  constructor(private readonly datasetService: DatasetService) {}

  @Get('/playable')
  public async getPlayableDataset(@User() user: AuthUser) {
    return await this.datasetService.getPlayableDataset(user.id);
  }

  @Get('/:datasetId')
  public async getDataset(
    @User() user: AuthUser,
    @Param('datasetId') datasetId: string,
  ) {
    return await this.datasetService.getDataset(user.id, datasetId);
  }
}
