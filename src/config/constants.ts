/** @Author by kkz */

/**
 * Role code for user
 *
 * 1001 -> super admin
 * 2002 -> admin
 * 3003 -> shop
 * 3004 -> user
 */
export const ROLE_CODES = {
  SUPER_ADMIN: 1001,
  ADMIN: 2002,
  STORE: 3003,
  USER: 4004,
};

/**
 * Super Admin
 *
 *
 */
export const SUPER_ADMIN = {
  EMAIL: 'super.admin@ecommerce.com',
  PASSWORD: 'password',
  NAME: 'super admin',
  CODE: ROLE_CODES.SUPER_ADMIN,
};

/**
 * Admin
 *
 *
 */
export const ADMIN = {
  EMAIL: 'admin@ecommerce.com',
  PASSWORD: 'password',
  NAME: 'super admin',
  CODE: ROLE_CODES.ADMIN,
};

/**
 * Admin
 *
 *
 */
export const STORE = {
  EMAIL: 'store@ecommerce.com',
  PASSWORD: 'password',
  NAME: 'Shopo',
  CODE: ROLE_CODES.STORE,
  PHONE: '0988777666',
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
