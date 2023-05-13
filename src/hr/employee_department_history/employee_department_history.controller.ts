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
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm'
  import { Repository, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
  import { Employee } from 'output/entities/Employee';
  import { Department } from 'output/entities/Department';
  import { Shift } from 'output/entities/Shift';
  import { EmployeeDepartmentHistory } from 'output/entities/EmployeeDepartmentHistory';
  import { EmployeeDepartmentHistoryService } from './employee_department_history.service';

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
    public async findAllEdh() {
      return await this.edhService.findAllEdh();
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
        edhiModifiedDate: Date = new Date(), 
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
        edhiModifiedDate: Date = new Date(),
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
