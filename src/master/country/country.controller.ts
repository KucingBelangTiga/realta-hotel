import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CountryService } from './country.service';

import { CreateCountryDto } from './country.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Country } from 'output/entities/Country';

@Controller('country')
export class CountryController {
  constructor(private Services: CountryService) {}
  @Get()
  public async getAll() {
    return await this.Services.findAll();
  }
  @Get('/page')
  public async getPage(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit = 5,
  ): Promise<Pagination<Country>> {
    limit = limit > 100 ? 100 : limit;
    return this.Services.findPage({
      page,
      limit,
    });
  }
  @Get(':id')
  public async getOne(@Param('id') id: number) {
    return await this.Services.findOne(id);
  }
  @Post()
  public async create(
    @Body()
    countryDetail: CreateCountryDto,
  ) {
    return await this.Services.create(countryDetail);
  }
  @Put(':id')
  public async update(
    @Param('id') id: number,
    @Body()
    countryDetail: CreateCountryDto,
  ) {
    return await this.Services.update(id, countryDetail);
  }
  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return await this.Services.delete(id);
  }
}
