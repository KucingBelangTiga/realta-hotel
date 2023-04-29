/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { FilterOperator, FilterSuffix, Paginate, PaginateQuery, paginate, Paginated } from 'nestjs-paginate'
import { Employee } from 'output/entities/Employee';
import { WorkOrders } from 'output/entities/WorkOrders';
import { ServiceTask } from 'output/entities/ServiceTask';
import { Facilities } from 'output/entities/Facilities';
import { WorkOrderDetail } from 'output/entities/WorkOrderDetail';

@Injectable()
export class WorkOrderDetailService {
    constructor(
        @InjectRepository(WorkOrderDetail)
        private wodeRepo: Repository<WorkOrderDetail>,
        @InjectRepository(WorkOrders)
        private woroRepo: Repository<WorkOrders>,
        @InjectRepository(Employee)
        private employeeRepo: Repository<Employee>,
        @InjectRepository(ServiceTask)
        private setaRepo: Repository<ServiceTask>,
        @InjectRepository(Facilities)
        private faciRepo: Repository<Facilities> 
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
          const wode = await this.wodeRepo.findOne({ 
                    where: { wodeId: id },
                    relations: ['wodeEmp', 'wodeFaci', 'wodeSeta', 'wodeWoro'],
                });
                if (!wode) {
                  throw new NotFoundException('Work Order Detail not found');
              }
              return wode;
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
              const employee = await this.employeeRepo.findOne({ where: { empId: empId } });
              if (!employee) {
                  throw new Error(`Employee with empId ${empId} not found`);
              }
              const facilities = await this.faciRepo.findOne({ where: { faciId: faciId } });
              if (!facilities) {
                  throw new Error(`Facilities with faciId ${faciId} not found`);
              }
              const seta = await this.setaRepo.findOne({ where: { setaId: setaId } });
              if (!seta) {
                  throw new Error(`Service Task with setaId ${setaId} not found`);
              }
              const woro = await this.woroRepo.findOne({ where: { woroId: woroId } });
              if (!woro) {
                  throw new Error(`Work Orders with woroId ${woroId} not found`);
              }
              const newWode = this.wodeRepo.create({
                wodeTaskName: wodeTaskName,
                wodeStatus: wodeStatus,
                wodeStartDate: wodeStartDate,
                wodeEndDate: wodeEndDate,
                wodeNotes: wodeNotes,
                wodeEmp: employee,
                wodeFaci: facilities,
                wodeSeta: seta,
                wodeWoro: woro
              });
              await this.wodeRepo.save(newWode);
              return {
                statusCode: 201,
                message: 'Data added successfully',
                data: {
                  wodeId: newWode.wodeId,
                  wodeTaskName: wodeTaskName,
                  wodeStatus: wodeStatus,
                  wodeStartDate: wodeStartDate,
                  wodeEndDate: wodeEndDate,
                  wodeNotes: wodeNotes,
                  wodeEmp: employee,
                  wodeFaci: facilities,
                  wodeSeta: seta,
                  wodeWoro: woro
              },
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
                const employee = await this.employeeRepo.findOne({ where: { empId: empId } });
                if (!employee) {
                    throw new Error(`Employee with empId ${empId} not found`);
                }
                const facilities = await this.faciRepo.findOne({ where: { faciId: faciId } });
                if (!facilities) {
                    throw new Error(`Facilities with faciId ${faciId} not found`);
                }
                const seta = await this.setaRepo.findOne({ where: { setaId: setaId } });
                if (!seta) {
                    throw new Error(`Service Task with setaId ${setaId} not found`);
                }
                const woro = await this.woroRepo.findOne({ where: { woroId: woroId } });
                if (!woro) {
                    throw new Error(`Work Orders with woroId ${woroId} not found`);
                }
                await this.wodeRepo.update(
                  { wodeId: id },
                  {
                    wodeTaskName: wodeTaskName,
                    wodeStatus: wodeStatus,
                    wodeStartDate: wodeStartDate,
                    wodeEndDate: wodeEndDate,
                    wodeNotes: wodeNotes,
                    wodeEmp: employee,
                    wodeFaci: facilities,
                    wodeSeta: seta,
                    wodeWoro: woro
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
                    wodeEmp: employee,
                    wodeFaci: facilities,
                    wodeSeta: seta,
                    wodeWoro: woro
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
