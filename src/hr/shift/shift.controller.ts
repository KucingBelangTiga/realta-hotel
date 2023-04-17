/* eslint-disable prettier/prettier */
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
  import { InjectRepository } from '@nestjs/typeorm'
  import { FilterOperator, FilterSuffix, Paginate, PaginateQuery, paginate, Paginated } from 'nestjs-paginate'
  import { Repository, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
  import { Shift } from 'output/entities/Shift';
  import { ShiftService } from './shift.service';

@Controller('shift')
export class ShiftController {
    constructor(private shiftService: ShiftService) {}

    @Get()
    public async findAllShift(@Paginate() query: PaginateQuery,
    ): Promise <Paginated<Shift>> {
      return await this.shiftService.findAllShift(query);
    }
    @Get(':id')
    public async findOneShift(@Param('id') id: number) {
      return await this.shiftService.findOneShift(id);
    }
    // @Get('/shift/search')
    // public async findNameShift(@Query('shiftName') shiftName: string) {
    // return await this.shiftService.findNameShift(shiftName);
    // }
 
    @Post()
    public async createShift(
    @Body('shiftName') shiftName: string,
    @Body('shiftStartTime') shiftStartTime: string,
    @Body('shiftEndTime') shiftEndTime: string,
    ) { 
    return await this.shiftService.createShift(
      shiftName, 
      shiftStartTime,
      shiftEndTime
    );
    } 

    @Put(':id')
    public async updateShift(
    @Param('id') id: number,
    @Body('shiftName') shiftName: string,
    @Body('shiftStartTime') shiftStartTime: string,
    @Body('shiftEndTime') shiftEndTime: string,
    ) {
    return await this.shiftService.updateShift(
      id,
      shiftName,
      shiftStartTime,
      shiftEndTime
    );
    }

    @Delete(':id')
    public async deleteShift(@Param('id') id: number) {
    return await this.shiftService.deleteShift(id);
    }
}
 