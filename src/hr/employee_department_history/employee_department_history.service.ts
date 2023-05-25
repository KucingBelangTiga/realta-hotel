/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilterOperator, FilterSuffix, Paginate, PaginateQuery, paginate, Paginated } from 'nestjs-paginate'
import { Employee } from 'output/entities/Employee';
import { Department } from 'output/entities/Department';
import { Shift } from 'output/entities/Shift';
import { EmployeeDepartmentHistory } from 'output/entities/EmployeeDepartmentHistory';

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

    //   public async findAllEdh(query: PaginateQuery): Promise<Paginated<EmployeeDepartmentHistory>> {
    //     return paginate (query, this.edhRepo, {
    //         sortableColumns: ['edhiId', 'edhiEmpId', 'edhiStartDate', 'edhiEndDate', 'edhiModifiedDate', 'edhiEmp.empId', 'edhiDept.deptId', 'edhiShift.shiftId'],
    //         defaultSortBy: [['edhiId', 'ASC']],
    //         searchableColumns: ['edhiId', 'edhiEmpId', 'edhiStartDate', 'edhiEndDate', 'edhiModifiedDate', 'edhiEmp.empId', 'edhiDept.deptId', 'edhiShift.shiftId'],
    //         select: ['edhiId', 'edhiEmpId', 'edhiStartDate', 'edhiEndDate', 'edhiModifiedDate', 'edhiEmp.empId', 'edhiDept.deptId', 'edhiShift.shiftId'],
    //         maxLimit: 10, defaultLimit: 5,
    //         relations: {
    //             edhiEmp: true,
    //             edhiDept: true,
    //             edhiShift: true
    //         }, 
    //         filterableColumns: {
    //             edhiId: [FilterOperator. IN],
    //             empId: [FilterOperator. IN],
    //             edhiEmpId: [FilterOperator. IN],
    //             'edhiDept.deptId': [FilterOperator. IN],
    //             'edhiShift.shiftId': [FilterOperator. IN]
    //         },
    //     });
    // }

    public async getAllEdh() {
      return await this.edhRepo.find({
        relations: ['edhiEmp', 'edhiDept', 'edhiShift'],
        // select: ['edhiId', 'edhiEmpId', 'edhiStartDate', 'edhiEndDate', 'edhiModifiedDate', 'edhiEmp', 'edhiDept', 'edhiShift'],
      });
    } 
 
    //get all by empId
    public async findAllEdh(id: number) {
      return await this.edhRepo.find({  
        order: { edhiId: 'ASC' }, 
        where: { edhiEmp: { empId: id } },
        relations: ['edhiEmp', 'edhiDept', 'edhiShift'],
        // select: ['wodeId','wodeTaskName', 'wodeStatus', 'wodeStartDate', 'wodeEndDate', 'wodeNotes', 'wodeEmp', 'wodeFaci', 'wodeSeta', 'edhiEmp'],
      });
    }

      public async findOneEdh(id: number) { 
        const edhi = await this.edhRepo.findOne({
          where: { edhiId: id },
          relations: ['edhiEmp','edhiDept','edhiShift'],
        });
        if (!edhi) {
          throw new NotFoundException('Employee Department History not found');
      }
      return edhi;
    }  

      public async createEdh( 
        edhiEmp: Employee,
        edhiStartDate: Date,
        edhiEndDate: Date, 
        edhiModifiedDate: Date = new Date(),
        edhiDeptId: number, 
        edhiShiftId: number
        ) {
        try {
            const dept = await this.departmentRepo.findOne({ where: { deptId: edhiDeptId } });
            if (!dept) {
                throw new Error(`Department with deptId ${edhiDeptId} not found`);
            }
            const shift = await this.shiftRepo.findOne({ where: { shiftId: edhiShiftId } });
            if (!shift) {
                throw new Error(`Shift with shiftId ${edhiShiftId} not found`);
            }
          const newEdh = this.edhRepo.create({
            edhiEmp: edhiEmp,
            edhiStartDate: edhiStartDate,
            edhiEndDate: edhiEndDate, 
            edhiModifiedDate: edhiModifiedDate, 
            edhiDept: dept,
            edhiShift: shift,
          });
        await this.edhRepo.save(newEdh);
        return {
            statusCode: 201,
            message: 'Data added successfully',
            data: {
              edhiId: newEdh.edhiId,
              edhiStartDate: edhiStartDate,
              edhiEndDate: edhiEndDate,
              edhiModifiedDate: edhiModifiedDate,
              edhiEmp: edhiEmp,
              edhiDept: dept,
              edhiShift: shift,
          },
          };
        } catch (error) {
          throw new Error(`Error adding data: ${error.message}`);
        }
        }

        public async updateEdh(
            id: number,
            edhiStartDate: Date,
            edhiEndDate: Date, 
            edhiModifiedDate: Date = new Date(),
            edhiDeptId: number, 
            edhiShiftId: number,
            edhiEmp?: Employee,
          ) { 
            try {
            const dept = await this.departmentRepo.findOne({ where: { deptId: edhiDeptId } });
            if (!dept) {
                throw new Error(`Department with deptId ${edhiDeptId} not found`);
            }
            const shift = await this.shiftRepo.findOne({ where: { shiftId: edhiShiftId } });
            if (!shift) {
                throw new Error(`Shift with shiftId ${edhiShiftId} not found`);
            }

            let updatedEdhiEmp: Employee | undefined;

                  if (edhiEmp) {
                    updatedEdhiEmp = edhiEmp;
                  } else {
                    const existingWode = await this.edhRepo.findOne({ where: { edhiId: id } });
                    if (existingWode) {
                      updatedEdhiEmp = existingWode.edhiEmp;
                    }
                  }

              await this.edhRepo.update(
                { edhiId: id },
                {
                  edhiEmp: updatedEdhiEmp,
                  edhiStartDate: edhiStartDate,
                  edhiEndDate: edhiEndDate, 
                  edhiModifiedDate: edhiModifiedDate, 
                  edhiDept: dept,
                  edhiShift: shift,
                }
              );
              return {
                statusCode: 200,
                message: 'Data updated successfully',
                data: {
                  edhiId: id,
                  edhiStartDate: edhiStartDate,
                  edhiEndDate: edhiEndDate,
                  edhiModifiedDate: edhiModifiedDate,
                  edhiEmp: updatedEdhiEmp,
                  edhiDept: dept,
                  edhiShift: shift,
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
