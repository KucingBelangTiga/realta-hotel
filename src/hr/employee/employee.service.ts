/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm'; //lebih baik cari alternatif getConnection. karena di masa depan akan dihapus
import { Employee } from 'output/entities/Employee';
import { FilterOperator, FilterSuffix, Paginate, PaginateQuery, paginate, Paginated } from 'nestjs-paginate'
import { JobRole } from 'output/entities/JobRole';
import { Request } from 'express';
import { Multer } from 'multer';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(Employee)
        private employeeRepo: Repository<Employee>,
        // @InjectRepository(JobRole)
        // private jobRoleRepo: Repository<JobRole>,
      ) {}

      public async findAllEmp(query: PaginateQuery): Promise<Paginated<Employee>> {
        return paginate (query, this.employeeRepo, {
            sortableColumns: ['empId', 'empNationalId', 'empName', 'empBirthDate', 'empMaritalStatus', 'empGender', 'empHireDate', 'empSalariedFlag', 'empVacationHours', 'empSickleaveHourse', 'empCurrentFlag', 'empPhoto', 'empModifiedDate', 'empUser.userId', 'empEmp.empId', 'empJoro.joroId'],
            defaultSortBy: [['empId', 'ASC']],
            searchableColumns: ['empId', 'empNationalId', 'empName', 'empBirthDate', 'empMaritalStatus', 'empGender', 'empHireDate', 'empSalariedFlag', 'empVacationHours', 'empSickleaveHourse', 'empCurrentFlag', 'empPhoto', 'empModifiedDate', 'empUser.userId', 'empEmp.empId', 'empJoro.joroId'],
            select: ['empId', 'empNationalId', 'empName', 'empBirthDate', 'empMaritalStatus', 'empGender', 'empHireDate', 'empSalariedFlag', 'empVacationHours', 'empSickleaveHourse', 'empCurrentFlag', 'empPhoto', 'empModifiedDate', 'empUser.userId', 'empEmp.empId', 'empJoro.joroId'],
            maxLimit: 10, defaultLimit: 5,
            relations: {
                empEmp: true,
                empJoro: true,
                empUser: true
            }, //bisa pakai array spt findOne di bawah
            filterableColumns: {
                empId: [FilterOperator. IN],
                empName: [FilterOperator. ILIKE],
                empNationalId: [FilterOperator. BTW],
            },
        });
    }
    // public async findOneEmp(id: number) {
    //         return await this.employeeRepo.findOne({ where: { empId: id } });
    // }

    //pakai relasi
    public async findOneEmp(id: number) { 
        return await this.employeeRepo.findOne({
          where: { empId: id },
          relations: ['empEmp','empJoro','empUser'],
        });
      }      
    //search by name: http://localhost:3002/employee/search?empName="John Doe" . nama 1 kata tanpa ""
    public async findNameEmp(empName: string) {
        try {
          const response = await this.employeeRepo
            .createQueryBuilder('employee')
            .select()
            .where('LOWER(employee.empName) Like LOWER(:empName)', {
              empName: `%${empName.toLowerCase()}%`,
            })
            .getMany();
          if (response.length === 0) {
            return {
              statusCode: 401,
              message: 'Employee not found.',
            };
          } else {
            return response;
          }
        } catch (error) {
          throw new Error(
            `Error:, ${error.message}`,
          );
        }
      }
      public async createEmp(
        empNationalId: string,
        empName: string,
        empBirthDate: string,
        empMaritalStatus: string,
        empGender: string,
        empHireDate: Date,
        empSalariedFlag: string,
        empVacationHours: number,
        empSickleaveHourse: number,
        empCurrentFlag: number,
        // empPhoto: string,
        empModifiedDate: Date,
        userId: number,
        // empEmp: Employee, //relasi employee
        // empJoro: JobRole //relasi jobrole
        empId: number,
        joroId: number,
        file: any
        ) {
        try {
          const response = await this.employeeRepo.save({
            empNationalId: empNationalId,
            empName: empName,
            empBirthDate: empBirthDate,
            empMaritalStatus: empMaritalStatus, 
            empGender: empGender, 
            empHireDate: empHireDate,
            empSalariedFlag: empSalariedFlag,
            empVacationHours: empVacationHours,
            empSickleaveHourse: empSickleaveHourse,
            empCurrentFlag: empCurrentFlag,
            empModifiedDate: empModifiedDate,
            empUser: { userId: userId },
            // empEmp: Employee,
            // empJoro: JobRole
            empEmp: { empId: empId },
            empJoro: { joroId: joroId },
            empPhoto: file.originalname
          });
        //   return response;
        return {
            statusCode: 201,
            message: 'Data added successfully',
            data: response,
          };
        } catch (error) {
          throw new Error(`Error: , ${error.message}`);
        }
        }

    //pakai transaksi db
    // public async createEmp(
    //     empNationalId: string,
    //     empName: string,
    //     empBirthDate: string,
    //     empMaritalStatus: string,
    //     empGender: string,
    //     empHireDate: Date,
    //     empSalariedFlag: string,
    //     empVacationHours: number,
    //     empSickleaveHourse: number,
    //     empCurrentFlag: number,
    //     empPhoto: string,
    //     empModifiedDate: Date,
    //     empUserId: number,
    //     empEmp: Employee, //perbaiki ini
    //     // empId: number,
    //     empJoro: JobRole, //perbaiki ini
    //   ) {
    //     const connection = getConnection();
    //     const queryRunner = connection.createQueryRunner();
    //     await queryRunner.connect();
    //     await queryRunner.startTransaction();
    //     try {
    //       const manager = queryRunner.manager;
    //       const savedJobRole = await manager.save(empJoro);
    //       const savedEmployee = await manager.save({
    //         empNationalId: empNationalId,
    //         empName: empName,
    //         empBirthDate: empBirthDate,
    //         empMaritalStatus: empMaritalStatus,
    //         empGender: empGender,
    //         empHireDate: empHireDate,
    //         empSalariedFlag: empSalariedFlag,
    //         empVacationHours: empVacationHours,
    //         empSickleaveHourse: empSickleaveHourse,
    //         empCurrentFlag: empCurrentFlag,
    //         empPhoto: empPhoto,
    //         empModifiedDate: empModifiedDate,
    //         empUserId: empUserId,
    //         empEmp: empEmp,
    //         // empId: empId,
    //         empJoro: savedJobRole,
    //       });
    //       await queryRunner.commitTransaction();
    //       return {
    //         statusCode: 201,
    //         message: 'Data added successfully',
    //         data: savedEmployee,
    //       };
    //     } catch (error) {
    //       await queryRunner.rollbackTransaction();
    //       throw new Error(`Error: , ${error.message}`);
    //     } finally {
    //       await queryRunner.release();
    //     }
    //   }
  
        //pakai fileinterceptor di controller: photo harus upload ulang, jika tidak, maka akan dihapus di database jadi kosong
        // public async updateEmp(
        // id: number,
        // empNationalId: string,
        // empName: string,
        // empBirthDate: string,
        // empMaritalStatus: string,
        // empGender: string,
        // empHireDate: Date,
        // empSalariedFlag: string,
        // empVacationHours: number,
        // empSickleaveHourse: number,
        // empCurrentFlag: number,
        // // empPhoto: string,
        // empModifiedDate: Date,
        // userId: number,
        // empId: number,
        // joroId: number,
        // file: any
        //   ) {
        //     try {
        //       await this.employeeRepo.update(
        //         { empId: id },
        //         {
        //           empNationalId: empNationalId,
        //           empName: empName,
        //           empBirthDate: empBirthDate,
        //           empMaritalStatus: empMaritalStatus, 
        //           empGender: empGender, 
        //           empHireDate: empHireDate,
        //           empSalariedFlag: empSalariedFlag,
        //           empVacationHours: empVacationHours,
        //           empSickleaveHourse: empSickleaveHourse,
        //           empCurrentFlag: empCurrentFlag,
        //           // empPhoto: empPhoto,
        //           empModifiedDate: empModifiedDate,
        //           empUser: { userId: userId },
        //           empEmp: { empId: empId },
        //           empJoro: { joroId: joroId },
        //           empPhoto: file.originalname
        //         } 
        //       );
        //       return {
        //         statusCode: 200,
        //         message: 'Data updated successfully',
        //         data: {
        //           id: id,
        //           empNationalId: empNationalId,
        //           empName: empName,
        //           empBirthDate: empBirthDate,
        //           empMaritalStatus: empMaritalStatus, 
        //           empGender: empGender, 
        //           empHireDate: empHireDate,
        //           empSalariedFlag: empSalariedFlag,
        //           empVacationHours: empVacationHours,
        //           empSickleaveHourse: empSickleaveHourse,
        //           empCurrentFlag: empCurrentFlag,
        //           // empPhoto: empPhoto,
        //           empModifiedDate: empModifiedDate,
        //           empUser: { userId: userId },
        //           empEmp: { empId: empId },
        //           empJoro: { joroId: joroId },
        //           empPhoto: file.originalname
        //         },
        //       };
        //     } catch (error) {
        //       throw new Error(`Error: , ${error.message}`);
        //     }
        //   }
        public async updateEmp(
          id: number,
          empNationalId: string,
          empName: string,
          empBirthDate: string,
          empMaritalStatus: string,
          empGender: string,
          empHireDate: Date,
          empSalariedFlag: string,
          empVacationHours: number,
          empSickleaveHourse: number,
          empCurrentFlag: number,
          empModifiedDate: Date,
          userId: number,
          empId: number,
          joroId: number,
          file: Multer.File
        ) {
          try {
            let empPhoto: string;
            if (file) {
              empPhoto = file.filename;
            } else {
              const emp = await this.employeeRepo.findOne({ where: { empId: id } });
              empPhoto = emp.empPhoto;
            }
            await this.employeeRepo.update(
              { empId: id },
              {
                empNationalId: empNationalId,
                empName: empName,
                empBirthDate: empBirthDate,
                empMaritalStatus: empMaritalStatus, 
                empGender: empGender, 
                empHireDate: empHireDate,
                empSalariedFlag: empSalariedFlag,
                empVacationHours: empVacationHours,
                empSickleaveHourse: empSickleaveHourse,
                empCurrentFlag: empCurrentFlag,
                empModifiedDate: empModifiedDate,
                empUser: { userId: userId },
                empEmp: { empId: empId },
                empJoro: { joroId: joroId },
                empPhoto: empPhoto
              } 
            );
            return {
              statusCode: 200,
              message: 'Data updated successfully',
              data: {
                id: id,
                empNationalId: empNationalId,
                empName: empName,
                empBirthDate: empBirthDate,
                empMaritalStatus: empMaritalStatus, 
                empGender: empGender, 
                empHireDate: empHireDate,
                empSalariedFlag: empSalariedFlag,
                empVacationHours: empVacationHours,
                empSickleaveHourse: empSickleaveHourse,
                empCurrentFlag: empCurrentFlag,
                empModifiedDate: empModifiedDate,
                empUser: { userId: userId },
                empEmp: { empId: empId },
                empJoro: { joroId: joroId },
                empPhoto: empPhoto
              },
            };
          } catch (error) {
            throw new Error(`Error: , ${error.message}`);
          }
        }        
          
          public async deleteEmp(empId: number) {
            try {
              await this.employeeRepo.delete(empId);
              return {
                statusCode: 200,
                message: 'Data deleted successfully.',
                data: {
                    empstockId: empId,
                },
              };
            } catch (error) {
              throw new Error(`Error: , ${error.message}`);
            }
          }

}
