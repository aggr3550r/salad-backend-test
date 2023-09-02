import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserType } from '../../../enums/user-type.enum';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsEmail()
  public readonly email: string;

  @IsNotEmpty()
  @MinLength(8)
  public readonly password: string;

  @IsNotEmpty()
  @IsString()
  public readonly full_name: string;

  @IsOptional()
  @IsEnum(UserType)
  public role?: UserType = UserType.USER;
}
