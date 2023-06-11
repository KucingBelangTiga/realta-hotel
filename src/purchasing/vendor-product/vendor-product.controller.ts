import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { VendorProductService } from './vendor-product.service';

@Controller('purchasing')
export class VendorProductController {
  constructor(private vendorProductService: VendorProductService) {}

  @Get('/vendor/product/:vendorId')
  public async findByIdVendor(@Param('vendorId') vendorId: number) {
    return this.vendorProductService.findByIdVendor(vendorId);
  }

  @Post('vendor/product/:vendorId/addproduct')
  public async createVendorProduct(
    @Body('veproQtyStocked') veproQtyStocked: number,
    @Body('veproQtyRemaining') veproQtyRemaining: number,
    @Body('veproPrice') veproPrice: string,
    @Param('vendorId') vendorId: number,
    @Body('stockId') stockId: number,
  ) {
    return this.vendorProductService.createVendorProduct(
      veproQtyStocked,
      veproQtyRemaining,
      veproPrice,
      vendorId,
      stockId,
    );
  }

  @Put('vendor/product/:veproId/editproduct')
  public async editVendorProduct(
    @Body('veproQtyStocked') veproQtyStocked: number,
    @Body('veproQtyRemaining') veproQtyRemaining: number,
    @Body('veproPrice') veproPrice: string,
    @Param('veproId') veproId: number,
    @Body('stockId') stockId: number,
  ) {
    return this.vendorProductService.editVendorProduct(
      veproQtyStocked,
      veproQtyRemaining,
      veproPrice,
      veproId,
      stockId,
    );
  }

  @Delete('vendor/product/:veproId/deleteproduct')
  public async deleteVendorProduct(@Param('veproId') veproId: number) {
    return this.vendorProductService.deleteVendorProduct(veproId);
  }
}
