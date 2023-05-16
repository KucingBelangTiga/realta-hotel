import { Test, TestingModule } from '@nestjs/testing';
import { PaymenttransactionService } from './paymenttransaction.service';

describe('PaymenttransactionService', () => {
  let service: PaymenttransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymenttransactionService],
    }).compile();

    service = module.get<PaymenttransactionService>(PaymenttransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
