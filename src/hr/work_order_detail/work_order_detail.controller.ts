/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Delete,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm'
  import { Repository, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
  import { WorkOrderDetail } from 'output/entities/WorkOrderDetail';
  import { Employee } from 'output/entities/Employee';
  import { WorkOrders } from 'output/entities/WorkOrders';
  import { ServiceTask } from 'output/entities/ServiceTask';
  import { Facilities } from 'output/entities/Facilities';
  import { WorkOrderDetailService } from './work_order_detail.service';

@Controller('work-order-detail')
export class WorkOrderDetailController {
    constructor(
        private wodeService: WorkOrderDetailService,
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

    @Get()
    public async findAllWode() {
      return await this.wodeService.findAllWode();
    }
    
    @Get(':id')
    public async findOneWode(@Param('id') id: number) {
      return await this.wodeService.findOneWode(id);
    }

    @Post()
    public async createWode(
        @Body('wodeTaskName') wodeTaskName: string,
        @Body('wodeStatus') wodeStatus: string,
        @Body('wodeStartDate') wodeStartDate: Date,
        @Body('wodeEndDate') wodeEndDate: Date,
        @Body('wodeNotes') wodeNotes: string,
        @Body('empId') empId: number,
        @Body('faciId') faciId: number,
        @Body('setaId') setaId: number,
        @Body('woroId') woroId: number
    ) {
    return await this.wodeService.createWode(
        wodeTaskName, 
        wodeStatus, 
        wodeStartDate,
        wodeEndDate,
        wodeNotes,
        empId,
        faciId,
        setaId,
        woroId
    );
    } 
 
    @Put(':id')
    public async updateWode(
        @Param('id') id: number,
        @Body('wodeTaskName') wodeTaskName: string,
        @Body('wodeStatus') wodeStatus: string,
        @Body('wodeStartDate') wodeStartDate: Date,
        @Body('wodeEndDate') wodeEndDate: Date,
        @Body('wodeNotes') wodeNotes: string,
        @Body('empId') empId: number,
        @Body('faciId') faciId: number,
        @Body('setaId') setaId: number,
        @Body('woroId') woroId: number,
        ) { 
        return await this.wodeService.updateWode(
        id,
        wodeTaskName,   
        wodeStatus, 
        wodeStartDate,
        wodeEndDate,
        wodeNotes,
        empId,
        faciId,
        setaId,
        woroId
        );
        }

        @Delete(':id')
        public async deleteWode(@Param('id') id: number) {
        return await this.wodeService.deleteWode(id);
        } 
}
