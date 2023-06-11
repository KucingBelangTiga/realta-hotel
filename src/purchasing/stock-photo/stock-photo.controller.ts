import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Res,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StockPhotoService } from './stock-photo.service';
import { of } from 'rxjs';
import { join } from 'path';

@Controller('purchasing')
export class StockPhotoController {
  constructor(private stockPhotoService: StockPhotoService) {}

  @Get('/stock/photo/:stockId')
  public async listStockPhoto(@Param('stockId') stockId: number) {
    return this.stockPhotoService.listStockPhoto(stockId);
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

  @Put('/stock/photo/:stockId/:sphoId/editphoto')
  public async updateStockPhoto(
    @Param('sphoId') sphoId: number,
    @Body('sphoPrimary') sphoPrimary: number,
    @Param('stockId') stockId: number,
  ) {
    return this.stockPhotoService.updateStockPhoto(
      sphoId,
      sphoPrimary,
      stockId,
    );
  }

  @Delete('/stock/photo/:sphoId/deletephoto')
  public async deleteStockPhoto(@Param('sphoId') sphoId: number) {
    return this.stockPhotoService.deleteStockPhoto(sphoId);
  }

  @Get('/stock/image/:imagename')
  findImage(@Param('imagename') imagename: any, @Res() res: any) {
    return of(res.sendFile(join(process.cwd(), 'uploads/' + imagename)));
  }
}
