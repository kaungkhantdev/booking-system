import { Test, TestingModule } from '@nestjs/testing';
import { ClassService } from './class.service';
import { ClassRepository } from './class.repository';

const jestClassRepository = {
  findPackages: jest.fn().mockResolvedValue([
    {
      name: 'firstName #1',
    },
    {
      name: 'firstName #2',
    },
  ]),
};

const jestClassService = {
  findPackages: jest.fn().mockResolvedValue([
    {
      name: 'firstName #1',
    },
    {
      name: 'firstName #2',
    },
  ]),
};

describe('ClassService', () => {
  let service: ClassService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repo: ClassRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClassService,
        ClassRepository,
        {
          provide: ClassService,
          useValue: jestClassService,
        },
        {
          provide: ClassRepository,
          useValue: jestClassRepository,
        },
      ],
    }).compile();

    service = module.get<ClassService>(ClassService);
    repo = module.get<ClassRepository>(ClassRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
