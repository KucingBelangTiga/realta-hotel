import {
  Body,
  Controller,
  Get,
  Param,
  Query,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { VendorService } from './vendor.service';

@Controller('purchasing')
export class VendorController {
  constructor(private vendorService: VendorService) {}

  @Get('/vendor/:page')
  public async listVendor(@Param('page') page: number) {
    return this.vendorService.listVendor(page);
  }

  @Get('/vendor')
  public async getAllVendor() {
    return this.vendorService.getAllVendor();
  }

  @Get('/vendor/search')
  public async findVendoByName(@Query('vendorName') vendorName: string) {
    return this.vendorService.findVendorByName(vendorName);
  }

  @Get('/vendor/:vendorId/')
  public async findVendorById(@Param('vendorId') vendorId: number) {
    return this.vendorService.findVendorById(vendorId);
  }

  @Post('/vendor')
  public async createVendor(
    @Body('vendorName') vendorName: string,
    @Body('vendorActive') vendorActive: number,
    @Body('vendorPriority') vendorPriority: number,
    @Body('vendorRegisterDate') vendorRegisterDate: any,
    @Body('vendorWeburl') vendorWeburl: string,
  ) {
    return this.vendorService.createVendor(
      vendorName,
      vendorActive,
      vendorPriority,
      vendorRegisterDate,
      vendorWeburl,
    );
  }

  @Put('/vendor/:vendorId')
  public async editVendor(
    @Param('vendorId') vendorId: number,
    @Body('vendorName') vendorName: string,
    @Body('vendorActive') vendorActive: number,
    @Body('vendorPriority') vendorPriority: number,
    @Body('vendorWeburl') vendorWeburl: string,
  ) {
    return this.vendorService.editVendor(
      vendorId,
      vendorName,
      vendorActive,
      vendorPriority,
      vendorWeburl,
    );
  }

  @Delete('/vendor/:vendorId')
  public async deleteVendor(@Param('vendorId') vendorId: number) {
    return this.vendorService.deleteVendor(vendorId);
  }
}
