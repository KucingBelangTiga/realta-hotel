import { Test, TestingModule } from '@nestjs/testing';
import { SpecialOfferCouponsController } from './special_offer_coupons.controller';

describe('SpecialOfferCouponsController', () => {
  let controller: SpecialOfferCouponsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecialOfferCouponsController],
    }).compile();

    controller = module.get<SpecialOfferCouponsController>(SpecialOfferCouponsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
