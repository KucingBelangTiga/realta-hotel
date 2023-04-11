import { Test, TestingModule } from '@nestjs/testing';
import { SpecialOfferCouponsService } from './special_offer_coupons.service';

describe('SpecialOfferCouponsService', () => {
  let service: SpecialOfferCouponsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecialOfferCouponsService],
    }).compile();

    service = module.get<SpecialOfferCouponsService>(SpecialOfferCouponsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
