import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from '../../../models/base.model';
import { User } from '../../user/entities/user.entity';

@Entity('review')
export class Review extends BaseModel {
  @Column({ type: 'text', default: '' })
  content: string;

  @ManyToOne(() => User, (owner) => owner.reviews)
  owner: User;
}
