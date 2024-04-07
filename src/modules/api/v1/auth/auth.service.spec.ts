import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { signUp, signIn } from './interfaces/auth-service.interface';
import { OTP_CODE } from '@config/constants';

const UserData = {
  id: 1,
  name: 'abc',
  email: 'abc@gmail.com',
  password: 'abc',
  access_token: 'abc',
};

const signUpDto: signUp = {
  name: UserData.name,
  email: UserData.email,
  password: UserData.password,
  c_password: UserData.password,
  otp_code: '123456',
  country_id: '1',
};

const signInDto: signIn = {
  email: UserData.email,
  password: UserData.password,
};

const jestAuthService = {
  signUpService: jest.fn().mockImplementation((data: signUp) =>
    Promise.resolve({
      access_token: UserData.access_token,
      user: { id: UserData.id, ...data },
    }),
  ),
  signInService: jest.fn().mockImplementation((data: signUp) =>
    Promise.resolve({
      access_token: UserData.access_token,
      user: { id: UserData.id, ...data },
    }),
  ),
  getOtpService: jest.fn().mockImplementation(() =>
    Promise.resolve({
      expired_second: OTP_CODE.TIME,
      expired_at: OTP_CODE.EXPIRE,
    }),
  ),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AuthService,
          useValue: jestAuthService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getOtpService()', () => {
    it('should be work get otp service', () => {
      service.getOtpService(signUpDto.email);
      expect(service.getOtpService(signUpDto.email)).resolves.toEqual({
        expired_second: OTP_CODE.TIME,
        expired_at: OTP_CODE.EXPIRE,
      });
    });
  });

  describe('signUpService()', () => {
    it('should be work sign up service', () => {
      service.signUpService(signUpDto);
      expect(service.signUpService(signUpDto)).resolves.toEqual({
        access_token: UserData.access_token,
        user: { id: UserData.id, ...signUpDto },
      });
    });
  });

  describe('signIpService()', () => {
    it('should be work sing in service', () => {
      service.signInService(signInDto);
      expect(service.signInService(signInDto)).resolves.toEqual({
        access_token: UserData.access_token,
        user: { id: UserData.id, ...signInDto },
      });
    });
  });
});
