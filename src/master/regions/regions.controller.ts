import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RegionsService } from './regions.service';

@Controller('regions')
export class RegionsController {
  constructor(private Services: RegionsService) {}
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
    regionDetail: {
      regionName: string;
    },
  ) {
    return await this.Services.create(regionDetail);
  }
  @Put(':id')
  public async update(
    @Param('id') id: number,
    @Body()
    regionDetail: {
      regionName: string;
    },
  ) {
    return await this.Services.update(id, regionDetail);
  }
  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return await this.Services.delete(id);
  }
}
