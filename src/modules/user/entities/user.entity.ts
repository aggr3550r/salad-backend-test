import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { Review } from '../../review/entities/review.entity';
import { UserBaseModel } from '../../../models/user-base.model';
import { Page } from '../../page/entites/page.entity';

@Entity('user')
export class User extends UserBaseModel {
  @OneToMany(() => Review, (review) => review.submitter, { nullable: true })
  reviews: Review[];

  @ManyToOne(() => Page, (page) => page.users)
  page: Page;
}
