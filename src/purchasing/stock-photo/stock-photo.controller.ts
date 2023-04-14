import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StockPhotoService } from './stock-photo.service';

@Controller('purchasing')
export class StockPhotoController {
  constructor(private stockPhotoService: StockPhotoService) {}

  @Get('/stock/photo')
  public async listStockPhoto() {
    return this.stockPhotoService.listStockPhoto();
  }

  @Post('/stock/photo/:stockId/addphoto')
  @UseInterceptors(FileInterceptor('file'))
  public async createStockPhoto(
    @UploadedFile() file: any,
    @Body('sphoPrimary') sphoPrimary: number,
    @Param('stockId') stockId: number,
  ) {
    return this.stockPhotoService.createStockPhoto(file, sphoPrimary, stockId);
  }

  @Put('/stock/photo/:sphoId/editphoto')
  public async updateStockPhoto(
    @Param('sphoId') sphoId: number,
    @Body('sphoPrimary') sphoPrimary: number,
  ) {
    return this.stockPhotoService.updateStockPhoto(sphoId, sphoPrimary);
  }

  @Delete('/stock/photo/:sphoId/deletephoto')
  public async deleteStockPhoto(@Param('sphoId') sphoId: number) {
    return this.stockPhotoService.deleteStockPhoto(sphoId);
  }
}
