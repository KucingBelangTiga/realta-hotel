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
    UseInterceptors,
    UploadedFile,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm'
  import { FilterOperator, FilterSuffix, Paginate, PaginateQuery, paginate, Paginated } from 'nestjs-paginate'
  import { Repository, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
  import { FileInterceptor } from '@nestjs/platform-express';
  import { EmployeePayHistoryService } from './employee_pay_history.service';
  import { Employee } from 'output/entities/Employee';
  import { EmployeePayHistory } from 'output/entities/EmployeePayHistory';
  import { Request } from 'express';
  import { Multer } from 'multer'; 

@Controller('employee-pay-history')
export class EmployeePayHistoryController {
    constructor(
        private ephService: EmployeePayHistoryService,
        @InjectRepository(Employee)
        private employeeRepo: Repository<Employee>
        ) {}

    @Get()
    public async findAllEph(@Paginate() query: PaginateQuery,
    ): Promise <Paginated<EmployeePayHistory>> {
      return await this.ephService.findAllEph(query);
    }
    //http://localhost:3002/employee-pay-history/2023-01-01
    @Get(':ephiRateChangeDate')
    public async findOneEph(@Param('ephiRateChangeDate') ephiRateChangeDate: Date) {
    return await this.ephService.findOneEph(ephiRateChangeDate);
    }

    @Post()
    public async createEph(
        @Body('ephiRateChangeDate') ephiRateChangeDate: Date,
        @Body('ephiRateSalary') ephiRateSalary: string,
        @Body('ephiPayFrequence') ephiPayFrequence: number,
        @Body('ephiModifiedDate') ephiModifiedDate: Date,
        @Body('empId') empId: number,
    ) {
    return await this.ephService.createEph(
        ephiRateChangeDate,
        ephiRateSalary, 
        ephiPayFrequence, 
        ephiModifiedDate,
        empId
    );
    } 
 
    @Put(':ephiRateChangeDate')
    public async updateEph(
      @Param('ephiRateChangeDate') ephiRateChangeDate: Date,
        @Body('ephiRateSalary') ephiRateSalary: string,
        @Body('ephiPayFrequence') ephiPayFrequence: number,
        @Body('ephiModifiedDate') ephiModifiedDate: Date,
        @Body('empId') empId: number,
        ) { 
        return await this.ephService.updateEph(
        ephiRateChangeDate,
        ephiRateSalary,   
        ephiPayFrequence, 
        ephiModifiedDate,
        empId
        );
        }

        @Delete(':ephiRateChangeDate')
        public async deleteEph(@Param('ephiRateChangeDate') ephiRateChangeDate: Date) {
          return await this.ephService.deleteEph(ephiRateChangeDate);
        }        
}
 