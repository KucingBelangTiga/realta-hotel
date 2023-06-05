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
    Query,
    UseInterceptors,
    UploadedFile,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm'
  import { FilterOperator, FilterSuffix, Paginate, PaginateQuery, paginate, Paginated } from 'nestjs-paginate'
  import { Repository, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
  import { WorkOrderDetailService } from './work_order_detail.service';
  import { WorkOrderDetail } from 'output/entities/WorkOrderDetail';
  import { Employee } from 'output/entities/Employee';
  import { WorkOrders } from 'output/entities/WorkOrders';
  import { ServiceTask } from 'output/entities/ServiceTask';
  import { Facilities } from 'output/entities/Facilities';

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

    // @Get()
    // public async findAllWode(@Paginate() query: PaginateQuery,
    // ): Promise <Paginated<WorkOrderDetail>> {
    //   return await this.wodeService.findAllWode(query);
    // }

    //get all by woroId
    @Get('all/:id')
    public async findAllWode(@Param('id') id: number) {
      return await this.wodeService.findAllWode(id);
    }

    @Get(':id')
    public async findOneWode(@Param('id') id: number) {
      return await this.wodeService.findOneWode(id);
    }

    @Post()
    public async createWode(
        @Body('wodeTaskName') wodeTaskName: string,
        @Body('wodeStatus') wodeStatus: string,
        wodeStartDate: Date = new Date(),
        @Body('wodeEndDate') wodeEndDate: Date, 
        @Body('wodeNotes') wodeNotes: string,
        @Body('wodeWoro') wodeWoro: WorkOrders,
        @Body('wodeEmpId') wodeEmpId?: number,
        @Body('wodeFaciId') wodeFaciId?: number,
        @Body('wodeSetaId') wodeSetaId?: number,
    ) {
      if (!wodeEmpId) {
        wodeEmpId = null;
      }
      if (!wodeFaciId) {
        wodeFaciId = null;
      }
      if (!wodeSetaId) {
        wodeSetaId = null;
      }
    return await this.wodeService.createWode(
        wodeTaskName, 
        wodeStatus, 
        wodeStartDate,
        wodeEndDate,
        wodeNotes,
        wodeWoro,
        wodeEmpId,
        wodeFaciId,
        wodeSetaId,
    );
    } 
 
    @Put(':id')
    public async updateWode(
        @Param('id') id: number,
        @Body('wodeTaskName') wodeTaskName: string,
        @Body('wodeStatus') wodeStatus: string,
        wodeStartDate: Date = new Date(),
        @Body('wodeEndDate') wodeEndDate: Date,
        @Body('wodeNotes') wodeNotes: string,
        @Body('wodeEmpId') wodeEmpId: number,
        @Body('wodeFaciId') wodeFaciId: number, 
        @Body('wodeSetaId') wodeSetaId: number,
        @Body('wodeWoro') wodeWoro: WorkOrders,
        ) { 
        return await this.wodeService.updateWode( 
        id,
        wodeTaskName,   
        wodeStatus, 
        wodeStartDate,
        wodeEndDate,
        wodeNotes,
        wodeEmpId,
        wodeFaciId,
        wodeSetaId,
        wodeWoro
        );
        }

        @Delete(':id')
        public async deleteWode(@Param('id') id: number) {
        return await this.wodeService.deleteWode(id);
        } 
}
