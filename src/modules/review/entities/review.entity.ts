import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '../../../models/base.model';
import { User } from '../../user/entities/user.entity';
import { Page } from '../../page/entites/page.entity';

@Entity('review')
export class Review extends BaseModel {
  @Column({ type: 'text', default: '' })
  body: string;

  @ManyToOne(() => User, (owner) => owner.reviews)
  @JoinColumn({ name: 'submitterId' })
  submitter: User;

  @Column()
  submitterId: string;

  @ManyToOne(() => Page, (page) => page.reviews)
  @JoinColumn({ name: 'pageId' })
  page: Page;

  @Column()
  pageId: string;

  @Column({ type: 'text', default: '' })
  summary: string;

  @Column({ type: 'float', nullable: false, default: 0.0 })
  rating: number;
}
