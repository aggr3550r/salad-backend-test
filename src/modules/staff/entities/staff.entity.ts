import { Column, Entity } from 'typeorm';
import { UserBaseModel } from '../../../models/user-base.model';

@Entity('staff')
export class Staff extends UserBaseModel {
  @Column({ type: 'text', default: '' })
  home_town: string;
}
