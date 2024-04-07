import { Injectable } from '@nestjs/common';
import { CountriesSeeder } from './seeders';
import { SeederInterface } from './seeders/seeder.interface';

@Injectable()
export class SeedService {
  private readonly seeders: SeederInterface[] = [];

  constructor(private readonly countriesSeeder: CountriesSeeder) {
    this.seeders = [this.countriesSeeder];
  }

  async seed() {
    await this.seeders.map(async (seed) => {
      await seed.seed();
    });
  }
}
