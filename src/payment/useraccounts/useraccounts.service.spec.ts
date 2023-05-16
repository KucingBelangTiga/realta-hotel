import { Test, TestingModule } from '@nestjs/testing';
import { UseraccountsService } from './useraccounts.service';

describe('UseraccountsService', () => {
  let service: UseraccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UseraccountsService],
    }).compile();

    service = module.get<UseraccountsService>(UseraccountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
