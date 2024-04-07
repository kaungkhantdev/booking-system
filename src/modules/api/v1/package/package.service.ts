import { BadRequestException, Injectable } from '@nestjs/common';
import { Packages } from '@database/entities';
import { PackageRepository } from './package.repository';

@Injectable()
export class PackageService {
  constructor(private repo: PackageRepository) {}

  async findPackages(): Promise<Packages[]> {
    try {
      return await this.repo.findAll();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findByIdPackages(id: string): Promise<Packages> {
    try {
      return await this.repo.findOneBy({ id });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
