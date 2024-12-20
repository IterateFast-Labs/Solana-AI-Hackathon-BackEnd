import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
//import { i18nValidationMessage } from 'nestjs-i18n';
import { PaginationDto } from 'src/commons/dtos/pagination.dto';

export class GetQuestsFilterDto {
  /*
  @IsString({
    message: i18nValidationMessage('validation.IS_STRING', {
      args: { property: 'title' },
    }),
  })
  */
  @ApiProperty()
  @IsOptional()
  title: string;
}

export class GetQuestsDto extends PaginationDto {
  @ValidateNested()
  @Type(() => GetQuestsFilterDto)
  filter: GetQuestsFilterDto;
}
