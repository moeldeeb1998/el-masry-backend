import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import BaseEntity from './base.entity';

@Entity('tests')
export class Test extends BaseEntity {
  @Column({
    nullable: true,
  })
  title: string;

  @PrimaryGeneratedColumn()
  no: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  snippet: string;

  @Column({
    nullable: false,
    default: true,
  })
  isActive: boolean;
}
