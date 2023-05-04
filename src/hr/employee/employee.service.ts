/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, Like, getConnection } from 'typeorm'; //lebih baik cari alternatif getConnection. karena di masa depan akan dihapus
import { FilterOperator, FilterSuffix, Paginate, PaginateQuery, paginate, Paginated } from 'nestjs-paginate'
import { Request } from 'express';
import { Multer } from 'multer';
import { Department } from 'output/entities/Department';
import { Employee } from 'output/entities/Employee';
import { EmployeeDepartmentHistory } from 'output/entities/EmployeeDepartmentHistory';
import { EmployeePayHistory } from 'output/entities/EmployeePayHistory';
import { JobRole } from 'output/entities/JobRole';
import { Users } from 'output/entities/Users';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(Department)
        private departmentRepo: Repository<Department>, 
        @InjectRepository(Employee)
        private employeeRepo: Repository<Employee>,
        @InjectRepository(EmployeeDepartmentHistory)
        private edhRepo: Repository<EmployeeDepartmentHistory>,
        @InjectRepository(EmployeePayHistory)
        private ephRepo: Repository<EmployeePayHistory>,
        @InjectRepository(JobRole)
        private jobRoleRepo: Repository<JobRole>,
        @InjectRepository(Users)
        private usersRepo: Repository<Users>,
      ) {}

    //   public async findAllEmp(query: PaginateQuery): Promise<Paginated<Employee>> {
    //     return paginate (query, this.employeeRepo, {
    //         sortableColumns: ['empId', 'empNationalId', 'empName', 'empBirthDate', 'empMaritalStatus', 'empGender', 'empHireDate', 'empSalariedFlag', 'empVacationHours', 'empSickleaveHourse', 'empCurrentFlag', 'empPhoto', 'empModifiedDate', 'empUser.userId', 'empEmp.empId', 'empJoro.joroId'],
    //         defaultSortBy: [['empId', 'ASC']],
    //         searchableColumns: ['empId', 'empNationalId', 'empName', 'empBirthDate', 'empMaritalStatus', 'empGender', 'empHireDate', 'empSalariedFlag', 'empVacationHours', 'empSickleaveHourse', 'empCurrentFlag', 'empPhoto', 'empModifiedDate', 'empUser.userId', 'empEmp.empId', 'empJoro.joroId'],
    //         select: ['empId', 'empNationalId', 'empName', 'empBirthDate', 'empMaritalStatus', 'empGender', 'empHireDate', 'empSalariedFlag', 'empVacationHours', 'empSickleaveHourse', 'empCurrentFlag', 'empPhoto', 'empModifiedDate', 'empUser.userId', 'empEmp.empId', 'empJoro.joroId'],
    //         maxLimit: 10, defaultLimit: 5,
    //         relations: {
    //             empEmp: true,
    //             empJoro: true,
    //             empUser: true
    //         }, //bisa pakai array spt findOne di bawah
    //         filterableColumns: {
    //             empId: [FilterOperator. IN],
    //             empName: [FilterOperator. ILIKE],
    //             empNationalId: [FilterOperator. ILIKE],
    //         },
    //     });
    // }
    public async findAllEmp() {
      return await this.employeeRepo.find({
        relations: ['empEmp', 'empJoro', 'empUser'],
        // select: ['empId', 'empNationalId', 'empBirthDate', 'empMaritalStatus', 'empGender', 'empHireDate', 'empSalariedFlag', 'empVacationHours', 'empSickleaveHourse', 'empCurrentFlag', 'empPhoto', 'empModifiedDate', 'empEmp', 'empJoro', 'empUser', 'empName'],
      });
    }
    public async findOneEmp(id: number) { 
      const employee = await this.employeeRepo.findOne({
          where: { empId: id },
          relations: ['empEmp', 'empJoro', 'empUser'], 
      });
      if (!employee) {
          throw new NotFoundException('Employee not found');
      }
      return employee;
  }     
    // public async getDephi(id: number): Promise<any> {
    //   return await this.edhRepo.find({
    //     where: { edhiEmpId: id },
    //     relations: { edhiDept: true, edhiShift: true },
    //   });
    // }
    // public async getEphi(id: number): Promise<any> {
    //   return await this.ephRepo.find({
    //     where: { ephiEmp: { empId: id } },
    //   });
    // }
    // public async employeeDetail(id: number): Promise<any> {
    //   return await this.employeeRepo.query(
    //     `select * from hr.profileDetail(${id})`,
    //   );
    // }

      // public async createEmp(
      //   empNationalId: string,
      //   empBirthDate: string,
      //   empMaritalStatus: string, 
      //   empGender: string, 
      //   empHireDate: Date,
      //   empSalariedFlag: string,
      //   empVacationHours: number,
      //   empSickleaveHourse: number,
      //   empCurrentFlag: number,
      //   // empPhoto: string,
      //   empModifiedDate: Date,
      //   userId: number,
      //   // empEmp: Employee, //relasi employee
      //   // empJoro: JobRole //relasi jobrole
      //   empId: number,
      //   joroId: number,
      //   // file: any,
      //   // empName: string,
      //   ) {
      //   try {
      //     await this.employeeRepo.save({
      //       empNationalId: empNationalId,
      //       empBirthDate: empBirthDate,
      //       empMaritalStatus: empMaritalStatus, 
      //       empGender: empGender, 
      //       empHireDate: empHireDate,
      //       empSalariedFlag: empSalariedFlag,
      //       empVacationHours: empVacationHours,
      //       empSickleaveHourse: empSickleaveHourse,
      //       empCurrentFlag: empCurrentFlag,
      //       empModifiedDate: empModifiedDate,
      //       empUser: { userId: userId },
      //       // empEmp: Employee,
      //       // empJoro: JobRole
      //       empEmp: { empId: empId },
      //       empJoro: { joroId: joroId },
      //       // empPhoto: file && file.originalname //cek file
      //       // empPhoto: file.originalname,
      //       // empName: empName,
      //     });
      //   //   return response;
      //   return {
      //       statusCode: 201,
      //       message: 'Data added successfully',
      //       data: {
      //           empNationalId: empNationalId,
      //           empEmp: { empId: empId }
      //       },
      //     };
      //   } catch (error) {
      //     throw new Error(`Error adding data: ${error.message}`);
      //   }
      //   }
      public async createEmp(
        file: any,
        createEmployee: {
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
        empId: number,
        joroId: number,
        userId: number,
        empName: string, }
        ) { createEmployee.empModifiedDate = new Date();
          try {
            const employee = await this.employeeRepo.findOne({ where: { empId: createEmployee.empId } });
            if (!employee) {
                throw new Error(`Employee with empId ${createEmployee.empId} not found`);
            }
          const jobRole = await this.jobRoleRepo.findOne({ where: { joroId: createEmployee.joroId } });
          if (!jobRole) {
            throw new Error(`Job role with joroId ${createEmployee.joroId} not found`);
          }
          const user = await this.usersRepo.findOne({ where: { userId: createEmployee.userId } });
          if (!user) {
            throw new Error(`User with userId ${createEmployee.userId} not found`);
          }
            const newEmp = this.employeeRepo.create({ 
            empPhoto: file.originalname,
            empNationalId: createEmployee.empNationalId,
            empBirthDate: createEmployee.empBirthDate,
            empMaritalStatus: createEmployee.empMaritalStatus, 
            empGender: createEmployee.empGender, 
            empHireDate: createEmployee.empHireDate,
            empSalariedFlag: createEmployee.empSalariedFlag,
            empVacationHours: createEmployee.empVacationHours,
            empSickleaveHourse: createEmployee.empSickleaveHourse,
            empCurrentFlag: createEmployee.empCurrentFlag,
            empModifiedDate: createEmployee.empModifiedDate,
            empEmp: employee,
            empJoro: jobRole,
            empUser: user,
            empName: createEmployee.empName,
          });
        await this.employeeRepo.save(newEmp);
        return {
            statusCode: 201,
            message: 'Data added successfully',
            data: {
                empId: newEmp.empId,
                // empName: empName,
                empNationalId: createEmployee.empNationalId,
                empEmp: employee,
                empUser: user,
                empJoro: jobRole,
            },
          };
        } catch (error) {
          throw new Error(`Error adding data: ${error.message}`);
        }
        }

        //gajadi pake, gabung ke create aja
        // public async Upload(file){
        //   try{
        //     const uplEmp = await this.employeeRepo.save({
        //       empPhoto: file.originalname
        //     });
        //     return{
        //       statusCode: 201,
        //       message: 'Photo added successfully',
        //       data: uplEmp,
        //     };
        // } catch (error) {
        //   throw new Error(`Error uploading photo: ${error.message}`);
        // }
        // }

        public async updatePhoto(id: number, file): Promise<Employee> {
          try {
            const emp = await this.employeeRepo.findOne({ where: { empId: id } });
            if (!emp) {
              throw new Error('Employee not found');
            }
            emp.empPhoto = file.originalname;
            // return await this.employeeRepo.save(emp);
            const updatedEmp = await this.employeeRepo.save(emp);
            console.log('Photo updated successfully');
            return updatedEmp;
          } catch (error) {
            throw new Error(`Error updating photo: ${error.message}`);
          }
        }        
  
        public async updateEmp(
          id: number,
          file: any,
          empNationalId: string,
          empBirthDate: string,
          empMaritalStatus: string, 
          empGender: string, 
          empHireDate: Date,
          empSalariedFlag: string,
          empVacationHours: number,
          empSickleaveHourse: number,
          empCurrentFlag: number,
          empModifiedDate: Date = new Date(),
          empId: number,
          joroId: number,
          userId: number,
          empName: string, 
        ) {
          try { 
            const employee = await this.employeeRepo.findOne({ where: { empId: empId } });
            if (!employee) {
                throw new Error(`Employee with empId ${empId} not found`);
            }
            const jobRole = await this.jobRoleRepo.findOne({ where: { joroId: joroId } });
            if (!jobRole) {
              throw new Error(`Job role with joroId ${joroId} not found`);
            }
            const user = await this.usersRepo.findOne({ where: { userId: userId } });
            if (!user) {
              throw new Error(`User with userId ${userId} not found`);
            }
            await this.employeeRepo.update(
              { empId: id },
              {
                empPhoto: file.originalname,
                empNationalId: empNationalId,
                empBirthDate: empBirthDate,
                empMaritalStatus: empMaritalStatus, 
                empGender: empGender, 
                empHireDate: empHireDate,
                empSalariedFlag: empSalariedFlag,
                empVacationHours: empVacationHours,
                empSickleaveHourse: empSickleaveHourse,
                empCurrentFlag: empCurrentFlag,
                empModifiedDate: empModifiedDate,
                empEmp: employee,
                empJoro: jobRole,
                empUser: user,
                empName: empName,
              } 
            );
            return {
              statusCode: 200,
              message: 'Data updated successfully',
              data: {
                  empId: id,
              },
            };
          } catch (error) {
            throw new Error(`Error updating data: ${error.message}`);
          }
        }        
          
          public async deleteEmp(id: number) {
            try {
              await this.employeeRepo.delete(id);
              return {
                statusCode: 200,
                message: 'Data deleted successfully.',
                data: {
                    empId: id,
                },
              };
            } catch (error) {
              throw new Error(`Error deleting data: ${error.message}`);
            }
          }
} 
