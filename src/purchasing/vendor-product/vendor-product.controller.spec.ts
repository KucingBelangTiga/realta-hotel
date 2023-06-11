import { Test, TestingModule } from '@nestjs/testing';
import { VendorProductController } from './vendor-product.controller';

describe('VendorProductController', () => {
  let controller: VendorProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VendorProductController],
    }).compile();

    controller = module.get<VendorProductController>(VendorProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
