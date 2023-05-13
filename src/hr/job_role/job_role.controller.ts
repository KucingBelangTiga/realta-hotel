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
  import { JobRole } from 'output/entities/JobRole';
  import { JobRoleService } from './job_role.service';

@Controller('job-role')
export class JobRoleController {
    constructor(private joroService: JobRoleService) {}

    @Get()
    public async findAllJoro() {
      return await this.joroService.findAllJoro();
    }
    
    @Get(':id')
    public async findOneJoro(@Param('id') id: number) {
      return await this.joroService.findOneJoro(id);
    }
 
    @Post()
    public async createJoro(
    @Body('joroName') joroName: string,
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
