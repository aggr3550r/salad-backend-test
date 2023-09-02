import { Column } from 'typeorm';
import { BaseModel } from './base.model';
import { Gender } from '../enums/gender.enum';

export class UserBaseModel extends BaseModel {
  @Column({ nullable: false, type: 'text' })
  name: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  is_moderator: boolean;

  @Column({ nullable: false })
  age: number;

  @Column({ type: 'enum', enum: Gender, nullable: false })
  gender: Gender;

  @Column()
  email: string;

  @Column()
  password: string;
}
