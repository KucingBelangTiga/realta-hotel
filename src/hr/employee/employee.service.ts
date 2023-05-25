/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, Like, getConnection, createConnection, getRepository, EntityTarget, QueryRunner } from 'typeorm'; //lebih baik cari alternatif getConnection. karena di masa depan akan dihapus
import { FilterOperator, FilterSuffix, Paginate, PaginateQuery, paginate, Paginated } from 'nestjs-paginate'
import { Request } from 'express';
import { Multer } from 'multer';
import { Department } from 'output/entities/Department';
import { Employee } from 'output/entities/Employee';
import { EmployeeDepartmentHistory } from 'output/entities/EmployeeDepartmentHistory';
import { EmployeePayHistory } from 'output/entities/EmployeePayHistory';
import { JobRole } from 'output/entities/JobRole';
import { Users } from 'output/entities/Users';
import { EmployeeDepartmentHistoryService } from '../employee_department_history/employee_department_history.service';
import { EmployeePayHistoryService } from '../employee_pay_history/employee_pay_history.service';

@Injectable()
export class EmployeeService {
    constructor(
        private edhService: EmployeeDepartmentHistoryService,
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

    // public async findAllEmp() {
    //   return await this.employeeRepo.find({
    //     relations: ['empEmp', 'empJoro', 'empUser'],
    //     select: ['empId', 'empNationalId', 'empBirthDate', 'empMaritalStatus', 'empGender', 'empHireDate', 'empSalariedFlag', 'empVacationHours', 'empSickleaveHourse', 'empCurrentFlag', 'empPhoto', 'empModifiedDate', 'empEmp', 'empJoro.joroId', 'empJoro.joroName', 'empUser.userId', 'empUser.userFullName'],
    //   });
    // }

    public async findAllEmp() {
      return await this.employeeRepo
        .createQueryBuilder('emp')
        .leftJoinAndSelect('emp.empEmp', 'empEmp')
        .leftJoinAndSelect('emp.empJoro', 'empJoro')
        .leftJoinAndSelect('emp.empUser', 'empUser')
        .select([
          'emp.empId',
          'emp.empNationalId',
          'emp.empBirthDate',
          'emp.empMaritalStatus',
          'emp.empGender',
          'emp.empHireDate',
          'emp.empSalariedFlag',
          'emp.empVacationHours',
          'emp.empSickleaveHourse',
          'emp.empCurrentFlag',
          'emp.empPhoto',
          'emp.empModifiedDate',
          'empEmp',
          'empJoro.joroId',
          'empJoro.joroName',
          'empUser.userId',
          'empUser.userFullName',
        ])
        .getMany();
    } 

  //   public async findOneEmp(id: number) { 
  //     const employee = await this.employeeRepo.findOne({
  //         where: { empId: id },
  //         relations: ['empEmp', 'empJoro', 'empUser'], 
  //     });
  //     if (!employee) {
  //         throw new NotFoundException('Employee not found');
  //     }
  //     return employee;
  // }     
  public async findOneEmp(id: number) { 
    const employee = await this.employeeRepo
      .createQueryBuilder('emp')
      .where('emp.empId = :id', { id })
      .leftJoinAndSelect('emp.empEmp', 'empEmp')
      .leftJoinAndSelect('emp.empJoro', 'empJoro')
      .leftJoinAndSelect('emp.empUser', 'empUser')
      .select([
        'emp.empId',
        'emp.empNationalId',
        'emp.empBirthDate',
        'emp.empMaritalStatus',
        'emp.empGender',
        'emp.empHireDate',
        'emp.empSalariedFlag',
        'emp.empVacationHours',
        'emp.empSickleaveHourse',
        'emp.empCurrentFlag',
        'emp.empPhoto',
        'emp.empModifiedDate',
        'empEmp',
        'empJoro.joroId',
        'empJoro.joroName',
        'empUser.userId',
        'empUser.userFullName',
      ])
      .getOne();
  
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
  
    return employee;
  }  

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
          empEmpId?: number,
          empJoroId?: number,
          empUserId?: number,
          empName: string, }
          ) { createEmployee.empModifiedDate = new Date();
            try {
              const employee = createEmployee.empEmpId ? await this.employeeRepo.findOne({ where: { empId: createEmployee.empEmpId } }) : null;
              if (createEmployee.empEmpId && !employee) {
                throw new Error(`Employee with empId ${createEmployee.empEmpId} not found`);
              }
  
              const jobRole = createEmployee. empJoroId ? await this.jobRoleRepo.findOne({ where: { joroId: createEmployee. empJoroId } }) : null;
              if (createEmployee. empJoroId && !jobRole) {
                throw new Error(`Job role with  joroId ${createEmployee. empJoroId} not found`);
              }
  
              const user = createEmployee.empUserId ? await this.usersRepo.findOne({ where: { userId: createEmployee.empUserId } }) : null;
              if (createEmployee.empUserId && !user) {
                throw new Error(`User with userId ${createEmployee.empUserId} not found`);
              }
              const newEmp = this.employeeRepo.create({ 
              empPhoto: file ? file.originalname : null, 
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
          empName: string, 
          empEmp: Employee,
          empJoroId?: number,
          empUserId?: number,
        ) {
          try { 
            
            let updatedEmpEmp: Employee | undefined;

                  if (empEmp) {
                    updatedEmpEmp = empEmp;
                  } else {
                    const existingWode = await this.employeeRepo.findOne({ where: { empId: id } });
                    if (existingWode) {
                      updatedEmpEmp = existingWode.empEmp;
                    }
                  }

            const jobRole = await this.jobRoleRepo.findOne({ where: { joroId: empJoroId } });
            if (!jobRole) {
              throw new Error(`Job role with joroId ${empJoroId} not found`);
            }
            const user = await this.usersRepo.findOne({ where: { userId: empUserId } });
            if (!user) {
              throw new Error(`User with userId ${empUserId} not found`);
            }
            await this.employeeRepo.update(
              { empId: id },
              {
                empPhoto: file ? file.originalname : null,
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
                empName: empName,
                empEmp: updatedEmpEmp,
                empJoro: jobRole,
                empUser: user,
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
