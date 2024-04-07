import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classes } from '@database/entities';
import { ClassRepository } from './class.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Classes])],
  controllers: [ClassController],
  providers: [ClassService, ClassRepository],
  exports: [ClassService],
})
export class ClassModule {}
