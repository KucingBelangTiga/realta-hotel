import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryGroupService } from './category-group.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { of } from 'rxjs';
import { Policy } from 'output/entities/Policy';
import { CreateCategoryGroupDto } from './category-group.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { PolicyCategoryGroup } from 'output/entities/PolicyCategoryGroup';

@Controller('category-group')
export class CategoryGroupController {
  constructor(private Services: CategoryGroupService) {}
  @Get()
  public async getAll() {
    return await this.Services.findAll();
  }

  @Get('/page')
  public async getPage(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<PolicyCategoryGroup>> {
    limit = limit > 100 ? 100 : limit;
    return this.Services.findPage({
      page,
      limit,
    });
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
    createCategoryGroupPhoto: CreateCategoryGroupDto,
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
    createCategoryGroupPhoto: CreateCategoryGroupDto,
  ) {
    return await this.Services.update(id, file, createCategoryGroupPhoto);
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
