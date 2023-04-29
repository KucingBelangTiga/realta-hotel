/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { Department } from 'output/entities/Department';
import { DepartmentService } from './department.service';

@Controller('department')
export class DepartmentController {
    constructor(private departmentService: DepartmentService) {}
 
    @Get()
    public async findAllDept(@Paginate() query: PaginateQuery,
    ): Promise <Paginated<Department>> {
      return await this.departmentService.findAllDept(query);
    }
    @Get(':id')
    public async findOneDept(@Param('id') id: number) {
      return await this.departmentService.findOneDept(id);
    }
    // @Get('/department/search')
    // public async findNameDept(@Query('deptName') deptName: string) {
    // return await this.departmentService.findNameDept(deptName);
    // }
 
    @Post()
    public async createDept(
    @Body('deptName') deptName: string,
    // @Body('deptModifiedDate') deptModifiedDate: Date
    deptModifiedDate: Date = new Date()
    // deptModifiedDate: Date = new Date(), //otomatis tgl saat ini dari db, tanpa input manual pada Body
    ) { 
    return await this.departmentService.createDept(
      deptName, 
      deptModifiedDate
    );
    } 

    @Put(':id')
    public async updateDept(
    @Param('id') id: number,
    @Body('deptName') deptName: string,
    // @Body('deptModifiedDate') deptModifiedDate: Date
    deptModifiedDate: Date = new Date(),
    ) {
    return await this.departmentService.updateDept(
      id,
      deptName,
      deptModifiedDate
    );
    }

    @Delete(':id')
    public async deleteDept(@Param('id') id: number) {
    return await this.departmentService.deleteDept(id); 
    }
}
