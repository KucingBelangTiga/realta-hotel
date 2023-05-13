/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from 'output/entities/Employee';
import { EmployeePayHistory } from 'output/entities/EmployeePayHistory';

@Injectable()
export class EmployeePayHistoryService {
    constructor(
        @InjectRepository(EmployeePayHistory)
        private ephRepo: Repository<EmployeePayHistory>,
        @InjectRepository(Employee)
        private employeeRepo: Repository<Employee>
      ) {}

    public async findAllEph() {
      return await this.ephRepo.find({
        relations: ['ephiEmp'],
      });
    }

    //setelah input sendiri, ephiRateChangeDate terbaca string di db
    //findOne dan delete param-nya pake string. dan harus lengkap sesuai isi kolom ephiRateChangeDate di db, tdk bisa cuma tanggalnya(harus sama time juga)
    //contoh findOne: http://localhost:3002/employee-pay-history/"2023-04-04 20:33:00"
    public async findOneEph(ephiRateChangeDate: Date = new Date()) {
        try {
          const eph = await this.ephRepo.findOne({ 
            where: { ephiRateChangeDate: ephiRateChangeDate } ,
            relations: ['ephiEmp'],
        });
        if (!eph) {
          throw new NotFoundException('Employee Pay History not found');
        }
          return eph;
        } catch (error) {
          throw new Error(`Error retrieving data: ${error.message}`);
        }
      }      

      public async createEph( 
        ephiEmpId: number,
        ephiRateChangeDate: Date = new Date(),
        ephiRateSalary: string,
        ephiPayFrequence: number,
        ephiModifiedDate: Date = new Date()
        ) {
        try {
          const employee = await this.employeeRepo.findOne({ where: { empId: ephiEmpId } });
            if (!employee) {
                throw new Error(`Employee with ephiEmpId ${ephiEmpId} not found`);
            }
            const newEph = this.ephRepo.create({
            ephiEmp: employee,
            ephiRateChangeDate: ephiRateChangeDate,
            ephiRateSalary: ephiRateSalary, 
            ephiPayFrequence: ephiPayFrequence, 
            ephiModifiedDate: ephiModifiedDate,
          });
          await this.ephRepo.save(newEph);
          return {
              statusCode: 201,
              message: 'Data added successfully',
              data: {
                ephiEmp: employee.empId,
                ephiRateChangeDate: ephiRateChangeDate,
                ephiRateSalary: ephiRateSalary, 
                ephiPayFrequence: ephiPayFrequence, 
                ephiModifiedDate: ephiModifiedDate,
              },
            };
          } catch (error) {
            throw new Error(`Error adding data: ${error.message}`);
          }
          }
    
        public async updateEph(
            ephiRateChangeDate: Date = new Date(),
            ephiEmpId: number,
            ephiRateSalary: string,
            ephiPayFrequence: number,
            ephiModifiedDate: Date = new Date()
          ) { 
            try {
              const employee = await this.employeeRepo.findOne({ where: { empId: ephiEmpId } });
              if (!employee) {
                  throw new Error(`Employee with empId ${ephiEmpId} not found`);
              }
              await this.ephRepo.update(
                { 
                    ephiRateChangeDate: ephiRateChangeDate, }, 
                {
                  ephiEmp: employee,
                  ephiRateSalary: ephiRateSalary, 
                  ephiPayFrequence: ephiPayFrequence,
                  ephiModifiedDate: ephiModifiedDate
                }
              );
              return {
                statusCode: 200,
                message: 'Data updated successfully',
                data: {
                  ephiEmp: employee.empId,
                  ephiRateChangeDate: ephiRateChangeDate,
                  ephiRateSalary: ephiRateSalary, 
                  ephiPayFrequence: ephiPayFrequence,
                  ephiModifiedDate: ephiModifiedDate,
                },
              };
            } catch (error) {
              throw new Error(`Error updating data: ${error.message}`);
            }
          }             

          //baca komentar di findOne
          //contoh delete: http://localhost:3002/employee-pay-history/"2023-04-04 20:33:00"
          public async deleteEph(ephiRateChangeDate: Date = new Date()) {
            try {
              const result = await this.ephRepo.delete({ ephiRateChangeDate });
              if (result.affected === 0) { 
                throw new NotFoundException('Employee Pay History not found');
              }
              return {
                statusCode: 200,
                message: 'Data deleted successfully.',
                data: {
                  ephiRateChangeDate: ephiRateChangeDate,
                },
              };
            } catch (error) {
              throw new Error(`Error deleting data: ${error.message}`);
            }
          }                   
}
