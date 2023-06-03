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
import { AddressService } from './address.service';
import { CreateAddressDto } from './address.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Address } from 'output/entities/Address';

@Controller('address')
export class AddressController {
  constructor(private Services: AddressService) {}
  @Get()
  public async getAll() {
    return await this.Services.findAll();
  }
  @Get('/page')
  public async getPage(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit = 5,
  ): Promise<Pagination<Address>> {
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
    masterDetail: CreateAddressDto,
  ) {
    return await this.Services.create(masterDetail);
  }
  @Put(':id')
  public async update(
    @Param('id') id: number,
    @Body()
    masterDetail: CreateAddressDto,
  ) {
    return await this.Services.update(id, masterDetail);
  }
  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return await this.Services.delete(id);
  }
}
