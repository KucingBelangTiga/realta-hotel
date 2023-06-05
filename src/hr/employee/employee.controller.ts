/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Patch,
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
  import { Employee } from 'output/entities/Employee';
  import { EmployeeService } from './employee.service';
  import { JobRole } from 'output/entities/JobRole';
  import { JobRoleService } from '../job_role/job_role.service';
  import { EmployeeDepartmentHistory } from 'output/entities/EmployeeDepartmentHistory';
  import { EmployeePayHistory } from 'output/entities/EmployeePayHistory';
  import { Users } from 'output/entities/Users';
  import { Department } from 'output/entities/Department';
  import { Shift } from 'output/entities/Shift';
  import { Request } from 'express';
  import { Multer } from 'multer';
  import { diskStorage } from 'multer';
  import { extname } from 'path';
  import * as path from 'path';

@Controller('employee')
export class EmployeeController {
    constructor(
        private employeeService: EmployeeService,
        private joroService: JobRoleService,
        @InjectRepository(JobRole)
        private jobRoleRepo: Repository<JobRole>,
        @InjectRepository(Users)
        private usersRepo: Repository<Users>,
        @InjectRepository(Department)
        private departmentRepo: Repository<Department>, 
        @InjectRepository(Shift)
        private shiftRepo: Repository<Shift>, 
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
            destination: './uploads/hr',
            filename: (req, file, callback) => {
            const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const empNationalId = req.body.empNationalId;
            const fileName = `${uniquePrefix}_${empNationalId}_${file.originalname}`; 
            const filePath = path.join('/uploads/hr', fileName);
            callback(null, fileName, filePath);
    },
    }),
            fileFilter: (req, file, callback) => {
                if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                return callback(new Error('Only jpg, jpeg, and png files are allowed!'), false);
                }
                callback(null, true);
            },
            limits: { fileSize: 1 * 1024 * 1024 },
    }
    ))
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
          empEmp?: Employee, 
          empJoroId?: number,
          empUserId?: number,
          empName: string,
        },

        @Body('ephiEmp') ephiEmp: Employee,
        ephiRateChangeDate: Date = new Date(),
        @Body('ephiRateSalary') ephiRateSalary: string,
        @Body('ephiPayFrequence') ephiPayFrequence: number,
        ephiModifiedDate: Date = new Date(),

        @Body('edhiEmp') edhiEmp: Employee,
        @Body('edhiStartDate') edhiStartDate: Date,
        @Body('edhiEndDate') edhiEndDate: Date,
        edhiModifiedDate: Date = new Date(),
        @Body('edhiDept') edhiDept: Department,
        @Body('edhiShift') edhiShift: Shift,
    ) {  createEmployee.empModifiedDate = new Date();
    if (!file) {
        file = null; 
    }
    if (!createEmployee.empUserId) {
        createEmployee.empUserId = null;
    }
    if (!createEmployee.empEmp) {
        createEmployee.empEmp = null;
    }
    if (!createEmployee. empJoroId) {
        createEmployee. empJoroId = null;
    }
    return await this.employeeService.createEmp(
        file, 
        createEmployee,
        ephiEmp,
        ephiRateChangeDate,
        ephiRateSalary, 
        ephiPayFrequence, 
        ephiModifiedDate,
        edhiEmp,
        edhiStartDate,
        edhiEndDate, 
        edhiModifiedDate, 
        edhiDept,
        edhiShift,
    );
} 

    @Put(':id') 
    @UseInterceptors(FileInterceptor('file', 
        {
            storage: diskStorage({ 
                destination: './uploads/hr',
                filename: (req, file, callback) => {
                  const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                  const empNationalId = req.body.empNationalId;
                  const fileName = `${uniquePrefix}_${empNationalId}_${file.originalname}`; 
                  const filePath = path.join('/uploads/hr', fileName);
                  callback(null, fileName, filePath);
        },
        }),
                fileFilter: (req, file, callback) => {
                    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                    return callback(new Error('Only jpg, jpeg, and png files are allowed!'), false);
                    }
                    callback(null, true);
                },
                limits: { fileSize: 1 * 1024 * 1024 },
        }
        ))
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
        empModifiedDate: Date = new Date(),
        @Body('empName') empName: string,
        @Body('empEmp') empEmp: Employee,
        @Body('empJoroId') empJoroId?: number,
        @Body('empUserId') empUserId?: number,
    ) { 
        if (!empUserId) {
            empUserId = null;
        }
        if (!empJoroId) {
            empJoroId = null;
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
        empEmp,
        empJoroId,
        empUserId,
    );
    }  

    @Delete(':id')
    public async deleteEmp(@Param('id') id: number) {
    return await this.employeeService.deleteEmp(id);
    }
} 
