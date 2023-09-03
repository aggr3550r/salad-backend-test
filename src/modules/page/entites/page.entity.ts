import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from '../../../models/base.model';
import { Review } from '../../review/entities/review.entity';
import { User } from '../../user/entities/user.entity';

@Entity('page')
export class Page extends BaseModel {
  @Column({ nullable: false, default: 0 })
  likes: number;

  @OneToMany(() => Review, (reviews) => reviews.page)
  reviews: Review[];

  @OneToMany(() => User, (users) => users.page)
  users: User[];
}
