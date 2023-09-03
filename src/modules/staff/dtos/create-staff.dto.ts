import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { CreateUserDTO } from '../../user/dtos/create-user.dto';
import { BloodType } from '../../../enums/blood-type.enum';

export class CreateStaffDTO extends CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  public home_town?: string;

  @IsNotEmpty()
  @IsEnum(BloodType)
  public readonly blood_type: BloodType;
}
