import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Countries } from '@database/entities';
import { Repository } from 'typeorm';
import { CreateCountry } from './interfaces/country';

@Injectable()
export class CountryRepository {
  constructor(
    @InjectRepository(Countries)
    private readonly repo: Repository<Countries>,
  ) {}

  async create(data: CreateCountry): Promise<Countries> {
    try {
      const country = new Countries();

      country.name = data.name;
      country.country_code = data.country_code;

      country.timezone_gmt = data.timezone_gmt;
      country.timezone_name = data.timezone_name;

      return await this.repo.save(country);
    } catch (error) {
      const err = error as Error;
      throw new NotAcceptableException(err.message);
    }
  }

  async findAll(): Promise<Countries[]> {
    try {
      return await this.repo.find({
        select: { id: true, name: true, country_code: true },
      });
    } catch (error) {
      const err = error as Error;
      throw new NotAcceptableException(err.message);
    }
  }

  async findOneBy(data: object): Promise<Countries> {
    try {
      return await this.repo.findOne({
        where: data,
      });
    } catch (error) {
      const err = error as Error;
      throw new NotAcceptableException(err.message);
    }
  }

  async update(id: number, attrs: Partial<Countries>): Promise<Countries> {
    try {
      const country = await this.repo.findOneById(id);

      Object.assign(country, attrs);
      await this.repo.save(country);

      return this.findOneBy({ id });
    } catch (error) {
      const err = error as Error;
      throw new NotAcceptableException(err.message);
    }
  }
}
