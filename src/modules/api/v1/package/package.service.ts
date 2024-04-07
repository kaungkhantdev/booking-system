import { BadRequestException, Injectable } from '@nestjs/common';
import { Packages } from '@database/entities';
import { PackageRepository } from './package.repository';

@Injectable()
export class PackageService {
  constructor(private userRepository: PackageRepository) {}

  async findPackages(): Promise<Packages[]> {
    try {
      return await this.userRepository.findAll();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
