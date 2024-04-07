import { BadRequestException, Injectable } from '@nestjs/common';
import { Classes } from '@database/entities';
import { ClassRepository } from './class.repository';

@Injectable()
export class ClassService {
  constructor(private repo: ClassRepository) {}

  async findClasses(): Promise<Classes[]> {
    try {
      return await this.repo.findAll();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findByIdClass(id: string): Promise<Classes> {
    try {
      return await this.repo.findOneBy({ id });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
