import { Entity, Column, Index } from 'typeorm';
import BaseEntity from './base.entity';
import RoleNames from '../enums/RoleNames';

@Entity('users')
export class User extends BaseEntity {
  @Index()
  @Column({
    nullable: false,
  })
  firstName: string;

  @Index()
  @Column({
    nullable: false,
  })
  lastName: string;

  @Index()
  @Column({
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: RoleNames,
    nullable: false,
    default: RoleNames.USER,
  })
  role: RoleNames;

  @Column({
    nullable: true,
  })
  videoURL: string;

  @Column({
    nullable: true,
  })
  profileId: string;
}
