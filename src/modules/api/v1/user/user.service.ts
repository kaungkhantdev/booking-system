import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { Users } from '@database/entities';
import { CreateUser, UpdateUser } from './interfaces/user.service';
import { CountryService } from '../country/country.service';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private countryService: CountryService,
  ) {}

  async createUser(data: CreateUser): Promise<Users> {
    const country = await this.countryService.findById(data.country_id);

    const modifyData = {
      name: data.name,
      email: data.email,
      password: data.hash_password,
      country,
    };

    return this.userRepository.create(modifyData);
  }

  async findUsers(): Promise<Users[]> {
    return await this.userRepository.findAll();
  }

  async findById(id: string): Promise<Users> {
    return await this.userRepository.findOneBy({ id });
  }

  async findByProfileId(id: string): Promise<Users> {
    return await this.userRepository.findOneByProfile({ id });
  }

  async findByEmail(email: string): Promise<Users> {
    return await this.userRepository.findOneBy({ email });
  }

  async updateUser(id: string, data: UpdateUser) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`Sorry, this user is not found.`);
    }

    return await this.userRepository.update(id, data);
  }
}
