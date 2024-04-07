import { Injectable, NotFoundException } from '@nestjs/common';
import { CountryRepository } from './country.repository';
import { Countries } from '@database/entities';
import { CreateCountry, UpdateCountry } from './interfaces/country';

@Injectable()
export class CountryService {
  constructor(private countryRepository: CountryRepository) {}

  async createCountry(data: CreateCountry): Promise<Countries> {
    return await this.countryRepository.create(data);
  }

  async findCountries(): Promise<Countries[]> {
    return await this.countryRepository.findAll();
  }

  async findById(id: string): Promise<Countries> {
    return await this.countryRepository.findOneBy({ id });
  }

  async updateCountry(id: number, data: UpdateCountry) {
    const user = await this.countryRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`Sorry, this country is not found.`);
    }

    return await this.countryRepository.update(id, data);
  }
}
