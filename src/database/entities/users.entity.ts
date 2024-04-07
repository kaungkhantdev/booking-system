import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Countries } from './countries.entity';

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

  @ManyToOne(() => Countries, (countries) => countries.user)
  country: Countries;
}
