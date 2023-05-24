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

  @Get('/listOrder/detail/:podePoheId/:page')
  public async findStockDetaiById(
    @Param('podePoheId') podePoheId: number,
    @Param('page') page: number,
  ) {
    return this.purchaseOrderDetailService.findPODetaiById(podePoheId, page);
  }

  @Post('/listOrder/detail/:podePoheId/adddetail')
  public async createStockDetail(
    @Param('podePoheId') podePoheId: number,
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
      podePoheId,
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

  @Put('/listOrder/detail/:podePoheId/:podeId/editdetail')
  public async editStockDetail(
    @Param('podePoheId') podePoheId: number,
    @Param('podeId') podeId: number,
    @Body('stockId') stockId: number,
    @Body('podeOrderQty') podeOrderQty: number,
    @Body('podeReceivedQty') podeReceivedQty: string,
    @Body('podeRejectedQty') podeRejectedQty: string,
  ) {
    return this.purchaseOrderDetailService.editPODetail(
      podePoheId,
      stockId,
      podeOrderQty,
      podeReceivedQty,
      podeRejectedQty,
      podeId,
    );
  }

  @Delete('/listOrder/detail/:podePoheId/:podeId/deletedetail')
  public async deleteStockDetail(
    @Param('podePoheId') podePoheId: number,
    @Param('podeId') podeId: number,
  ) {
    return this.purchaseOrderDetailService.deletePODetail(podePoheId, podeId);
  }
}
