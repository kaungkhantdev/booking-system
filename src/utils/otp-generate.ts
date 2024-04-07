import { authenticator } from 'otplib';
import { OTP_CODE } from '@config/constants';

export const generateOtp = () => {
  try {
    const secret = OTP_CODE.SECRET;

    return authenticator.generate(secret);
  } catch (error) {
    console.log(error.message);
  }
};
