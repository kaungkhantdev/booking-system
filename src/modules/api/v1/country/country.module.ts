import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { Countries } from '@database/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryRepository } from './country.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Countries])],
  providers: [CountryService, CountryRepository],
  exports: [CountryService],
})
export class CountryModule {}
