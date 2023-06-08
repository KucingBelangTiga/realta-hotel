import { Test, TestingModule } from '@nestjs/testing';
import { BookingOrderDetailExtraService } from './booking_order_detail_extra.service';

describe('BookingOrderDetailExtraService', () => {
  let service: BookingOrderDetailExtraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingOrderDetailExtraService],
    }).compile();

    service = module.get<BookingOrderDetailExtraService>(BookingOrderDetailExtraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
