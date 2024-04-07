import { Purchases } from '@database/entities/purchases.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseService } from './purchase.service';
import { UserModule } from '../user/user.module';
import { PackageModule } from '../package/package.module';
import { PurchaseRepository } from './purchase.repository';
import { PurchaseController } from './purchase.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Purchases]), UserModule, PackageModule],
  providers: [PurchaseService, PurchaseRepository],
  controllers: [PurchaseController],
  exports: [PurchaseService],
})
export class PurchaseModule {}
