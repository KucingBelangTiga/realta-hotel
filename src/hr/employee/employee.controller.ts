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
    UseInterceptors,
    UploadedFile,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm'
  import { Repository, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
  import { FileInterceptor } from '@nestjs/platform-express';
  import { Request } from 'express';
  import { Multer } from 'multer';
  import { diskStorage } from 'multer';
  import { extname } from 'path';
  import { Employee } from 'output/entities/Employee';
  import { JobRole } from 'output/entities/JobRole';
  import { Users } from 'output/entities/Users';
  import { EmployeeService } from './employee.service';
  import { JobRoleService } from '../job_role/job_role.service';

@Controller('employee')
export class EmployeeController {
    constructor(
        private employeeService: EmployeeService,
        private joroService: JobRoleService,
        @InjectRepository(JobRole)
        private jobRoleRepo: Repository<JobRole>,
        @InjectRepository(Users)
        private usersRepo: Repository<Users>,
        ) {}

    @Get()
    public async findAllEmp() {
      return await this.employeeService.findAllEmp();
    }
    
    @Get(':id') 
    public async findOneEmp(@Param('id') id: number) {
      return await this.employeeService.findOneEmp(id);
    }
    
    @Post() 
    @UseInterceptors(FileInterceptor('file', 
    {
        storage: diskStorage({ 
            destination: './uploads',
            filename: (req, file, callback) => {
              const fileName = `${file.originalname}`; 
              callback(null, fileName);
    },})}))
    public async createEmp(
        @UploadedFile() file,
        @Body() createEmployee: {
          empNationalId: string,
          empBirthDate: string,
          empMaritalStatus: string,
          empGender: string,
          empHireDate: Date,
          empSalariedFlag: string,
          empVacationHours: number,
          empSickleaveHourse: number,
          empCurrentFlag: number, 
          empModifiedDate: Date, 
          empId?: number,
          joroId?: number,
          userId?: number,
          empName: string,
        }
    ) { 
    createEmployee.empModifiedDate = new Date();
    //jika tak masuk request = null
    if (!file) {
        file = null; 
    }
    if (!createEmployee.userId) {
        createEmployee.userId = null;
    }
    if (!createEmployee.empId) {
        createEmployee.empId = null;
    }
    if (!createEmployee.joroId) {
        createEmployee.joroId = null;
    }
    return await this.employeeService.createEmp(
        file, 
        createEmployee
    );
}

    @Put(':id') 
    @UseInterceptors(FileInterceptor('file', 
    {
        storage: diskStorage({ 
            destination: './uploads',
            filename: (req, file, callback) => {
              const fileName = `${file.originalname}`; 
              callback(null, fileName);
    },})}))
    public async updateEmp(
        @Param('id') id: number,
        @UploadedFile() file,
        @Body('empNationalId') empNationalId: string,
        @Body('empBirthDate') empBirthDate: string,
        @Body('empMaritalStatus') empMaritalStatus: string,
        @Body('empGender') empGender: string,
        @Body('empHireDate') empHireDate: Date,
        @Body('empSalariedFlag') empSalariedFlag: string,
        @Body('empVacationHours') empVacationHours: number,
        @Body('empSickleaveHourse') empSickleaveHourse: number,
        @Body('empCurrentFlag') empCurrentFlag: number, 
        // @Body('empModifiedDate') empModifiedDate: Date,
        empModifiedDate: Date = new Date(),
        @Body('empName') empName: string,
        @Body('empId') empId?: number,
        @Body('joroId') joroId?: number,
        @Body('userId') userId?: number,
    ) { 
        if (!file) {
            file = null; 
        }
        if (!userId) {
           userId = null;
        }
        if (!empId) {
            empId = null;
        }
        if (!joroId) {
            joroId = null;
        }
    return await this.employeeService.updateEmp(
        id,
        file, 
        empNationalId,
        empBirthDate,
        empMaritalStatus, 
        empGender, 
        empHireDate,
        empSalariedFlag,
        empVacationHours,
        empSickleaveHourse,
        empCurrentFlag,
        empModifiedDate,
        empName,
        empId,
        joroId,
        userId,
    );
    }  

    @Delete(':id')
    public async deleteEmp(@Param('id') id: number) {
    return await this.employeeService.deleteEmp(id);
    }
} 
