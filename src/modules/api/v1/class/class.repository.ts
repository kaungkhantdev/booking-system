import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Classes } from '@database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ClassRepository {
  constructor(
    @InjectRepository(Classes)
    private readonly repo: Repository<Classes>,
  ) {}

  async findAll(): Promise<Classes[]> {
    try {
      return await this.repo.find();
    } catch (error) {
      const err = error as Error;
      throw new NotAcceptableException(err.message);
    }
  }

  async findOneBy(data: object): Promise<Classes> {
    try {
      return await this.repo.findOne({
        where: data,
        relations: ['country'],
      });
    } catch (error) {
      const err = error as Error;
      throw new NotAcceptableException(err.message);
    }
  }
}
