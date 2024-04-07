import { Injectable } from '@nestjs/common';
import { SeederInterface } from './seeder.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Countries } from '@database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class CountriesSeeder implements SeederInterface {
  constructor(
    @InjectRepository(Countries)
    private readonly repo: Repository<Countries>,
  ) {}

  async seed(): Promise<void> {
    const data: Partial<Countries>[] = [];

    data.push(
      {
        name: 'Thailand',
        country_code: 'TH',
        timezone: 'Asia/Bangkok',
      },
      {
        name: 'Singapore',
        country_code: 'SG',
        timezone: 'Asia/Singapore',
      },
      {
        name: 'Myanmar',
        country_code: 'MM',
        timezone: 'Asia/Yangon',
      },
    );

    await data.forEach(async (obj) => {
      await this.repo.insert(obj);
    });
  }
}
