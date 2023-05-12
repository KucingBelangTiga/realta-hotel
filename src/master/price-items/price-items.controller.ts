import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PriceItemsService } from './price-items.service';

@Controller('price-items')
export class PriceItemsController {
  constructor(private Services: PriceItemsService) {}
  @Get()
  public async getAll() {
    return await this.Services.findAll();
  }
  @Get(':id')
  public async getOne(@Param('id') id: number) {
    return await this.Services.findOne(id);
  }
  @Post()
  public async create(
    @Body()
    masterDetail: {
      pritName: string;
      pritPrice: string;
      pritDescription: string;
      pritType: string;
    },
  ) {
    return await this.Services.create(masterDetail);
  }
  @Put(':id')
  public async update(
    @Param('id') id: number,
    @Body()
    masterDetail: {
      pritName: string;
      pritPrice: string;
      pritDescription: string;
      pritType: string;
      pritModifiedDate: Date;
    },
  ) {
    return await this.Services.update(id, masterDetail);
  }
  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return await this.Services.delete(id);
  }
}
