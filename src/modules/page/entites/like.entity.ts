import { Column, Entity } from 'typeorm';
import { BaseModel } from '../../../models/base.model';

@Entity('like')
export class Like extends BaseModel {
  @Column({ nullable: false })
  likerId: string;

  @Column({ nullable: false })
  pageId: string;
}
