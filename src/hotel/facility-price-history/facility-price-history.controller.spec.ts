import { Test, TestingModule } from '@nestjs/testing';
import { FacilityPriceHistoryController } from './facility-price-history.controller';

describe('FacilityPriceHistoryController', () => {
  let controller: FacilityPriceHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacilityPriceHistoryController],
    }).compile();

    controller = module.get<FacilityPriceHistoryController>(FacilityPriceHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
