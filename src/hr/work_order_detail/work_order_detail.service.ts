/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Employee } from 'output/entities/Employee';
import { WorkOrders } from 'output/entities/WorkOrders';
import { ServiceTask } from 'output/entities/ServiceTask';
import { Facilities } from 'output/entities/Facilities';
import { WorkOrderDetail } from 'output/entities/WorkOrderDetail';
import { FilterOperator, FilterSuffix, Paginate, PaginateQuery, paginate, Paginated } from 'nestjs-paginate'

@Injectable()
export class WorkOrderDetailService {
    constructor(
        @InjectRepository(WorkOrderDetail)
        private wodeRepo: Repository<WorkOrderDetail>, 
        ) {}
    
        public async findAllWode(query: PaginateQuery): Promise<Paginated<WorkOrderDetail>> {
            return paginate (query, this.wodeRepo, {
                sortableColumns: ['wodeId','wodeTaskName', 'wodeStatus', 'wodeStartDate', 'wodeEndDate', 'wodeNotes', 'wodeEmp.empId', 'wodeFaci.faciId', 'wodeSeta.setaId', 'wodeWoro.woroId'],
                defaultSortBy: [['wodeId', 'ASC']],
                searchableColumns: ['wodeId','wodeTaskName', 'wodeStatus', 'wodeStartDate', 'wodeEndDate', 'wodeNotes', 'wodeEmp.empId', 'wodeFaci.faciId', 'wodeSeta.setaId', 'wodeWoro.woroId'],
                select: ['wodeId','wodeTaskName', 'wodeStatus', 'wodeStartDate', 'wodeEndDate', 'wodeNotes', 'wodeEmp.empId', 'wodeFaci.faciId', 'wodeSeta.setaId', 'wodeWoro.woroId'],
                maxLimit: 10, defaultLimit: 5,
                relations: {
                    wodeEmp: true,
                    wodeFaci: true,
                    wodeSeta: true,
                    wodeWoro: true
                },
                filterableColumns: {
                    wodeId: [FilterOperator. IN],
                    wodeStatus: [FilterOperator. ILIKE],
                    'wodeEmp.empId': [FilterOperator. IN],
                    'wodeFaci.faciId': [FilterOperator. IN],
                    'wodeSeta.setaId': [FilterOperator. IN],
                    'wodeWoro.woroId': [FilterOperator. IN],
                },
            });
        }
        public async findOneWode(id: number) {
                return await this.wodeRepo.findOne({ 
                    where: { wodeId: id },
                    relations: ['wodeEmp', 'wodeFaci', 'wodeSeta', 'wodeWoro'],
                });
        }
    
          public async createWode(
            wodeTaskName: string,
            wodeStatus: string,
            wodeStartDate: Date,
            wodeEndDate: Date,
            wodeNotes: string,
            empId: number,
            faciId: number,
            setaId: number,
            woroId: number
            ) {
            try {
              const response = await this.wodeRepo.save({
                wodeTaskName: wodeTaskName,
                wodeStatus: wodeStatus,
                wodeStartDate: wodeStartDate,
                wodeEndDate: wodeEndDate,
                wodeNotes: wodeNotes,
                wodeEmp: {empId: empId},
                wodeFaci: {faciId: faciId},
                wodeSeta: {setaId: setaId},
                wodeWoro: {woroId: woroId}
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
      
            public async updateWode(
            id: number,
            wodeTaskName: string,
            wodeStatus: string,
            wodeStartDate: Date,
            wodeEndDate: Date,
            wodeNotes: string,
            empId: number,
            faciId: number,
            setaId: number,
            woroId: number
            ) {
              try {
                await this.wodeRepo.update(
                  { wodeId: id },
                  {
                    wodeTaskName: wodeTaskName,
                    wodeStatus: wodeStatus,
                    wodeStartDate: wodeStartDate,
                    wodeEndDate: wodeEndDate,
                    wodeNotes: wodeNotes,
                    wodeEmp: {empId: empId},
                    wodeFaci: {faciId: faciId},
                    wodeSeta: {setaId: setaId},
                    wodeWoro: {woroId: woroId}
                  }
                );
                return {
                  statusCode: 200,
                  message: 'Data updated successfully',
                  data: {
                    wodeId: id,
                    wodeTaskName: wodeTaskName,
                    wodeStatus: wodeStatus,
                    wodeStartDate: wodeStartDate,
                    wodeEndDate: wodeEndDate,
                    wodeNotes: wodeNotes,
                    wodeEmp: {empId: empId},
                    wodeFaci: {faciId: faciId},
                    wodeSeta: {setaId: setaId},
                    wodeWoro: {woroId: woroId}
                  },
                };
              } catch (error) {
                throw new Error(`Error updating data: ${error.message}`);
              }
            }
              
              public async deleteWode(id: number) {
                try {
                  await this.wodeRepo.delete(id);
                  return {
                    statusCode: 200,
                    message: 'Data deleted successfully.',
                    data: {
                        wodeId: id,
                    },
                  };
                } catch (error) {
                  throw new Error(`Error deleting data: ${error.message}`);
                }
              }
}
