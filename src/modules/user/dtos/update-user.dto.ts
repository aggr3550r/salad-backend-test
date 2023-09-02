import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserType } from '../../../enums/user-type.enum';

export class UpdateUserDTO {
  @IsOptional()
  @IsEnum(UserType)
  public role?: UserType;

  @IsOptional()
  @IsString()
  public name?: string;

  @IsBoolean()
  @IsOptional()
  public is_active?: boolean;
}
