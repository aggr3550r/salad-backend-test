import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Gender } from '../../../enums/gender.enum';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsEmail()
  public readonly email: string;

  @IsNotEmpty()
  @MinLength(8)
  public readonly password: string;

  @IsNotEmpty()
  @IsString()
  public readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  public readonly age: number;

  @IsNotEmpty()
  @IsEnum(Gender)
  public readonly gender: Gender;

}
