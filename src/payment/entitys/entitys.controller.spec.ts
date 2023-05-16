import { Test, TestingModule } from '@nestjs/testing';
import { EntitysController } from './entitys.controller';

describe('EntitysController', () => {
  let controller: EntitysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntitysController],
    }).compile();

    controller = module.get<EntitysController>(EntitysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
