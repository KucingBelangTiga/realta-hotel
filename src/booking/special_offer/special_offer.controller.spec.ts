import { Test, TestingModule } from '@nestjs/testing';
import { SpecialOfferController } from './special_offer.controller';

describe('SpecialOfferController', () => {
  let controller: SpecialOfferController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecialOfferController],
    }).compile();

    controller = module.get<SpecialOfferController>(SpecialOfferController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
