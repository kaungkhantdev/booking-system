import { Injectable } from '@nestjs/common';
import { SeederInterface } from './seeder.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Classes, Countries } from '@database/entities';
import { Repository } from 'typeorm';
import { PACKAGE_UNIT } from '@config/constants';
import * as moment from 'moment-timezone';

@Injectable()
export class ClassesSeeder implements SeederInterface {
  constructor(
    @InjectRepository(Classes)
    private readonly repo: Repository<Classes>,
    @InjectRepository(Countries)
    private readonly countriesRepo: Repository<Countries>,
  ) {}

  async seed(): Promise<void> {
    const data: Partial<Classes>[] = [];

    data.push(
      {
        name: 'Learn guitar finger-style',
        duration: 1,
        unit: PACKAGE_UNIT.MONTH,
        start_time: moment.tz('Asia/Bangkok').format(),
        end_time: moment.tz('Asia/Bangkok').add(1, 'month').format(),
        credit: 20,
        country: await this.countriesRepo.findOneById(1),
      },
      {
        name: 'Learn Javascript',
        duration: 1,
        unit: PACKAGE_UNIT.MONTH,
        start_time: moment.tz('Asia/Singapore').format(),
        end_time: moment.tz('Asia/Bangkok').add(1, 'month').format(),
        credit: 100,
        country: await this.countriesRepo.findOneById(3),
      },
      {
        name: 'Learn HTML',
        duration: 1,
        unit: PACKAGE_UNIT.DAY,
        start_time: moment.tz('Asia/Yangon').format(),
        end_time: moment.tz('Asia/Bangkok').clone().add(1, 'days').format(),
        credit: 10,
        country: await this.countriesRepo.findOneById(2),
      },
    );

    data.forEach(async (obj) => {
      await this.repo.insert(obj);
    });
  }
}
