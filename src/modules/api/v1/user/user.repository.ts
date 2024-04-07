import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '@database/entities';
import { Repository } from 'typeorm';
import { CreateUser } from './interfaces/user.repo';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(Users)
    private readonly repo: Repository<Users>,
  ) {}

  async create(data: CreateUser): Promise<Users> {
    try {
      const user = new Users();

      user.name = data.name;
      user.email = data.email;

      user.password = data.password;
      user.country = data.country;

      return await this.repo.save(user);
    } catch (error) {
      const err = error as Error;
      throw new NotAcceptableException(err.message);
    }
  }

  async findAll(): Promise<Users[]> {
    try {
      return await this.repo.find({
        select: { id: true, name: true, email: true },
      });
    } catch (error) {
      const err = error as Error;
      throw new NotAcceptableException(err.message);
    }
  }

  async findOneBy(data: object): Promise<Users> {
    try {
      return await this.repo.findOne({
        where: data,
        relations: { country: true },
      });
    } catch (error) {
      const err = error as Error;
      throw new NotAcceptableException(err.message);
    }
  }

  async findByEmail(email: string): Promise<Users | undefined> {
    try {
      return await this.repo.findOneBy({ email });
    } catch (error) {
      const err = error as Error;
      throw new NotAcceptableException(err.message);
    }
  }

  async update(id: number, attrs: Partial<Users>): Promise<Users> {
    try {
      const user = await this.repo.findOneById(id);

      Object.assign(user, attrs);
      await this.repo.save(user);

      return this.findOneBy({ id });
    } catch (error) {
      const err = error as Error;
      throw new NotAcceptableException(err.message);
    }
  }
}
