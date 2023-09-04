import { Column } from 'typeorm';
import { BaseModel } from './base.model';
import { Gender } from '../enums/gender.enum';

export class UserBaseModel extends BaseModel {
  @Column({ nullable: false, type: 'text' })
  name: string;


  @Column({ nullable: false })
  age: number;

  @Column({ type: 'enum', enum: Gender, nullable: false })
  gender: Gender;

  @Column()
  email: string;

  @Column()
  password: string;
}
