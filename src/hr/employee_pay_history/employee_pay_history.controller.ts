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
    public async findAllEph() {
      return await this.ephService.findAllEph();
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
        @Body('ephiEmpId') ephiEmpId: number,
        // @Body('ephiRateChangeDate') ephiRateChangeDate: Date = new Date(),
        ephiRateChangeDate: Date = new Date(), //otomatis tgl saat ini dari db, tanpa input manual pada Body
        @Body('ephiRateSalary') ephiRateSalary: string,
        @Body('ephiPayFrequence') ephiPayFrequence: number,
        // @Body('ephiModifiedDate') ephiModifiedDate: Date = new Date(),
        ephiModifiedDate: Date = new Date(), 
    ) {
    return await this.ephService.createEph(
        ephiEmpId,
        ephiRateChangeDate,
        ephiRateSalary, 
        ephiPayFrequence, 
        ephiModifiedDate,
    );
    } 

    @Put(':ephiRateChangeDate')
    public async updateEph(
        @Param('ephiRateChangeDate') ephiRateChangeDate: Date = new Date(), //jika ingin otomatis, bisa diatur spt modifieddate
        @Body('ephiEmpId') ephiEmpId: number,
        @Body('ephiRateSalary') ephiRateSalary: string,
        @Body('ephiPayFrequence') ephiPayFrequence: number,
        // @Body('ephiModifiedDate') ephiModifiedDate: Date = new Date(),
        ephiModifiedDate: Date = new Date(), 
        ) { 
        return await this.ephService.updateEph(
        ephiRateChangeDate,
        ephiEmpId,
        ephiRateSalary,   
        ephiPayFrequence, 
        ephiModifiedDate,
        );
        }

        //cari data yg sdh ada di db: http://localhost:3002/employee-pay-history/2023-01-01
        //cari data input manual: http://localhost:3002/employee-pay-history/"2023-04-29 16:51:14.745"
        @Delete(':ephiRateChangeDate')
        public async deleteEph(@Param('ephiRateChangeDate') ephiRateChangeDate: Date) {
          return await this.ephService.deleteEph(ephiRateChangeDate);
        }        
}
 