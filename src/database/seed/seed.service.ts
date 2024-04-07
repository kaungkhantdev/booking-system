import { Injectable } from '@nestjs/common';
import { CountriesSeeder } from './seeders';
import { SeederInterface } from './seeders/seeder.interface';
import { PackagesSeeder } from './seeders/packages.seeder';

@Injectable()
export class SeedService {
  private readonly seeders: SeederInterface[] = [];

  constructor(
    private readonly countriesSeeder: CountriesSeeder,
    private readonly packagesSeeder: PackagesSeeder,
  ) {
    this.seeders = [this.countriesSeeder, this.packagesSeeder];
  }

  async seed() {
    await this.seeders.map(async (seed) => {
      await seed.seed();
    });
  }
}
