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
  import { EmployeeDepartmentHistoryService } from './employee_department_history.service';
  import { Employee } from 'output/entities/Employee';
  import { Department } from 'output/entities/Department';
  import { Shift } from 'output/entities/Shift';
  import { EmployeeDepartmentHistory } from 'output/entities/EmployeeDepartmentHistory';

@Controller('employee-department-history')
export class EmployeeDepartmentHistoryController {
    constructor(
        private edhService: EmployeeDepartmentHistoryService,
        @InjectRepository(Employee)
        private employeeRepo: Repository<Employee>,
        @InjectRepository(Department)
        private departmentRepo: Repository<Department>,
        @InjectRepository(Shift)
        private shiftRepo: Repository<Shift>,
        ) {}

    @Get()
    public async findAllEdh(@Paginate() query: PaginateQuery,
    ): Promise <Paginated<EmployeeDepartmentHistory>> {
      return await this.edhService.findAllEdh(query);
    }
    @Get(':id')
    public async findOneEdh(@Param('id') id: number) {
      return await this.edhService.findOneEdh(id);
    }

    @Post()
    public async createEdh(
        @Body('edhiEmpId') edhiEmpId: number,
        @Body('edhiStartDate') edhiStartDate: Date,
        @Body('edhiEndDate') edhiEndDate: Date,
        @Body('edhiModifiedDate') edhiModifiedDate: Date,
        @Body('deptId') deptId: number,
        @Body('shiftId') shiftId: number 
    ) {
    return await this.edhService.createEdh(
        edhiEmpId,
        edhiStartDate,
        edhiEndDate, 
        edhiModifiedDate, 
        deptId,
        shiftId
    );
    } 
 
    @Put(':id')
    public async updateEdh(
        @Param('id') id: number,
        @Body('edhiEmpId') edhiEmpId: number, 
        @Body('edhiStartDate') edhiStartDate: Date, 
        @Body('edhiEndDate') edhiEndDate: Date,
        @Body('edhiModifiedDate') edhiModifiedDate: Date,
        @Body('deptId') deptId: number,
        @Body('shiftId') shiftId: number
        ) { 
        return await this.edhService.updateEdh(
        id,
        edhiEmpId,
        edhiStartDate,
        edhiEndDate,   
        edhiModifiedDate, 
        deptId,
        shiftId
        );
        }

    @Delete(':id')
    public async deleteEdh(@Param('id') id: number) {
    return await this.edhService.deleteEdh(id);
    }
}
