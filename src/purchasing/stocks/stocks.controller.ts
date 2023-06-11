import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { StocksService } from './stocks.service';

@Controller('purchasing')
export class StocksController {
  constructor(private stockService: StocksService) {}

  @Get('/stock')
  public async listStock() {
    return this.stockService.listStock();
  }

  @Get('/stock/search')
  public async findStockByName(@Query('vendorName') vendorName: string) {
    return this.stockService.findStockByName(vendorName);
  }

  @Get('/gallery')
  public async galleryStockPurchase() {
    return this.stockService.galleryStockPurchase();
  }

  @Get('/gallery/search')
  public async searchGalleryStockPurchase(
    @Query('stockName') stockName: string,
  ) {
    return this.stockService.searchGalleryStockPurchase(stockName);
  }

  @Get('/gallery/:stockId')
  public async searchGalleryStockPurchaseById(
    @Param('stockId') stockId: number,
  ) {
    return this.stockService.searchGalleryStockPurchaseById(stockId);
  }

  @Post('/stock')
  public async createStock(
    @Body('stockName') stockName: string,
    @Body('stockDescription') stockDescription: string,
    @Body('stockQuantity') stockQuantity: number,
    @Body('stockReorderPoint') stockReorderPoint: number,
    @Body('stockUsed') stockUsed: number,
    @Body('stockScrap') stockScrap: number,
    @Body('stockSize') stockSize: string,
    @Body('stockColor') stockColor: string,
  ) {
    return this.stockService.createStock(
      stockName,
      stockDescription,
      stockQuantity,
      stockReorderPoint,
      stockUsed,
      stockScrap,
      stockSize,
      stockColor,
    );
  }

  @Put('/stock/:stockId')
  public async editStock(
    @Param('stockId') stockId: number,
    @Body('stockName') stockName: string,
    @Body('stockDescription') stockDescription: string,
    @Body('stockQuantity') stockQuantity: number,
    @Body('stockReorderPoint') stockReorderPoint: number,
    @Body('stockUsed') stockUsed: number,
    @Body('stockScrap') stockScrap: number,
    @Body('stockSize') stockSize: string,
    @Body('stockColor') stockColor: string,
  ) {
    return this.stockService.editStock(
      stockName,
      stockDescription,
      stockQuantity,
      stockReorderPoint,
      stockUsed,
      stockScrap,
      stockSize,
      stockColor,
      stockId,
    );
  }

  @Delete('/stock/:stockId')
  public async deleteStock(@Param('stockId') stockId: number) {
    return this.stockService.deleteStock(stockId);
  }
}
