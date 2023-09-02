import { Column, Entity, ManyToOne, Unique } from 'typeorm';
import { BaseModel } from '../../../models/base.model';
import { User } from '../../user/entities/user.entity';

@Entity('review')
@Unique(['title'])
export class Review extends BaseModel {
  @Column({ type: 'text', default: '' })
  title: string;

  @Column({ type: 'text', default: '' })
  content: string;

  @ManyToOne(() => User, (owner) => owner.reviews)
  owner: User;
}
