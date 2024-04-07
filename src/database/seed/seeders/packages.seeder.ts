import { Injectable } from '@nestjs/common';
import { SeederInterface } from './seeder.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Packages } from '@database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class PackagesSeeder implements SeederInterface {
  constructor(
    @InjectRepository(Packages)
    private readonly repo: Repository<Packages>,
  ) {}

  async seed(): Promise<void> {
    const data: Partial<Packages>[] = [];

    data.push(
      {
        name: 'Basic package',
        type: 'basic',
        credit: 100,
        price: 100,
        duration: 10,
        unit: 'days',
      },
      {
        name: 'Pro package',
        type: 'pro',
        credit: 1000,
        price: 1000,
        duration: 1,
        unit: 'month',
      },
      {
        name: 'Gold package',
        type: 'gold',
        credit: 5000,
        price: 3000,
        duration: 3,
        unit: 'months',
      },
    );

    await data.forEach(async (obj) => {
      await this.repo.insert(obj);
    });
  }
}
