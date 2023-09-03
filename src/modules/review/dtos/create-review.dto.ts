import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateReviewDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(300)
  body: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  summary: string;

  @IsNotEmpty()
  @IsString()
  pageId: string;

  @IsNotEmpty()
  @IsNumber()
  rating: number;
}
