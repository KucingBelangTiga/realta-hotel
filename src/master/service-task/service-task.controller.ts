import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ServiceTaskService } from './service-task.service';

@Controller('service-task')
export class ServiceTaskController {
  constructor(private Services: ServiceTaskService) {}
  @Get()
  public async getAll() {
    return await this.Services.findAll();
  }
  @Get(':id')
  public async getOne(@Param('id') id: number) {
    return await this.Services.findOne(id);
  }
  @Post()
  public async create(
    @Body()
    masterDetail: {
      setaName: string;
      setSeq: number;
    },
  ) {
    return await this.Services.create(masterDetail);
  }
  @Put(':id')
  public async update(
    @Param('id') id: number,
    @Body()
    masterDetail: {
      setaName: string;
      setSeq: number;
    },
  ) {
    return await this.Services.update(id, masterDetail);
  }
  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return await this.Services.delete(id);
  }
}
