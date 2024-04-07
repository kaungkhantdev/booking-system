import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './users.entity';
import { Classes } from './classes.entity';
import { BookingLogs } from './booking-log.entity';

@Entity()
export class Bookings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'boolean',
  })
  cancel: boolean;

  @Column({
    type: 'boolean',
  })
  success: boolean;

  @ManyToOne(() => Users, (user) => user.booking)
  user: Users;

  @ManyToOne(() => Classes, (cls) => cls.booking)
  class: Classes;

  @OneToMany(() => BookingLogs, (book_log) => book_log.booking)
  booking_log: BookingLogs;

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
