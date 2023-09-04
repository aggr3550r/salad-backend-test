import { Column, Entity } from 'typeorm';
import { BaseModel } from '../../../models/base.model';

@Entity('rating')
export class Rating extends BaseModel {
  @Column({ nullable: false })
  raterId: string;

  @Column({ nullable: false })
  pageId: string;

  @Column({ nullable: false })
  rating: number;
}
