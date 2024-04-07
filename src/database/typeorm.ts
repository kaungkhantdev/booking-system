import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import {
  Countries,
  Packages,
  Users,
  Purchases,
  Bookings,
  BookingLogs,
} from '@database/entities';
import { Classes } from './entities/classes.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get('database.host'),
      port: +this.configService.get('database.port'),
      username: this.configService.get('database.user'),
      password: this.configService.get('database.password'),
      database: this.configService.get('database.name'),
      entities: [
        Users,
        Countries,
        Packages,
        Purchases,
        Classes,
        Bookings,
        BookingLogs,
      ],
      synchronize: true,
    };
  }
}
