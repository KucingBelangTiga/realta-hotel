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
  import { WorkOrders } from 'output/entities/WorkOrders';
  import { Users } from 'output/entities/Users';
  import { WorkOrdersService } from './work_orders.service';

@Controller('work-orders')
export class WorkOrdersController { 
    constructor(
        private woroService: WorkOrdersService,
        @InjectRepository(WorkOrders)
        private woroRepo: Repository<WorkOrders>,
        @InjectRepository(Users)
        private usersRepo: Repository<Users>,
        ) {}

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
        @Body('userId') userId: number,
    ) {
    return await this.woroService.createWoro(
        woroStartDate, 
        woroStatus, 
        userId
    );
    } 
 
    @Put(':id')
    public async updateWoro(
        @Param('id') id: number,
        @Body('woroStartDate') woroStartDate: Date,
        @Body('woroStatus') woroStatus: string,
        @Body('userId') userId: number,
        ) { 
        return await this.woroService.updateWoro(
        id,
        woroStartDate,   
        woroStatus, 
        userId
        );
        }

        @Delete(':id')
        public async deleteWoro(@Param('id') id: number) {
        return await this.woroService.deleteWoro(id);
        } 
}
