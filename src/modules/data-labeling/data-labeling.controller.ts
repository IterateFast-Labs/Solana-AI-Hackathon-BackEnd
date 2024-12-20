import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/commons/decorators/request/user.decorator';
import { AuthGuard } from 'src/commons/guards/auth.guard';
import { AuthUser } from 'src/types';
import { DataLabelingService } from './data-labeling.service';
import { PostDataLabelingDto } from './dtos/post-data-labeling-dto';
@Controller('dataLabeling')
@ApiTags('DataLabeling')
@UseGuards(AuthGuard)
@ApiBearerAuth('accessToken')
export class DataLabelingController {
  constructor(private readonly dataLabelingService: DataLabelingService) {}

  @Post('/')
  public async dataLabeling(
    @User() user: AuthUser,
    @Body() postDataLabelingDto: PostDataLabelingDto,
  ) {
    return await this.dataLabelingService.dataLabeling(
      user.id,
      postDataLabelingDto,
    );
  }
}
