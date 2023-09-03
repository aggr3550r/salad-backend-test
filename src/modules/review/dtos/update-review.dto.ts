import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateReviewDTO {
  @IsOptional()
  @IsString()
  @MaxLength(300)
  body?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  summary?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
