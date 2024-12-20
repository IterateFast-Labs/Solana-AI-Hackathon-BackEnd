import { IsInt, IsNotEmpty, Min } from 'class-validator';

/**
 * @summary 페이지네이션 DTO
 */
export class PaginationDto {
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  page: number = 1;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  size: number = 10;
}
