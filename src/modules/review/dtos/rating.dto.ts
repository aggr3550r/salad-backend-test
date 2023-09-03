import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class RatingDTO {
  // ratings should not be open for modification from the outside
  @IsOptional()
  @IsNumber()
  @IsPositive()
  avg_rating?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  total_rating_amount?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  total_rated_times?: number;
}
