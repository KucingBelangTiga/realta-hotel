import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EntitysService } from './entitys.service';

@Controller('entitys')
export class EntitysController {
  constructor(private Services: EntitysService) {}
  @Get()
  public async getAll() {
    return await this.Services.getEntitys();
  }
  @Get(':id')
  public async getOne(@Param('id') id: number) {
    return await this.Services.getEntityById(id);
  }
  @Post()
  public async Create(@Body('entityId') entityId: number) {
    return await this.Services.addEntity(entityId);
  }
  @Put(':id')
  public async Update(
    @Param('id') id: number,
    @Body('entityId') entityId: number,
  ) {
    return await this.Services.updateEntity(id, entityId);
  }
  @Delete(':id')
  public async Delete(@Param('id') id: number) {
    return await this.Services.deleteEntity(id);
  }
}
