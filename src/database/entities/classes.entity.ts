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
import { Bookings } from './booking.entity';

@Entity()
export class Classes {
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
  unit: string;

  @Column({
    type: 'int',
  })
  duration: number;

  @Column({
    type: 'int',
  })
  credit: number;

  @Column({
    type: 'int',
    default: 5,
  })
  user_limit: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  start_time: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  end_time: string;

  @ManyToOne(() => Countries, (country) => country.class)
  country: Countries;

  @OneToMany(() => Bookings, (booking) => booking.class)
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
