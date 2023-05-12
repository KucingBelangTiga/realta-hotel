import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { Proviences } from 'output/entities/Proviences';

@Controller('address')
export class AddressController {
  constructor(private Services: AddressService) {}
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
      addrLine1: string;
      addrLine2: string;
      addrPostalCode: string;
      addrProv: Proviences;
    },
  ) {
    return await this.Services.create(masterDetail);
  }
  @Put(':id')
  public async update(
    @Param('id') id: number,
    @Body()
    masterDetail: {
      addrLine1: string;
      addrLine2: string;
      addrPostalCode: string;
      addrProv: Proviences;
    },
  ) {
    return await this.Services.update(id, masterDetail);
  }
  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return await this.Services.delete(id);
  }
}
