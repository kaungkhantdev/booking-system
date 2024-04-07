import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { Countries } from '@database/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryRepository } from './country.repository';
import { CountryController } from './country.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Countries])],
  providers: [CountryService, CountryRepository],
  controllers: [CountryController],
  exports: [CountryService],
})
export class CountryModule {}
