import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Packages } from '@database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class PackageRepository {
  constructor(
    @InjectRepository(Packages)
    private readonly repo: Repository<Packages>,
  ) {}

  async findAll(): Promise<Packages[]> {
    try {
      return await this.repo.find();
    } catch (error) {
      const err = error as Error;
      throw new NotAcceptableException(err.message);
    }
  }

  async findOneBy(data: object): Promise<Packages> {
    try {
      return await this.repo.findOne({
        where: data,
      });
    } catch (error) {
      const err = error as Error;
      throw new NotAcceptableException(err.message);
    }
  }
}
