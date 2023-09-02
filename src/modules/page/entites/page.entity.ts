import { Entity } from 'typeorm';
import { BaseModel } from '../../../models/base.model';

@Entity('page')
export class Page extends BaseModel {}
