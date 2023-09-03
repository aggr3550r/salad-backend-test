import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePageDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  public readonly name: string;

  @IsOptional()
  @IsString()
  @MaxLength(400)
  public readonly page_info: string;
}
