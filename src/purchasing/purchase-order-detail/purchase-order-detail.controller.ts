import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { PurchaseOrderDetailService } from './purchase-order-detail.service';

@Controller('purchasing')
export class PurchaseOrderDetailController {
  constructor(private purchaseOrderDetailService: PurchaseOrderDetailService) {}

  @Get('/listOrder/detail/:poheNumber')
  public async findStockDetaiById(@Param('poheNumber') poheNumber: string) {
    return this.purchaseOrderDetailService.findPODetaiById(poheNumber);
  }

  @Post('/listOrder/detail/:poheNumber/adddetail')
  public async createStockDetail(
    @Param('poheNumber') poheNumber: string,
    @Body('podeOrderQty') podeOrderQty: number,
    @Body('podePrice') podePrice: string,
    @Body('podeLineTotal') podeLineTotal: string,
    @Body('podeReceivedQty') podeReceivedQty: string,
    @Body('podeRejectedQty') podeRejectedQty: string,
    @Body('podeStockedQty') podeStockedQty: string,
    @Body('podeModifiedDate') podeModifiedDate: any,
    @Body('stockId') stockId: number,
  ) {
    return this.purchaseOrderDetailService.createPODetail(
      poheNumber,
      podeOrderQty,
      podePrice,
      podeLineTotal,
      podeReceivedQty,
      podeRejectedQty,
      podeStockedQty,
      podeModifiedDate,
      stockId,
    );
  }

  @Put('/listOrder/detail/:poheNumber/:podeId/editdetail')
  public async editStockDetail(
    @Param('poheNumber') poheNumber: string,
    @Param('podeId') podeId: number,
    @Body('stockId') stockId: number,
    @Body('podeOrderQty') podeOrderQty: number,
    @Body('podeReceivedQty') podeReceivedQty: string,
    @Body('podeRejectedQty') podeRejectedQty: string,
  ) {
    return this.purchaseOrderDetailService.editPODetail(
      poheNumber,
      stockId,
      podeOrderQty,
      podeReceivedQty,
      podeRejectedQty,
      podeId,
    );
  }

  @Delete('/listOrder/detail/:poheNumber/:podeId/deletedetail')
  public async deleteStockDetail(
    @Param('poheNumber') poheNumber: string,
    @Param('podeId') podeId: number,
  ) {
    return this.purchaseOrderDetailService.deletePODetail(poheNumber, podeId);
  }
}
