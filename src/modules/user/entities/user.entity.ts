import { Entity, Column, OneToMany } from 'typeorm';
import { BaseModel } from '../../../models/base.model';
import { UserType } from '../../../enums/user-type.enum';
import { Review } from '../../review/entities/review.entity';
import { UserBaseModel } from '../../../models/user-base.model';

@Entity('user')
export class User extends UserBaseModel {
  @OneToMany(() => Review, (review) => review.owner, { nullable: true })
  reviews: Review[];
}
