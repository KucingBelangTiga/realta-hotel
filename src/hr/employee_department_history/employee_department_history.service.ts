/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from 'output/entities/Employee';
import { Department } from 'output/entities/Department';
import { Shift } from 'output/entities/Shift';
import { EmployeeDepartmentHistory } from 'output/entities/EmployeeDepartmentHistory';
import { FilterOperator, FilterSuffix, Paginate, PaginateQuery, paginate, Paginated } from 'nestjs-paginate'

@Injectable()
export class EmployeeDepartmentHistoryService {
    constructor(
        @InjectRepository(EmployeeDepartmentHistory)
        private edhRepo: Repository<EmployeeDepartmentHistory>,
        @InjectRepository(Employee)
        private employeeRepo: Repository<Employee>,
        @InjectRepository(Department)
        private departmentRepo: Repository<Department>,
        @InjectRepository(Shift)
        private shiftRepo: Repository<Shift>,
      ) {}

      public async findAllEdh(query: PaginateQuery): Promise<Paginated<EmployeeDepartmentHistory>> {
        return paginate (query, this.edhRepo, {
            sortableColumns: ['edhiId', 'edhiEmpId', 'edhiStartDate', 'edhiEndDate', 'edhiModifiedDate', 'edhiEmp.empId', 'edhiDept.deptId', 'edhiShift.shiftId'],
            defaultSortBy: [['edhiId', 'ASC']],
            searchableColumns: ['edhiId', 'edhiEmpId', 'edhiStartDate', 'edhiEndDate', 'edhiModifiedDate', 'edhiEmp.empId', 'edhiDept.deptId', 'edhiShift.shiftId'],
            select: ['edhiId', 'edhiEmpId', 'edhiStartDate', 'edhiEndDate', 'edhiModifiedDate', 'edhiEmp.empId', 'edhiDept.deptId', 'edhiShift.shiftId'],
            maxLimit: 10, defaultLimit: 5,
            relations: {
                edhiEmp: true,
                edhiDept: true,
                edhiShift: true
            }, 
            filterableColumns: {
                empId: [FilterOperator. IN],
                edhiEmpId: [FilterOperator. IN],
                edhiId: [FilterOperator. IN],
            },
        });
    }
      public async findOneEdh(id: number) { 
        return await this.edhRepo.findOne({
          where: { edhiId: id },
          relations: ['edhiEmp','edhiDept','edhiShift'],
        });
      } 

      public async createEdh( 
        edhiEmpId: number,
        edhiStartDate: Date,
        edhiEndDate: Date, 
        edhiModifiedDate: Date,
        deptId: number, 
        shiftId: number
        ) {
        try {
          const response = await this.edhRepo.save({
            edhiEmp: { empId: edhiEmpId }, //nama kolom di db: edhiEmpId. relasi dari edhiEmp: empId
            edhiStartDate: edhiStartDate,
            edhiEndDate: edhiEndDate, 
            edhiModifiedDate: edhiModifiedDate, 
            edhiDept: { deptId: deptId },
            edhiShift: { shiftId: shiftId }
          });
        return {
            statusCode: 201,
            message: 'Data added successfully',
            data: response,
          };
        } catch (error) {
          throw new Error(`Error adding data: ${error.message}`);
        }
        }

        public async updateEdh(
            id: number,
            edhiEmpId: number,
            edhiStartDate: Date,
            edhiEndDate: Date,
            edhiModifiedDate: Date,
            deptId: number,
            shiftId: number
          ) { 
            try {
              await this.edhRepo.update(
                { edhiId: id },
                {
                  edhiEmp: { empId: edhiEmpId }, //nama kolom di db: edhiEmpId. relasi dari edhiEmp: empId
                  edhiStartDate: edhiStartDate,
                  edhiEndDate: edhiEndDate, 
                  edhiModifiedDate: edhiModifiedDate, 
                  edhiDept: { deptId: deptId },
                  edhiShift: { shiftId: shiftId }
                }
              );
              return {
                statusCode: 200,
                message: 'Data updated successfully',
                data: {
                  edhiId: id,
                  edhiEmp: { empId: edhiEmpId }, 
                  edhiStartDate: edhiStartDate,
                  edhiEndDate: edhiEndDate, 
                  edhiModifiedDate: edhiModifiedDate, 
                  edhiDept: { deptId: deptId },
                  edhiShift: { shiftId: shiftId }
                },
              };
            } catch (error) {
              throw new Error(`Error updating data: ${error.message}`);
            }
          }             

          public async deleteEdh(id: number) {
            try {
              await this.edhRepo.delete(id);
              return {
                statusCode: 200,
                message: 'Data deleted successfully.',
                data: {
                    edhiId: id,
                },
              };
            } catch (error) {
              throw new Error(`Error deleting data: ${error.message}`);
            }
          }          
}
