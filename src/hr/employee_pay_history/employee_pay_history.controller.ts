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

@Controller('employee-pay-history')
export class EmployeePayHistoryController {
    constructor(
        private ephService: EmployeePayHistoryService,
        @InjectRepository(Employee)
        private employeeRepo: Repository<Employee>
        ) {}

    // @Get()
    // public async findAllEph(@Paginate() query: PaginateQuery,
    // ): Promise <Paginated<EmployeePayHistory>> {
    //   return await this.ephService.findAllEph(query);
    // }

    @Get()
    public async getAllEph() {
      return await this.ephService.getAllEph();
    }

    //get all aphi by empId
    @Get('all/:id')
    public async findAllEph(@Param('id') id: number) {
      return await this.ephService.findAllEph(id);
    }

    //setelah input manual ephiRateChangeDate terbaca string di db
    //cari data yg input manual harus berupa string sesuai db , dan lengkap(bukan cuma date, time juga)
    //cari data yg sdh ada di db: http://localhost:3002/employee-pay-history/2023-01-01
    //cari data input manual: http://localhost:3002/employee-pay-history/"2023-04-29 16:51:14.745"
    @Get(':ephiRateChangeDate')
    public async findOneEph(@Param('ephiRateChangeDate') ephiRateChangeDate: Date) {
    return await this.ephService.findOneEph(ephiRateChangeDate);
    }

    @Post()
    public async createEph(
        @Body('ephiEmp') ephiEmp: Employee,
        ephiRateChangeDate: Date = new Date(), 
        @Body('ephiRateSalary') ephiRateSalary: string,
        @Body('ephiPayFrequence') ephiPayFrequence: number,
        ephiModifiedDate: Date = new Date(), 
    ) {
    return await this.ephService.createEph(
        ephiEmp,
        ephiRateChangeDate,
        ephiRateSalary, 
        ephiPayFrequence, 
        ephiModifiedDate,
    );
    } 

    @Put(':ephiRateChangeDate')
    public async updateEph(
        @Param('ephiRateChangeDate') ephiRateChangeDate: Date = new Date(), 
        @Body('ephiRateSalary') ephiRateSalary: string,
        @Body('ephiPayFrequence') ephiPayFrequence: number,
        ephiModifiedDate: Date = new Date(), 
        @Body('ephiEmp') ephiEmp: Employee,
        ) { 
        return await this.ephService.updateEph(
        ephiRateChangeDate,
        ephiRateSalary,   
        ephiPayFrequence, 
        ephiModifiedDate,
        ephiEmp,
        );
        }

        //cari data yg sdh ada di db: http://localhost:3002/employee-pay-history/2023-01-01
        //cari data input manual: http://localhost:3002/employee-pay-history/"2023-04-29 16:51:14.745"
        @Delete(':ephiRateChangeDate')
        public async deleteEph(@Param('ephiRateChangeDate') ephiRateChangeDate: Date) {
          return await this.ephService.deleteEph(ephiRateChangeDate);
        }        
}
 