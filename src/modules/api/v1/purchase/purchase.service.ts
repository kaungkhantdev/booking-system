import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PurchaseRepository } from './purchase.repository';
import { Purchases } from '@database/entities';
import {
  BuyPackage,
  CreatePurchase,
  UpdatePurchase,
} from './interfaces/purchase.service';
import { UserService } from '../user/user.service';
import { PackageService } from '../package/package.service';
import { PACKAGE_UNIT } from '@config/constants';
import {
  addDayTime,
  addDaysTime,
  addMonthTime,
  addMonthsTime,
} from '@utils/time';

@Injectable()
export class PurchaseService {
  constructor(
    private repo: PurchaseRepository,
    private userService: UserService,
    private packageService: PackageService,
  ) {}

  async createPurchase(data: CreatePurchase): Promise<Purchases> {
    const user = await this.userService.findById(data.user_id);
    const pak = await this.packageService.findByIdPackages(data.package_id);

    const modifyData = {
      user,
      package: pak,
      expired_time: data.expired_time,
      remark: data.remark,
    };

    return this.repo.create(modifyData);
  }

  async updatePurchase(id: number, data: UpdatePurchase) {
    const user = await this.repo.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`Sorry, this user is not found.`);
    }

    return await this.repo.update(id, data);
  }

  /**
   * buy package
   *
   * @param data
   * @returns
   */
  async buyPackage(data: BuyPackage) {
    try {
      const user = await this.userService.findById(data.user_id);
      const pak = await this.packageService.findByIdPackages(data.package_id);

      const tz = user.country.timezone;
      const pak_duration = pak.duration;
      const pak_unit = pak.unit;
      let expired_time;

      if (pak_unit == PACKAGE_UNIT.DAY) {
        expired_time = addDayTime(tz, pak_duration);
      } else if (pak_unit == PACKAGE_UNIT.DAYS) {
        expired_time = addDaysTime(tz, pak_duration);
      } else if (pak_unit == PACKAGE_UNIT.MONTH) {
        expired_time = addMonthTime(tz, pak_duration);
      } else {
        expired_time = addMonthsTime(tz, pak_duration);
      }

      /** add credit to user */
      const pak_credit = pak.credit;
      const current_user_credit = user.credit;

      const total_credit = pak_credit + current_user_credit;
      await this.userService.updateUser(data.user_id, { credit: total_credit });

      /** add to purchase */
      const modifyData = {
        user,
        package: pak,
        expired_time: expired_time.toString(),
        remark: total_credit.toString(),
      };

      await this.repo.create(modifyData);
      return 'Successfully bought.';
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
