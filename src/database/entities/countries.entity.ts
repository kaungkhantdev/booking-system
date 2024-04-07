import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class Countries {
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
  country_code: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  timezone_gmt: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  timezone_name: string;

  @OneToMany(() => Users, (users) => users.country)
  user: Users[];
}
