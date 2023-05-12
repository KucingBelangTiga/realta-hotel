import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Country } from 'output/entities/Country';
import { ProvincesService } from './provinces.service';

@Controller('provinces')
export class ProvincesController {
  constructor(private Services: ProvincesService) {}
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
      provName: string;
      provCountry: Country;
    },
  ) {
    return await this.Services.create(masterDetail);
  }
  @Put(':id')
  public async update(
    @Param('id') id: number,
    @Body()
    masterDetail: {
      provName: string;
      provCountry: Country;
    },
  ) {
    return await this.Services.update(id, masterDetail);
  }
  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return await this.Services.delete(id);
  }
}
