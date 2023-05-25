/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilterOperator, FilterSuffix, Paginate, PaginateQuery, paginate, Paginated } from 'nestjs-paginate'
import { Employee } from 'output/entities/Employee';
import { EmployeePayHistory } from 'output/entities/EmployeePayHistory';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';

@Injectable()
export class EmployeePayHistoryService {
    constructor(
        @InjectRepository(EmployeePayHistory)
        private ephRepo: Repository<EmployeePayHistory>,
        @InjectRepository(Employee)
        private employeeRepo: Repository<Employee>
      ) {}

    //   public async findAllEph(query: PaginateQuery): Promise<Paginated<EmployeePayHistory>> {
    //     return paginate (query, this.ephRepo, {
    //         sortableColumns: ['ephiRateChangeDate', 'ephiRateSalary', 'ephiPayFrequence', 'ephiModifiedDate', 'ephiEmp.empId'],
    //         defaultSortBy: [['ephiEmp.empId', 'ASC']],
    //         searchableColumns: ['ephiRateChangeDate', 'ephiRateSalary', 'ephiPayFrequence', 'ephiModifiedDate', 'ephiEmp.empId'],
    //         select: ['ephiRateChangeDate', 'ephiRateSalary', 'ephiPayFrequence', 'ephiModifiedDate', 'ephiEmp.empId'],
    //         maxLimit: 10, defaultLimit: 5,
    //         relations: {
    //             ephiEmp: true
    //         }, 
    //         filterableColumns: {
    //             'ephiEmp.empId': [FilterOperator. IN],
    //             ephiRateChangeDate: [FilterOperator. BTW],
    //         },
    //     });
    // }

    public async getAllEph() {
      return await this.ephRepo.find({
        relations: ['ephiEmp'],
        // select: ['ephiRateChangeDate', 'ephiRateSalary', 'ephiPayFrequence', 'ephiModifiedDate', 'ephiEmp'],
      });
    }

    //get all by empId
    public async findAllEph(id: number) {
      return await this.ephRepo.find({ 
        order: { ephiRateChangeDate: 'ASC' },
        where: { ephiEmp: { empId: id } },
        relations: ['ephiEmp'],
        // select: ['wodeId','wodeTaskName', 'wodeStatus', 'wodeStartDate', 'wodeEndDate', 'wodeNotes', 'wodeEmp', 'wodeFaci', 'wodeSeta', 'wodeWoro'],
       
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
        ephiEmp: Employee,
        ephiRateChangeDate: Date = new Date(),
        ephiRateSalary: string,
        ephiPayFrequence: number,
        ephiModifiedDate: Date = new Date()
        ) {
        try {

            const newEph = this.ephRepo.create({
            ephiEmp: ephiEmp,
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
                ephiEmp: ephiEmp.empId,
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
            ephiRateSalary: string,
            ephiPayFrequence: number,
            ephiModifiedDate: Date = new Date(),
            ephiEmp?: Employee,
          ) { 
            try {

              let updatedEphiEmp: Employee | undefined;

                  if (ephiEmp) {
                    updatedEphiEmp = ephiEmp;
                  } else {
                    const existingWode = await this.ephRepo.findOne({
                      where: {
                        ephiEmp: { id: ephiEmp.empId },
                      },
                      relations: ['ephiEmp'], 
                    } as FindOneOptions<EmployeePayHistory>);

                    if (existingWode) {
                      updatedEphiEmp = existingWode.ephiEmp;
                    }
                  }

              await this.ephRepo.update(
                { 
                    ephiRateChangeDate: ephiRateChangeDate, }, 
                {
                  ephiEmp: updatedEphiEmp,
                  ephiRateSalary: ephiRateSalary, 
                  ephiPayFrequence: ephiPayFrequence,
                  ephiModifiedDate: ephiModifiedDate
                }
              );
              return {
                statusCode: 200,
                message: 'Data updated successfully',
                data: {
                  ephiEmp: updatedEphiEmp,
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
              if (result.affected === 0) { //jika data tak ditemukan
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
