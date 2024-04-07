import { Test, TestingModule } from '@nestjs/testing';
import { PackageService } from './package.service';
import { PackageRepository } from './package.repository';

const jestPackageRepository = {
  findPackages: jest.fn().mockResolvedValue([
    {
      name: 'firstName #1',
    },
    {
      name: 'firstName #2',
    },
  ]),
};

const jestPackageService = {
  findPackages: jest.fn().mockResolvedValue([
    {
      name: 'firstName #1',
    },
    {
      name: 'firstName #2',
    },
  ]),
};

describe('PackageService', () => {
  let service: PackageService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repo: PackageRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PackageService,
        PackageRepository,
        {
          provide: PackageService,
          useValue: jestPackageService,
        },
        {
          provide: PackageRepository,
          useValue: jestPackageRepository,
        },
      ],
    }).compile();

    service = module.get<PackageService>(PackageService);
    repo = module.get<PackageRepository>(PackageRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
