import { Test, TestingModule } from '@nestjs/testing';
import { UseraccountsController } from './useraccounts.controller';

describe('UseraccountsController', () => {
  let controller: UseraccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UseraccountsController],
    }).compile();

    controller = module.get<UseraccountsController>(UseraccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
