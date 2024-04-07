import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { generateOtp } from '@utils/otp-generate';
import { UserService } from '../user/user.service';
import { signUp, signIn } from './interfaces/auth-service.interface';
import { MailService } from '@mail/mail.service';
import { ERROR_MSG, MAIL_TEM, OTP_CODE, SUCCESS_MSG } from '@config/constants';
import { Users } from '@database/entities';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async getOtpService(email: string) {
    const hasUser = await this.usersService.findByEmail(email);

    if (hasUser) {
      throw new BadRequestException(ERROR_MSG.HAS_EMAIL);
    }

    const otp = generateOtp();

    return this.otpResponse(email, otp);
  }

  async signUpService(data: signUp) {
    const { name, email, password, c_password } = data;
    if (password !== c_password) {
      throw new BadRequestException(ERROR_MSG.SIGN_UP_NOT_SAME_PASSWORD);
    }

    const hasUser = await this.usersService.findByEmail(email);

    if (hasUser) {
      throw new BadRequestException(ERROR_MSG.HAS_EMAIL);
    }

    /** password hash */
    const salt = await bcrypt.genSalt();
    const hash_password = await bcrypt.hash(password, salt);

    /** save to users */
    const user = await this.usersService.createUser({
      name,
      email,
      hash_password,
      country_id: data.country_id,
    });

    return this.authResponse(user.id, user.email, user.name);
  }

  async signInService(data: signIn) {
    const { email, password } = data;

    /** check user */
    const userData = await this.usersService.findByEmail(email);

    if (!userData) {
      throw new BadRequestException(ERROR_MSG.SIGN_IN_ERR);
    }

    /** check password */
    const isMatchPassword = await bcrypt.compare(password, userData.password);

    if (!isMatchPassword) {
      throw new BadRequestException(ERROR_MSG.SIGN_IN_ERR);
    }

    return this.authResponse(userData.id, userData.email, userData.name);
  }

  private async otpResponse(email: string, code: string) {
    /** send mail */
    await this.mailService.sendEmail(
      email,
      SUCCESS_MSG.OTP_TITLE_MAIL,
      {
        otp_code: code,
      },
      MAIL_TEM.OTP_MAIL,
    );

    return {
      expired_second: OTP_CODE.TIME,
      expired_at: OTP_CODE.EXPIRE,
    };
  }

  /** Auth base response */
  private async authResponse(id: number, email: string, name: string) {
    /** create jwt token */
    const payload = {
      id,
      email,
      name,
    };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token: access_token,
      user: {
        id,
        name,
        email,
      },
    };
  }
}
