import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './users.entity';
import { Packages } from './packages.entity';

@Entity()
export class Purchases {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  expired_time: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  remark: string;

  @ManyToOne(() => Users, (user) => user.purchase)
  user: Users;

  @ManyToOne(() => Packages, (pak) => pak.purchase)
  package: Packages;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
