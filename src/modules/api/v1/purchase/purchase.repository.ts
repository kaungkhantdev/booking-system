import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Purchases } from '@database/entities';
import { Repository } from 'typeorm';
import { CreatePurchase } from './interfaces/purchase.repo';

@Injectable()
export class PurchaseRepository {
  constructor(
    @InjectRepository(Purchases)
    private readonly repo: Repository<Purchases>,
  ) {}

  async create(data: CreatePurchase): Promise<Purchases> {
    try {
      const purchase = new Purchases();
      purchase.expired_time = data.expired_time;
      purchase.remark = data.remark;
      purchase.user = data.user;
      purchase.package = data.package;

      return await this.repo.save(purchase);
    } catch (error) {
      const err = error as Error;
      throw new NotAcceptableException(err.message);
    }
  }

  async findOneBy(data: object): Promise<Purchases> {
    try {
      return await this.repo.findOne({
        where: data,
      });
    } catch (error) {
      const err = error as Error;
      throw new NotAcceptableException(err.message);
    }
  }

  async update(id: number, attrs: Partial<Purchases>): Promise<Purchases> {
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
