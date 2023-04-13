import { Test, TestingModule } from '@nestjs/testing';
import { PaymenttransactionController } from './paymenttransaction.controller';

describe('PaymenttransactionController', () => {
  let controller: PaymenttransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymenttransactionController],
    }).compile();

    controller = module.get<PaymenttransactionController>(PaymenttransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
