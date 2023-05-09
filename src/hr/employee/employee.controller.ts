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
  import { Users } from 'output/entities/Users';
  import { Request } from 'express';
  import { Multer } from 'multer';
  import { diskStorage } from 'multer';
  import { extname } from 'path';

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

    // @Get()
    // public async findAllEmp(@Paginate() query: PaginateQuery,
    // ): Promise <Paginated<Employee>> {
    //   return await this.employeeService.findAllEmp(query);
    // }
    @Get()
    public async findAllEmp() {
      return await this.employeeService.findAllEmp();
    }
    @Get(':id') 
    public async findOneEmp(@Param('id') id: number) {
      return await this.employeeService.findOneEmp(id);
    }

    // @Get('/:id')
    // public async detailEmp(@Param('id') param): Promise<any> {
    // const profile = await this.employeeService.employeeDetail(param);
    // const dephi = await this.employeeService.getDephi(param);
    // const ephi = await this.employeeService.getEphi(param);
    // return {
    //     employees: profile[0],
    //     dephi,
    //     ephi,
    //   };
    // }

    // @Post()
    // // @UseInterceptors(FileInterceptor('file'))
    // public async createEmp(
    //     @Body('empNationalId') empNationalId: string,
    //     @Body('empBirthDate') empBirthDate: string,
    //     @Body('empMaritalStatus') empMaritalStatus: string,
    //     @Body('empGender') empGender: string,
    //     @Body('empHireDate') empHireDate: Date,
    //     @Body('empSalariedFlag') empSalariedFlag: string,
    //     @Body('empVacationHours') empVacationHours: number,
    //     @Body('empSickleaveHourse') empSickleaveHourse: number,
    //     @Body('empCurrentFlag') empCurrentFlag: number, 
    //     // @Body('empPhoto') empPhoto: string,
    //     @Body('empModifiedDate') empModifiedDate: Date,
    //     @Body('userId') userId: number,
    //     // @Body('empEmp') empEmp: Employee, //mengambil semua data dr employee
    //     // @Body('empJoro') empJoro: JobRole //mengambil semua data dr jobrole
    //     @Body('empId') empId: number,
    //     @Body('joroId') joroId: number,
    //     // @UploadedFile() file: any,
    //     // @Body('empName') empName: string,
    // ) {
    // // const empId = empEmp.empId; //akses utk empId dgn relasi empEmp
    // // const joroId = empJoro.joroId;
    // return await this.employeeService.createEmp(
    //     empNationalId,
    //     empBirthDate,
    //     empMaritalStatus, 
    //     empGender, 
    //     empHireDate,
    //     empSalariedFlag,
    //     empVacationHours,
    //     empSickleaveHourse,
    //     empCurrentFlag,
    //     // empPhoto,
    //     empModifiedDate,
    //     userId,
    //     // empEmp,
    //     // empJoro ,
    //     empId,
    //     joroId,
    //     // file,
    //     // empName,
    // );
    // }   

    // @Post() //upload foto bisa masuk sini, tapi sdh terlanjur pisah
    // public async createEmp(
    //     @Body('empNationalId') empNationalId: string,
    //     @Body('empBirthDate') empBirthDate: string,
    //     @Body('empMaritalStatus') empMaritalStatus: string,
    //     @Body('empGender') empGender: string,
    //     @Body('empHireDate') empHireDate: Date, 
    //     @Body('empSalariedFlag') empSalariedFlag: string,
    //     @Body('empVacationHours') empVacationHours: number,
    //     @Body('empSickleaveHourse') empSickleaveHourse: number,
    //     @Body('empCurrentFlag') empCurrentFlag: number, 
    //     // @Body('empModifiedDate') empModifiedDate: Date,
    //     empModifiedDate: Date = new Date(), 
    //     @Body('empId') empId: number,
    //     @Body('joroId') joroId: number,
    //     @Body('userId') userId: number,
    //     @Body('empName') empName: string,
    // ) {
    // return await this.employeeService.createEmp(
    //     empNationalId,
    //     empBirthDate,
    //     empMaritalStatus, 
    //     empGender, 
    //     empHireDate,
    //     empSalariedFlag,
    //     empVacationHours,
    //     empSickleaveHourse,
    //     empCurrentFlag,
    //     empModifiedDate,
    //     empId,
    //     joroId,
    //     userId,
    //     empName
    // );
    // }  
    
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
    //     createEmployee.empModifiedDate = new Date();
    // return await this.employeeService.createEmp(
    //     file, 
    //     createEmployee
    // );
    // } 
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

    //gajadi pake, gabung ke create aja
    // @Post('/upload') //photo only
    // @UseInterceptors(FileInterceptor('file', 
    // {
    //     storage: diskStorage({ 
    //         destination: './uploads',
    //         filename: (req, file, callback) => {
    //           //pakai id dan name? blm di-tes
    //           // const id = req.body.empId; //mengambil nilai id dari body request
    //           // const name = req.body.empName; //mengambil nilai name dari body request
    //           // const fileName = `(empName: ${name}-empId: ${id})-${path.extname(file.originalname)}`;
    //           // const fileName = `(empName: ${req.body.empName})_(empId: ${req.body.empId})_${file.originalname}`; //atau langsung begini aja. coba satu per satu
    //           const fileName = `${file.originalname}`; //masih nama asli file
    //           callback(null, fileName);
    // },})}
    // ))
    // public async upload(@UploadedFile() file) {
    //   return await this.employeeService.Upload(file);
    // }

    //gabung ke edit
    // @Patch('/:id/photo') 
    // @UseInterceptors(FileInterceptor('file', 
    // {
    //     storage: diskStorage({
    //         destination: './uploads',
    //         filename: (req, file, callback) => {
    //           //pakai id dan name? blm di-tes
    //           // const id = req.body.empId; //mengambil nilai id dari body request
    //           // const name = req.body.empName; //mengambil nilai name dari body request
    //           // const fileName = `(empName: ${name}-empId: ${id})-${path.extname(file.originalname)}`;
    //           // const fileName = `(empName: ${req.body.empName})_(empId: ${req.body.empId})_${file.originalname}`; //atau langsung begini aja. coba satu per satu
    //           const fileName = `${file.originalname}`; //masih nama asli file
    //           callback(null, fileName);
    // },})}
    // ))
    // public async updatePhoto(
    // @Param('id') id: number,
    // @UploadedFile() file,
    // ): Promise<Employee> {
    // return await this.employeeService.updatePhoto(id, file);
    // }

