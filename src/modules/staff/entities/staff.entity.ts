import { Column, Entity } from 'typeorm';
import { UserBaseModel } from '../../../models/user-base.model';
import { BloodType } from '../../../enums/blood-type.enum';

@Entity('staff')
export class Staff extends UserBaseModel {
  @Column({ type: 'text', default: '' })
  home_town: string;

  @Column({ type: 'enum', enum: BloodType, nullable: false })
  blood_type: BloodType;
}
