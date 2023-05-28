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
    
        // public async findAllWode(query: PaginateQuery): Promise<Paginated<WorkOrderDetail>> {
        //     return paginate (query, this.wodeRepo, {
        //         sortableColumns: ['wodeId','wodeTaskName', 'wodeStatus', 'wodeStartDate', 'wodeEndDate', 'wodeNotes', 'wodeEmp.empId', 'wodeFaci.faciId', 'wodeSeta.setaId', 'wodeWoro.woroId'],
        //         defaultSortBy: [['wodeId', 'ASC']],
        //         searchableColumns: ['wodeId','wodeTaskName', 'wodeStatus', 'wodeStartDate', 'wodeEndDate', 'wodeNotes', 'wodeEmp.empId', 'wodeFaci.faciId', 'wodeSeta.setaId', 'wodeWoro.woroId'],
        //         select: ['wodeId','wodeTaskName', 'wodeStatus', 'wodeStartDate', 'wodeEndDate', 'wodeNotes', 'wodeEmp.empId', 'wodeFaci.faciId', 'wodeSeta.setaId', 'wodeWoro.woroId'],
        //         maxLimit: 10, defaultLimit: 5,
        //         relations: {
        //             wodeEmp: true,
        //             wodeFaci: true,
        //             wodeSeta: true,
        //             wodeWoro: true
        //         },
        //         filterableColumns: {
        //             wodeId: [FilterOperator. IN],
        //             wodeStatus: [FilterOperator. ILIKE],
        //             'wodeEmp.empId': [FilterOperator. IN],
        //             'wodeFaci.faciId': [FilterOperator. IN],
        //             'wodeSeta.setaId': [FilterOperator. IN],
        //             'wodeWoro.woroId': [FilterOperator. IN],
        //         },
        //     });
        // }
 
        // public async findAllWode() {
        //   return await this.wodeRepo.find({
        //     relations: ['wodeEmp', 'wodeFaci', 'wodeSeta', 'wodeWoro'],
        //     // select: ['wodeId','wodeTaskName', 'wodeStatus', 'wodeStartDate', 'wodeEndDate', 'wodeNotes', 'wodeEmp', 'wodeFaci', 'wodeSeta', 'wodeWoro'],
        //   });
        // } 

        // get wode all by woroId
        public async findAllWode(id: number) {
          return await this.wodeRepo.find({ 
            order: { wodeId: 'ASC' },
            where: { wodeWoro: { woroId: id } },
            relations: ['wodeEmp', 'wodeFaci', 'wodeSeta', 'wodeWoro'],
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
            wodeStartDate: Date = new Date(),
            wodeEndDate: Date,
            wodeNotes: string,
            wodeWoro: WorkOrders,
            wodeEmpId?: number,
            wodeFaciId?: number,
            wodeSetaId?: number,
            ) {
            try {

              //set wodeenddate
              if (wodeStatus === 'INPROGRESS') {
                wodeEndDate = null;
              }
              if (wodeStatus === 'CANCELLED' || wodeStatus === 'COMPLETED') {
                wodeEndDate = new Date();
              }

              const employee = wodeEmpId? await this.employeeRepo.findOne({ where: { empId: wodeEmpId } }) : null;
              if (!employee) {
                  throw new Error(`Employee with empId ${wodeEmpId} not found`);
              }
              const facilities = wodeFaciId? await this.faciRepo.findOne({ where: { faciId: wodeFaciId } }) : null;
              if (!facilities) {
                  throw new Error(`Facilities with faciId ${wodeFaciId} not found`);
              }
              const seta = wodeSetaId? await this.setaRepo.findOne({ where: { setaId: wodeSetaId } }) : null;
              if (!seta) {
                  throw new Error(`Service Task with setaId ${wodeSetaId} not found`);
              }

              const newWode = this.wodeRepo.create({
                wodeTaskName: wodeTaskName,
                wodeStatus: wodeStatus,
                wodeStartDate: wodeStartDate,
                wodeEndDate: wodeEndDate,
                wodeNotes: wodeNotes,
                wodeWoro: wodeWoro,
                wodeEmp: employee,
                wodeFaci: facilities,
                wodeSeta: seta,
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
                  wodeWoro: wodeWoro
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
            wodeStartDate: Date = new Date(),
            wodeEndDate: Date,
            wodeNotes: string,
            wodeEmpId: number,
            wodeFaciId: number,
            wodeSetaId: number,
            wodeWoro?: WorkOrders,
            ) {
              try {

                //set wodeenddate
                if (wodeStatus === 'INPROGRESS') {
                  wodeEndDate = null;
                }
                if (wodeStatus === 'CANCELLED' || wodeStatus === 'COMPLETED') {
                  wodeEndDate = new Date();
                }

                const employee = await this.employeeRepo.findOne({ where: { empId: wodeEmpId } });
                if (!employee) {
                    throw new Error(`Employee with empId ${wodeEmpId} not found`);
                }
                const facilities = await this.faciRepo.findOne({ where: { faciId: wodeFaciId } });
                if (!facilities) {
                    throw new Error(`Facilities with faciId ${wodeFaciId} not found`);
                }
                const seta = await this.setaRepo.findOne({ where: { setaId: wodeSetaId } });
                if (!seta) {
                    throw new Error(`Service Task with setaId ${wodeSetaId} not found`);
                }
                
                let updatedWodeWoro: WorkOrders | undefined;

                  if (wodeWoro) {
                    updatedWodeWoro = wodeWoro;
                  } else {
                    const existingWode = await this.wodeRepo.findOne({ where: { wodeId: id } });
                    if (existingWode) {
                      updatedWodeWoro = existingWode.wodeWoro;
                    }
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
                    wodeWoro: updatedWodeWoro
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
                    wodeWoro: updatedWodeWoro
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
