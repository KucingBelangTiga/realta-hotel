import { Test, TestingModule } from '@nestjs/testing';
import { UserBreakfeastService } from './user_breakfeast.service';

describe('UserBreakfeastService', () => {
  let service: UserBreakfeastService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserBreakfeastService],
    }).compile();

    service = module.get<UserBreakfeastService>(UserBreakfeastService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
