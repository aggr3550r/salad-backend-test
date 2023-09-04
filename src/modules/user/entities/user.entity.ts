import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Review } from '../../review/entities/review.entity';
import { UserBaseModel } from '../../../models/user-base.model';
import { Page } from '../../page/entites/page.entity';

@Entity('user')
export class User extends UserBaseModel {
  @Column({ type: 'boolean', nullable: false, default: false })
  is_moderator: boolean;

  @OneToMany(() => Review, (review) => review.submitter, { nullable: true })
  reviews: Review[];

  @ManyToOne(() => Page, (page) => page.users)
  page: Page;
}
