import { Test, TestingModule } from '@nestjs/testing';
import { CountryService } from './country.service';
import { CountryRepository } from './country.repository';

const jestCountryRepository = {
  findPackages: jest.fn().mockResolvedValue([
    {
      name: 'firstName #1',
    },
    {
      name: 'firstName #2',
    },
  ]),
};

const jestCountryService = {
  findPackages: jest.fn().mockResolvedValue([
    {
      name: 'firstName #1',
    },
    {
      name: 'firstName #2',
    },
  ]),
};

describe('CountryService', () => {
  let service: CountryService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repo: CountryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountryService,
        CountryRepository,
        {
          provide: CountryService,
          useValue: jestCountryService,
        },
        {
          provide: CountryRepository,
          useValue: jestCountryRepository,
        },
      ],
    }).compile();

    service = module.get<CountryService>(CountryService);
    repo = module.get<CountryRepository>(CountryRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
