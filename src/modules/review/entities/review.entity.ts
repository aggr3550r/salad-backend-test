import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from '../../../models/base.model';
import { User } from '../../user/entities/user.entity';
import { Page } from '../../page/entites/page.entity';

@Entity('review')
export class Review extends BaseModel {
  @Column({ type: 'text', default: '' })
  body: string;

  @ManyToOne(() => User, (owner) => owner.reviews)
  owner: User;

  @ManyToOne(() => Page, (page) => page.reviews)
  page: Page;

  @Column({ type: 'text', default: '' })
  summary: string;

  @Column({ type: 'float', nullable: false, default: 0.0 })
  avg_rating: number;

  @Column({ type: 'float', nullable: false, default: 0.0 })
  total_rating_amount: number;

  // number of times any review has been rated
  @Column({ nullable: false, default: 0 })
  total_rated_times: number;
}
