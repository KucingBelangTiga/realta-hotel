import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CountryService } from './country.service';
import { Regions } from 'output/entities/Regions';

@Controller('country')
export class CountryController {
  constructor(private Services: CountryService) {}
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
    countryDetail: {
      countryName: string;
      countryRegion: Regions;
    },
  ) {
    return await this.Services.create(countryDetail);
  }
  @Put(':id')
  public async update(
    @Param('id') id: number,
    @Body()
    countryDetail: {
      countryName: string;
      countryRegion: Regions;
    },
  ) {
    return await this.Services.update(id, countryDetail);
  }
  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return await this.Services.delete(id);
  }
}
