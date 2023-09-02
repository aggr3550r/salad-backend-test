import { Entity, Column, OneToMany } from 'typeorm';
import { BaseModel } from '../../../models/base.model';
import { UserRole } from '../../../enums/user-role.enum';

@Entity('user')
export class User extends BaseModel {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  full_name: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  //   @OneToMany(() => File, (file) => file.owner, { nullable: true })
  //   files: File[];

  //   @OneToMany(() => Folder, (folder) => folder.owner, { nullable: true })
  //   folders: Folder[];
}
