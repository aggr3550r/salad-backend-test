import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  public name?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  public age?: number;

  @IsBoolean()
  @IsOptional()
  public is_active?: boolean;

  @IsOptional()
  @IsBoolean()
  public is_moderator?: boolean;
}
