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
  import { WorkOrdersService } from './work_orders.service';
  import { WorkOrders } from 'output/entities/WorkOrders';
  import { Users } from 'output/entities/Users';

@Controller('work-orders')
export class WorkOrdersController { 
    constructor(
        private woroService: WorkOrdersService,
        @InjectRepository(WorkOrders)
        private woroRepo: Repository<WorkOrders>,
        @InjectRepository(Users)
        private usersRepo: Repository<Users>,
        ) {}

    // @Get()
    // public async findAllWoro(@Paginate() query: PaginateQuery,
    // ): Promise <Paginated<WorkOrders>> {
    //   return await this.woroService.findAllWoro(query);
    // }
    @Get()
    public async findAllWoro() {
      return await this.woroService.findAllWoro();
    }
    @Get(':id') 
    public async findOneWoro(@Param('id') id: number) {
      return await this.woroService.findOneWoro(id);
    }
 
    @Post()
    public async createWoro(
        @Body('woroStartDate') woroStartDate: Date,
        @Body('woroStatus') woroStatus: string,
        @Body('woroUserId') woroUserId: number,
    ) {
    return await this.woroService.createWoro(
        woroStartDate, 
        woroStatus, 
        woroUserId
    );
    } 
 
    @Put(':id')
    public async updateWoro(
        @Param('id') id: number,
        @Body('woroStartDate') woroStartDate: Date,
        @Body('woroStatus') woroStatus: string,
        @Body('woroUserId') woroUserId: number,
        ) { 
        return await this.woroService.updateWoro(
        id,
        woroStartDate,   
        woroStatus, 
        woroUserId
        );
        }

        @Delete(':id')
        public async deleteWoro(@Param('id') id: number) {
        return await this.woroService.deleteWoro(id);
        } 
}