//     @Put(':id') //update foto bisa masuk sini, tapi sdh terlanjur pisah
//     public async updateEmp(
//     @Param('id') id: number,
    // @Body('empNationalId') empNationalId: string,
    // @Body('empBirthDate') empBirthDate: string,
    // @Body('empMaritalStatus') empMaritalStatus: string,
    // @Body('empGender') empGender: string,
    // @Body('empHireDate') empHireDate: Date,
    // @Body('empSalariedFlag') empSalariedFlag: string,
    // @Body('empVacationHours') empVacationHours: number,
    // @Body('empSickleaveHourse') empSickleaveHourse: number,
    // @Body('empCurrentFlag') empCurrentFlag: number, 
    // // @Body('empModifiedDate') empModifiedDate: Date,
    // empModifiedDate: Date = new Date(),
    // @Body('empId') empId: number,
    // @Body('joroId') joroId: number,
    // @Body('userId') userId: number,
    // @Body('empName') empName: string,
// ) {
//     return await this.employeeService.updateEmp(
//         id,
        // empNationalId,
        // empBirthDate,
        // empMaritalStatus, 
        // empGender, 
        // empHireDate,
        // empSalariedFlag,
        // empVacationHours,
        // empSickleaveHourse,
        // empCurrentFlag,
        // empModifiedDate,
        // empId,
        // joroId,
        // userId,
        // empName
//     );
//     }

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
