/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, Like, getConnection } from 'typeorm'; //lebih baik cari alternatif getConnection. karena di masa depan akan dihapus
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

    public async findAllEmp() {
      return await this.employeeRepo.find({
        relations: ['empEmp', 'empJoro', 'empUser'], });
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
        empId?: number,
        joroId?: number,
        userId?: number,
        empName: string, }
        ) { createEmployee.empModifiedDate = new Date();
          try {
            const employee = createEmployee.empId ? await this.employeeRepo.findOne({ where: { empId: createEmployee.empId } }) : null;
            if (createEmployee.empId && !employee) {
              throw new Error(`Employee with empId ${createEmployee.empId} not found`);
            }

            const jobRole = createEmployee.joroId ? await this.jobRoleRepo.findOne({ where: { joroId: createEmployee.joroId } }) : null;
            if (createEmployee.joroId && !jobRole) {
              throw new Error(`Job role with joroId ${createEmployee.joroId} not found`);
            }

            const user = createEmployee.userId ? await this.usersRepo.findOne({ where: { userId: createEmployee.userId } }) : null;
            if (createEmployee.userId && !user) {
              throw new Error(`User with userId ${createEmployee.userId} not found`);
            }
            const newEmp = this.employeeRepo.create({ 
            empPhoto: file ? file.originalname : null, //jika file tak masuk request = null
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
          empId?: number,
          joroId?: number,
          userId?: number,
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
                empEmp: employee,
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
