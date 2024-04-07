import { Module } from '@nestjs/common';
import { PackageService } from './package.service';
import { PackageController } from './package.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Packages } from '@database/entities';
import { PackageRepository } from './package.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Packages])],
  controllers: [PackageController],
  providers: [PackageService, PackageRepository],
  exports: [PackageService],
})
export class PackageModule {}
