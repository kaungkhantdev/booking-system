import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

const createUserDto = {
  name: 'abc',
  email: 'abc@gmail.com',
  password: 'abc',
};

const jestUserRepository = {
  create: jest
    .fn()
    .mockImplementation((user) => Promise.resolve({ id: '1', ...user })),
  findAll: jest.fn().mockResolvedValue([
    {
      name: 'firstName #1',
      email: 'lastName #1',
    },
    {
      name: 'firstName #2',
      email: 'lastName #2',
    },
  ]),
  findOneBy: jest.fn().mockImplementation((email: string) =>
    Promise.resolve({
      name: 'firstName #1',
      email,
      id: '1',
    }),
  ),
};

const jestUserService = {
  createUser: jest
    .fn()
    .mockImplementation((user) => Promise.resolve({ id: '1', ...user })),
  findUsers: jest.fn().mockResolvedValue([
    {
      name: 'firstName #1',
      email: 'lastName #1',
    },
    {
      name: 'firstName #2',
      email: 'lastName #2',
    },
  ]),
  findByEmail: jest.fn().mockImplementation((email: string) =>
    Promise.resolve({
      name: 'abc',
      email,
      id: '1',
    }),
  ),
};

describe('UserService', () => {
  let service: UserService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let userRepo: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        UserRepository,
        {
          provide: UserService,
          useValue: jestUserService,
        },
        {
          provide: UserRepository,
          useValue: jestUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepo = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser()', () => {
    it('should create a user', () => {
      service.createUser({
        ...createUserDto,
        hash_password: createUserDto.password,
        country_id: '1',
      });
      expect(
        service.createUser({
          ...createUserDto,
          hash_password: createUserDto.password,
          country_id: '1',
        }),
      ).resolves.toEqual({
        id: '1',
        ...createUserDto,
        hash_password: createUserDto.password,
        country_id: '1',
      });
    });
  });

  describe('findUsers()', () => {
    it('should find all users ', () => {
      service.findUsers();
    });
  });

  describe('findByEmail()', () => {
    it('should find a user', () => {
      const email = 'abc@gmail.com';
      const emailTest = service.findByEmail(email);
      expect(emailTest).resolves.toEqual({
        name: 'abc',
        email: email,
        id: '1',
      });
    });
  });
});
