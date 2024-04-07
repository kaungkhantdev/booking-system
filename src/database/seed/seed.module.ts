import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '@config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '@database/typeorm';
import { CountriesSeeder } from './seeders';
import { Countries, Packages } from '@database/entities';
import { SeedService } from './seed.service';
import { PackagesSeeder } from './seeders/packages.seeder';

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
    TypeOrmModule.forFeature([Countries, Packages]),
  ],
  providers: [SeedService, CountriesSeeder, PackagesSeeder],
})
export class SeedModule {}
