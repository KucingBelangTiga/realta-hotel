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
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm'
  import { FilterOperator, FilterSuffix, Paginate, PaginateQuery, paginate, Paginated } from 'nestjs-paginate'
  import { Repository, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
  import { JobRole } from 'output/entities/JobRole';
  import { JobRoleService } from './job_role.service';

@Controller('job-role')
export class JobRoleController {
    constructor(private joroService: JobRoleService) {}

    @Get()
    public async findAllJoro(@Paginate() query: PaginateQuery,
    ): Promise <Paginated<JobRole>> {
      return await this.joroService.findAllJoro(query);
    }
    @Get(':id')
    public async findOneJoro(@Param('id') id: number) {
      return await this.joroService.findOneJoro(id);
    }
    // @Get('/joro/search')
    // public async findNameJoro(@Query('joroName') joroName: string) {
    // return await this.joroService.findNameJoro(joroName);
    // }
 
    @Post()
    public async createJoro(
    @Body('joroName') joroName: string,
    // @Body('joroModifiedDate') joroModifiedDate: Date
    joroModifiedDate: Date = new Date(), 
    ) { 
    return await this.joroService.createJoro(
      joroName, 
      joroModifiedDate
    );
    } 

    @Put(':id')
    public async updateJoro(
    @Param('id') id: number,
    @Body('joroName') joroName: string,
    // @Body('joroModifiedDate') joroModifiedDate: Date
    joroModifiedDate: Date = new Date(), 
    ) {
    return await this.joroService.updateJoro(
      id,
      joroName,
      joroModifiedDate
    );
    }

    @Delete(':id')
    public async deleteJoro(@Param('id') id: number) {
    return await this.joroService.deleteJoro(id);
    }
}
