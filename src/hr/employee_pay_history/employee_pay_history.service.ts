/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from 'output/entities/Employee';
import { EmployeePayHistory } from 'output/entities/EmployeePayHistory';
import { FilterOperator, FilterSuffix, Paginate, PaginateQuery, paginate, Paginated } from 'nestjs-paginate'
import { LoDashExplicitNumberArrayWrapper } from 'lodash';

@Injectable()
export class EmployeePayHistoryService {
    constructor(
        @InjectRepository(EmployeePayHistory)
        private ephRepo: Repository<EmployeePayHistory>,
        @InjectRepository(Employee)
        private employeeRepo: Repository<Employee>
      ) {}

      public async findAllEph(query: PaginateQuery): Promise<Paginated<EmployeePayHistory>> {
        return paginate (query, this.ephRepo, {
            sortableColumns: ['ephiRateChangeDate', 'ephiRateSalary', 'ephiPayFrequence', 'ephiModifiedDate', 'ephiEmp.empId'],
            defaultSortBy: [['ephiEmp.empId', 'ASC']],
            searchableColumns: ['ephiRateChangeDate', 'ephiRateSalary', 'ephiPayFrequence', 'ephiModifiedDate', 'ephiEmp.empId'],
            select: ['ephiRateChangeDate', 'ephiRateSalary', 'ephiPayFrequence', 'ephiModifiedDate', 'ephiEmp.empId'],
            maxLimit: 10, defaultLimit: 5,
            relations: {
                ephiEmp: true
            }, 
            filterableColumns: {
                'ephiEmp.empId': [FilterOperator. IN],
                ephiRateChangeDate: [FilterOperator. BTW],
            },
        });
    }
    public async findOneEph(ephiRateChangeDate: Date) {
        try {
          const eph = await this.ephRepo.findOne({ 
            where: { ephiRateChangeDate } ,
            relations: ['ephiEmp'],
        });
          return {
            statusCode: 200,
            message: 'Data retrieved successfully.',
            data: {
              eph,
            },
          };
        } catch (error) {
          throw new Error(`Error retrieving data: ${error.message}`);
        }
      }      

      public async createEph( 
        ephiRateChangeDate: Date,
        ephiRateSalary: string,
        ephiPayFrequence: number,
        ephiModifiedDate: Date,
        empId: number
        ) {
        try {
          const response = await this.ephRepo.save({
            ephiRateChangeDate: ephiRateChangeDate,
            ephiRateSalary: ephiRateSalary, 
            ephiPayFrequence: ephiPayFrequence, 
            ephiModifiedDate: ephiModifiedDate,
            ephiEmp: { empId: empId } //nama kolom di db: ephiEmpId. relasi dari ephiEmp: empId
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

        public async updateEph(
            ephiRateChangeDate: Date,
            ephiRateSalary: string,
            ephiPayFrequence: number,
            ephiModifiedDate: Date,
            empId: number
          ) { 
            try {
              await this.ephRepo.update(
                { 
                    ephiRateChangeDate: ephiRateChangeDate,
                    ephiEmp: { empId: empId }, }, //fk empId jadi kriteria juga
                {
                  ephiRateSalary: ephiRateSalary, 
                  ephiPayFrequence: ephiPayFrequence,
                  ephiModifiedDate: ephiModifiedDate
                }
              );
              return {
                statusCode: 200,
                message: 'Data updated successfully',
                data: {
                  ephiRateChangeDate: ephiRateChangeDate,
                  ephiRateSalary: ephiRateSalary, 
                  ephiPayFrequence: ephiPayFrequence,
                  ephiModifiedDate: ephiModifiedDate,
                  ephiEmp: { empId: empId }
                },
              };
            } catch (error) {
              throw new Error(`Error updating data: ${error.message}`);
            }
          }             

          public async deleteEph(ephiRateChangeDate: Date) {
            try {
              const result = await this.ephRepo.delete({ ephiRateChangeDate });
              return {
                statusCode: 200,
                message: 'Data deleted successfully.',
                data: result.raw, //jika data tdk ada, hasilnya array kosong
              };
            } catch (error) {
              throw new Error(`Error deleting data: ${error.message}`);
            }
          }            
}
