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
        name: 'United States',
        country_code: 'US',
        timezone_gmt: '-6.00',
        timezone_name: '(GMT-06:00)-Central Time (US & Canada)',
      },
      {
        name: 'Singapore',
        country_code: 'SG',
        timezone_gmt: '8.00',
        timezone_name: '(GMT+08:00)- Singapore)',
      },
      {
        name: 'Myanmar',
        country_code: 'MM',
        timezone_gmt: '6.50',
        timezone_name: '(GMT+06:30)-Rangoon',
      },
    );

    await data.forEach(async (obj) => {
      await this.repo.insert(obj);
    });
  }
}
