import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdatePageDTO {
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;
}
