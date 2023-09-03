import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  Max,
} from 'class-validator';

export class RatingDTO {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Max(5.0)
  avg_rating: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  total_rating_amount?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  total_rated_times?: number;
}
