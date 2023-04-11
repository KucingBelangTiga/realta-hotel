import { Test, TestingModule } from '@nestjs/testing';
import { BookingOrderDetailController } from './booking_order_detail.controller';

describe('BookingOrderDetailController', () => {
  let controller: BookingOrderDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingOrderDetailController],
    }).compile();

    controller = module.get<BookingOrderDetailController>(BookingOrderDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
