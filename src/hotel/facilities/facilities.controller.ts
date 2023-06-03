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
} from '@nestjs/common';
import { FacilitiesService } from './facilities.service';
import { CreateFacilitesDto } from './facilities.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Facilities } from 'output/entities/Facilities';

@Controller('facilities')
export class FacilitiesController {
  constructor(private Services: FacilitiesService) {}
  @Get('')
  public async getFac() {
    return await this.Services.findFac();
  }
  @Get('/all')
  public async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('id') id: number,
  ): Promise<Pagination<Facilities>> {
    limit = limit > 100 ? 100 : limit;
    return this.Services.findAll(
      {
        page,
        limit,
      },
      id,
    );
  }

  // @Get('all/:id')
  // public async getAll(@Param('id') id: number) {
  //   return await this.Services.findAll(id);
  // }
  @Get(':id')
  public async getOne(@Param('id') id: number) {
    return await this.Services.findOne(id);
  }
  @Post()
  public async create(
    @Body()
    createFacilities: CreateFacilitesDto,
  ) {
    return await this.Services.create(createFacilities);
  }
  @Put(':id')
  public async update(
    @Param('id') id: number,
    @Body()
    createFacilities: CreateFacilitesDto,
  ) {
    return await this.Services.update(id, createFacilities);
  }
  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return await this.Services.delete(id);
  }
}
