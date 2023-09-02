import { IsOptional, IsString } from 'class-validator';

export class UpdateReviewDTO {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content: string;
}
