import { Controller, Get } from '@nestjs/common';
import { CategoryGroupService } from './category-group.service';

@Controller('category-group')
export class CategoryGroupController {
  constructor(private Services: CategoryGroupService) {}
  @Get()
  public async getAll() {
    return await this.Services.findAll();
  }
}
