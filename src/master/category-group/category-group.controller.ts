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
import { CategoryGroupService } from './category-group.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { of } from 'rxjs';
import { Policy } from 'output/entities/Policy';

@Controller('category-group')
export class CategoryGroupController {
  constructor(private Services: CategoryGroupService) {}
  @Get()
  public async getAll() {
    return await this.Services.findAll();
  }
  @Get('policy')
  public async getAllPolicy() {
    return await this.Services.findPolicy();
  }

  @Get(':id')
  public async getOne(@Param('id') id: number) {
    return await this.Services.findOne(id);
  }
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  public async create(
    @UploadedFile() file,
    @Body()
    createCategoryGroupPhoto: {
      cagroName: string;
      cagroDescription: string;
      cagroType: string;
    },
    @Body()
    createpolicyCategory: {
      pocaPoli: Policy;
    },
  ) {
    return await this.Services.create(
      file,
      createCategoryGroupPhoto,
      createpolicyCategory,
    );
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  public async update(
    @Param('id') id: number,

    @UploadedFile() file,
    @Body()
    createCategoryGroupPhoto: {
      cagroName: string;
      cagroDescription: string;
      cagroType: string;
    },
  ) {
    return await this.Services.update(
      id,

      file,
      createCategoryGroupPhoto,
    );
  }

  @Put('policy/:id')
  public async updatePolicy(
    @Param('id') id: number,
    @Body('poliId') poliId: number,
  ) {
    return await this.Services.updatePolicy(id, poliId);
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
