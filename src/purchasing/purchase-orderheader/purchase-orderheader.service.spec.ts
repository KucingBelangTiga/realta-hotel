import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseOrderheaderService } from './purchase-orderheader.service';

describe('PurchaseOrderheaderService', () => {
  let service: PurchaseOrderheaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchaseOrderheaderService],
    }).compile();

    service = module.get<PurchaseOrderheaderService>(PurchaseOrderheaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
