import { Test, TestingModule } from '@nestjs/testing';
import { BookingOrderDetailService } from './booking_order_detail.service';

describe('BookingOrderDetailService', () => {
  let service: BookingOrderDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingOrderDetailService],
    }).compile();

    service = module.get<BookingOrderDetailService>(BookingOrderDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
