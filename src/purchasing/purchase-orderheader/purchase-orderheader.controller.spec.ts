import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseOrderheaderController } from './purchase-orderheader.controller';

describe('PurchaseOrderheaderController', () => {
  let controller: PurchaseOrderheaderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseOrderheaderController],
    }).compile();

    controller = module.get<PurchaseOrderheaderController>(PurchaseOrderheaderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
