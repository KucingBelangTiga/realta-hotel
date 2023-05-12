import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FacilityPhotosService } from './facility-photos.service';
import { Facilities } from 'output/entities/Facilities';
import { FileInterceptor } from '@nestjs/platform-express';
import { of } from 'rxjs';
import { join } from 'path';

@Controller('facility-photos')
export class FacilityPhotosController {
  constructor(private Services: FacilityPhotosService) {}
  @Get(':id')
  public async getAll(@Param('id') id: number) {
    return await this.Services.findAll(id);
  }
  // @Get(':id')
  // public async getOne(@Param('id') id: number) {
  //   return await this.Services.findOne(id);
  // }
  @Get('/many/:id')
  public async getMany(@Param('id') id: number) {
    return await this.Services.findMany(id);
  }
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  public async create(
    @UploadedFile() file,
    @Body()
    createFacilityPhoto: {
      faphoPrimary: boolean;
      faphoUrl: string;
      faphoFaci: Facilities;
    },
  ) {
    return await this.Services.create(file, createFacilityPhoto);
  }
  @Put(':id')
  public async update(
    @Param('id') id: number,
    @Body()
    createFacilityPhoto: {
      faphoPrimary: boolean;
    },
  ) {
    return await this.Services.update(id, createFacilityPhoto);
  }
  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return await this.Services.delete(id);
  }

  @Get('image/:imagename')
  findImage(@Param('imagename') imagename: any, @Res() res: any) {
    return of(res.sendFile(join(process.cwd(), 'uploads/' + imagename)));
  }
}
