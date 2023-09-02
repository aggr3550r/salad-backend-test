import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReviewDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
