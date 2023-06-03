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
import { PolicyService } from './policy.service';
import { CreatePolicyDto } from './policy.dto';
import { Policy } from 'output/entities/Policy';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('policy')
export class PolicyController {
  constructor(private Services: PolicyService) {}
  @Get()
  public async getAll() {
    return await this.Services.findAll();
  }
  @Get('/page')
  public async getPage(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<Policy>> {
    limit = limit > 100 ? 100 : limit;
    return this.Services.findPage({
      page,
      limit,
    });
  }

  @Get(':id')
  public async getOne(@Param('id') id: number) {
    return await this.Services.findOne(id);
  }
  @Post()
  public async create(
    @Body()
    masterDetail: CreatePolicyDto,
  ) {
    return await this.Services.create(masterDetail);
  }
  @Put(':id')
  public async update(
    @Param('id') id: number,
    @Body()
    masterDetail: CreatePolicyDto,
  ) {
    return await this.Services.update(id, masterDetail);
  }
  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return await this.Services.delete(id);
  }
}
