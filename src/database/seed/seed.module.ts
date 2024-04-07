import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '@config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '@database/typeorm';
import { CountriesSeeder } from './seeders';
import { Classes, Countries, Packages } from '@database/entities';
import { SeedService } from './seed.service';
import { PackagesSeeder } from './seeders/packages.seeder';
import { ClassesSeeder } from './seeders/classes.seeder';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Countries, Packages, Classes]),
  ],
  providers: [SeedService, CountriesSeeder, PackagesSeeder, ClassesSeeder],
})
export class SeedModule {}
