/** @Author by kkz */
/**
 * Unit of times
 */
export const PACKAGE_UNIT = {
  DAY: 'day',
  DAYS: 'days',
  MONTH: 'month',
  MONTHS: 'months',
};

/**
 * Otp code
 *
 * time and secret
 */
export const OTP_CODE = {
  TIME: process.env.JWT_EXPIRE_TIME || '24hr',
  SECRET: 'secret_otp',
  EXPIRE: `Your code is expired at 1Minute`,
};

/**
 * Cache Manager
 *
 *
 */
export const CACHE_CONSTANT = {
  TIME: 120000, // 120 seconds - 2Minute
};

/**
 * Mail templates
 *
 *
 */
export const MAIL_TEM = {
  MAIL: 'email',
  OTP_MAIL: 'otp-mail',
};

/**
 * Response message
 *
 *
 */
export const RES_MSG = {
  AUTH: {
    LOGIN: 'your login data',
  },
};

/**
 * Error messages
 *
 *
 */
export const ERROR_MSG = {
  HAS_EMAIL: 'Sorry, this email has already used.',
  NOT_FOUND_EMAIL: "Sorry, this email doesn't exist.",
  OTP_INVALID: 'Sorry, your otp is invalid. Please try again.',
  OTP_NOT_FOUND: 'Sorry, this email is not found for searching otp.',
  SIGN_IN_ERR: 'Sorry, Email or password is invalid. Please try again.',
  SIGN_UP_NOT_SAME_PASSWORD:
    'Sorry, your password and confirm password is not same. It must be same. Please try again.',
  PURCHASE_ERR: 'Sorry, user or package is not found.',
  USER_CLASS_NOT_FOUND: 'Sorry, user or class is not found.',
  BOOKING_NOT_FOUND: 'Sorry, booking is not found.',
  LOW_CREDIT: 'Sorry, your credit is not enough to booking',
  WAITING_LIST: 'Sorry, your booking is waiting',
  COUNTRY_DIF: 'Sorry, your county is not valid to booking',
};

/**
 * Success messages
 *
 *
 */
export const SUCCESS_MSG = {
  SIGN_UP_MAIL: 'Thank you for you sign up and interesting.',
  OTP_TITLE_MAIL: 'Your otp code',
  SUCCESS_LOGIN: 'Success, thank you for your time',
};
