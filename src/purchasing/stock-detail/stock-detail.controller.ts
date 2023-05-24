import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { StockDetailService } from './stock-detail.service';

@Controller('purchasing')
export class StockDetailController {
  constructor(private stockDetailService: StockDetailService) {}

  @Get('/stock/detail/:stockId/:page')
  public async findStockDetaiById(
    @Param('stockId') stockId: number,
    @Param('page') page: number,
  ) {
    return this.stockDetailService.findStockDetaiById(stockId, page);
  }

  @Post('/stock/detail/:stockId/adddetail')
  public async createStockDetail(
    @Param('stockId') stockId: number,
    @Body('stodStatus') stodStatus: string,
    @Body('stodBarcodeNumber') stodBarcodeNumber: string,
    @Body('stodNotes') stodNotes: string,
    @Body('poheId') poheId: number,
    @Body('faciId') faciId: number,
  ) {
    return this.stockDetailService.createStockDetail(
      stockId,
      stodStatus,
      stodBarcodeNumber,
      stodNotes,
      poheId,
      faciId,
    );
  }

  @Put('/stock/detail/:stockId/:stodId/editdetail')
  public async editStockDetail(
    @Param('stockId') stockId: number,
    @Param('stodId') stodId: number,
    @Body('stodStatus') stodStatus: string,
    @Body('faciId') faciId: number,
  ) {
    return this.stockDetailService.editStockDetail(
      stodId,
      stockId,
      stodStatus,
      faciId,
    );
  }

  @Delete('/stock/detail/:stockId/:stodId/deletedetail')
  public async deleteStockDetail(
    @Param('stockId') stockId: number,
    @Param('stodId') stodId: number,
  ) {
    return this.stockDetailService.deleteStockDetail(stodId, stockId);
  }
}
