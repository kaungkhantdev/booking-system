import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Purchases } from './purchases.entity';

@Entity()
export class Packages {
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
  type: string;

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
  })
  price: number;

  @OneToMany(() => Purchases, (purchase) => purchase.package)
  purchase: Purchases;

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
