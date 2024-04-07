import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Countries } from './countries.entity';
import { Purchases } from './purchases.entity';
import { Bookings } from './booking.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  password: string;

  @Column({
    type: 'int',
    default: 0,
  })
  credit: number;

  @Column()
  email_verify: number;

  @ManyToOne(() => Countries, (countries) => countries.user)
  country: Countries;

  @OneToMany(() => Purchases, (purchases) => purchases.user)
  purchase: Purchases;

  @OneToMany(() => Bookings, (booking) => booking.user)
  booking: Bookings;

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
