/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

    public async findAllEdh() {
      return await this.edhRepo.find({
        relations: ['edhiEmp', 'edhiDept', 'edhiShift'],
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
        edhiEmpId: number,
        edhiStartDate: Date,
        edhiEndDate: Date, 
        edhiModifiedDate: Date = new Date(),
        deptId: number, 
        shiftId: number
        ) {
        try {
            const employee = await this.employeeRepo.findOne({ where: { empId: edhiEmpId } });
            if (!employee) {
                throw new Error(`Employee with empId ${edhiEmpId} not found`);
            }
            const dept = await this.departmentRepo.findOne({ where: { deptId: deptId } });
            if (!dept) {
                throw new Error(`Department with deptId ${deptId} not found`);
            }
            const shift = await this.shiftRepo.findOne({ where: { shiftId: shiftId } });
            if (!shift) {
                throw new Error(`Shift with shiftId ${shiftId} not found`);
            }
          const newEdh = this.edhRepo.create({
            edhiEmp: employee,
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
              edhiEmp: employee,
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
            edhiEmpId: number,
            edhiStartDate: Date,
            edhiEndDate: Date, 
            edhiModifiedDate: Date = new Date(),
            deptId: number, 
            shiftId: number
          ) { 
            try {
              const employee = await this.employeeRepo.findOne({ where: { empId: edhiEmpId } });
            if (!employee) {
                throw new Error(`Employee with empId ${edhiEmpId} not found`);
            }
            const dept = await this.departmentRepo.findOne({ where: { deptId: deptId } });
            if (!dept) {
                throw new Error(`Department with deptId ${deptId} not found`);
            }
            const shift = await this.shiftRepo.findOne({ where: { shiftId: shiftId } });
            if (!shift) {
                throw new Error(`Shift with shiftId ${shiftId} not found`);
            }
              await this.edhRepo.update(
                { edhiId: id },
                {
                  edhiEmp: employee,
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
                  edhiEmp: employee,
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
