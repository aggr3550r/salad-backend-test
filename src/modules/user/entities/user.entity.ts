import { Entity, Column, OneToMany } from 'typeorm';
import { BaseModel } from '../../../models/base.model';
import { UserType } from '../../../enums/user-type.enum';
import { Review } from '../../review/entities/review.entity';

@Entity('user')
export class User extends BaseModel {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  full_name: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: UserType,
    default: UserType.USER,
  })
  role: UserType;

  @OneToMany(() => Review, (review) => review.owner, { nullable: true })
  reviews: Review[];
}
