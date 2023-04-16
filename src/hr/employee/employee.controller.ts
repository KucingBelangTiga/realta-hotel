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
  import { Employee } from 'output/entities/Employee';
  import { EmployeeService } from './employee.service';
  import { JobRole } from 'output/entities/JobRole';
  import { Request } from 'express';
  import { Multer } from 'multer';

@Controller('employee')
export class EmployeeController {
    constructor(
        private employeeService: EmployeeService,
        @InjectRepository(JobRole)
        private jobRoleRepo: Repository<JobRole>,
        ) {}

    @Get()
    public async findAllEmp(@Paginate() query: PaginateQuery,
    ): Promise <Paginated<Employee>> {
      return await this.employeeService.findAllEmp(query);
    }
    @Get(':id')
    public async findOneEmp(@Param('id') id: number) {
      return await this.employeeService.findOneEmp(id);
    }
    @Get('/employee/search')
    public async findNameEmp(@Query('empName') empName: string) {
    return await this.employeeService.findNameEmp(empName);
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    public async createEmp(
        @Body('empNationalId') empNationalId: string,
        @Body('empName') empName: string,
        @Body('empBirthDate') empBirthDate: string,
        @Body('empMaritalStatus') empMaritalStatus: string,
        @Body('empGender') empGender: string,
        @Body('empHireDate') empHireDate: Date,
        @Body('empSalariedFlag') empSalariedFlag: string,
        @Body('empVacationHours') empVacationHours: number,
        @Body('empSickleaveHourse') empSickleaveHourse: number,
        @Body('empCurrentFlag') empCurrentFlag: number,
        // @Body('empPhoto') empPhoto: string,
        @Body('empModifiedDate') empModifiedDate: Date,
        @Body('userId') userId: number,
        // @Body('empEmp') empEmp: Employee, //mengambil semua data dr employee
        // @Body('empJoro') empJoro: JobRole //mengambil semua data dr jobrole
        @Body('empId') empId: number,
        @Body('joroId') joroId: number,
        @UploadedFile() file: any
    ) {
    // const empId = empEmp.empId; //akses utk empId dgn relasi empEmp
    // const joroId = empJoro.joroId;
    return await this.employeeService.createEmp(
        empNationalId,
        empName,
        empBirthDate,
        empMaritalStatus, 
        empGender, 
        empHireDate,
        empSalariedFlag,
        empVacationHours,
        empSickleaveHourse,
        empCurrentFlag,
        // empPhoto,
        empModifiedDate,
        userId,
        // empEmp,
        // empJoro 
        empId,
        joroId,
        file
    );
    } 
 
    //pakai fileinterceptor: photo harus upload ulang, jika tidak, maka akan dihapus di database jadi kosong
    // @Put(':id')
    // @UseInterceptors(FileInterceptor('file'))
    // public async updateEmp(
    // @Param('id') id: number,
    // @Body('empNationalId') empNationalId: string, 
    // @Body('empName') empName: string,
    // @Body('empBirthDate') empBirthDate: string,
    // @Body('empMaritalStatus') empMaritalStatus: string,
    // @Body('empGender') empGender: string,
    // @Body('empHireDate') empHireDate: Date,
    // @Body('empSalariedFlag') empSalariedFlag: string,
    // @Body('empVacationHours') empVacationHours: number,
    // @Body('empSickleaveHourse') empSickleaveHourse: number,
    // @Body('empCurrentFlag') empCurrentFlag: number,
    // // @Body('empPhoto') empPhoto: string,
    // @Body('empModifiedDate') empModifiedDate: Date,
    // @Body('userId') userId: number,
    // @Body('empId') empId: number,
    // @Body('joroId') joroId: number,
    // @UploadedFile() file: any
    // ) {
    // return await this.employeeService.updateEmp(
    //   id,
    //   empNationalId,
    //   empName,
    //   empBirthDate,
    //   empMaritalStatus, 
    //   empGender, 
    //   empHireDate,
    //   empSalariedFlag,
    //   empVacationHours,
    //   empSickleaveHourse,
    //   empCurrentFlag,
    //   // empPhoto,
    //   empModifiedDate,
    //   userId,
    //   empId, 
    //   joroId,
    //   file
    // );
    // }
    @Put(':id')
    public async updateEmp(
    @Param('id') id: number,
    @Body('empNationalId') empNationalId: string, 
    @Body('empName') empName: string,
    @Body('empBirthDate') empBirthDate: string,
    @Body('empMaritalStatus') empMaritalStatus: string,
    @Body('empGender') empGender: string,
    @Body('empHireDate') empHireDate: Date,
    @Body('empSalariedFlag') empSalariedFlag: string,
    @Body('empVacationHours') empVacationHours: number,
    @Body('empSickleaveHourse') empSickleaveHourse: number,
    @Body('empCurrentFlag') empCurrentFlag: number,
    @Body('empModifiedDate') empModifiedDate: Date,
    @Body('userId') userId: number,
    @Body('empId') empId: number,
    @Body('joroId') joroId: number,
    @UploadedFile() file: any
) {
    let empPhoto: any;
    if (file) {
        empPhoto = file.filename;
    } else {
        // Jika file empPhoto tidak diunggah, gunakan nilai lama yang ada di database
        const emp = await this.employeeService.findOneEmp(id);
        empPhoto = emp.empPhoto;
    }
    return await this.employeeService.updateEmp(
        id,
        empNationalId,
        empName,
        empBirthDate,
        empMaritalStatus, 
        empGender, 
        empHireDate,
        empSalariedFlag,
        empVacationHours,
        empSickleaveHourse,
        empCurrentFlag,
        empModifiedDate,
        userId,
        empId, 
        joroId,
        empPhoto
    );
    }

    @Delete(':id')
    public async deleteEmp(@Param('id') id: number) {
    return await this.employeeService.deleteEmp(id);
    }

}
