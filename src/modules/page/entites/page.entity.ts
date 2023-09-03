import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseModel } from '../../../models/base.model';
import { Review } from '../../review/entities/review.entity';
import { User } from '../../user/entities/user.entity';

@Entity('page')
export class Page extends BaseModel {
  @Column({ nullable: false, type: 'text' })
  @Index({ unique: true })
  name: string;

  @Column({ type: 'text', nullable: false, default: '' })
  page_info: string;

  @Column({ nullable: false, default: 0 })
  likes: number;

  @Column({ type: 'float', nullable: false, default: 0.0 })
  avg_rating: number;

  // total amount of ratings accrued on a page
  @Column({ type: 'float', nullable: false, default: 0.0 })
  total_rating_amount: number;

  // number of times page has been rated
  @Column({ nullable: false, default: 0 })
  total_rated_times: number;

  @OneToMany(() => Review, (reviews) => reviews.page)
  reviews: Review[];

  @OneToMany(() => User, (users) => users.page)
  users: User[];
}
