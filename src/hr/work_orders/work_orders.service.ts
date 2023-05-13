/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { WorkOrders } from 'output/entities/WorkOrders';
import { Users } from 'output/entities/Users';

@Injectable()
export class WorkOrdersService {
    constructor(
        @InjectRepository(WorkOrders)
        private woroRepo: Repository<WorkOrders>, 
        @InjectRepository(Users)
        private usersRepo: Repository<Users>,
        ) {}
    
        public async findAllWoro() {
          return await this.woroRepo.find({
            relations: ['woroUser'],
          });
        }
        
        public async findOneWoro(id: number) {
          const woro = await this.woroRepo.findOne({ 
                    where: { woroId: id },
                    relations: ['woroUser'],
                  });
                  if (!woro) {
                      throw new NotFoundException('Work Orders not found');
                  }
                  return woro;
              }  
    
          public async createWoro(
            woroStartDate: Date,
            woroStatus: string,
            userId: number
            ) {
            try {
            const user = await this.usersRepo.findOne({ where: { userId: userId } });
            if (!user) {
              throw new Error(`User with userId ${userId} not found`);
            }
              const newWoro = this.woroRepo.create({
                woroStartDate: woroStartDate,
                woroStatus: woroStatus,
                woroUser: user
              });
              await this.woroRepo.save(newWoro);
            return {
            statusCode: 201,
            message: 'Data added successfully',
            data: {
                woroId: newWoro.woroId,
                woroStatus: woroStatus,
                woroUser: user
            },
          };
          } catch (error) {
            throw new Error(`Error adding data: ${error.message}`);
          }
          }
      
            public async updateWoro(
              id: number,
              woroStartDate: Date,
              woroStatus: string,
              userId: number
            ) {
              try {
                const user = await this.usersRepo.findOne({ where: { userId: userId } });
                if (!user) {
                  throw new Error(`User with userId ${userId} not found`);
                }
                await this.woroRepo.update(
                  { woroId: id },
                  {
                    woroStartDate: woroStartDate,
                    woroStatus: woroStatus,
                    woroUser: user
                  }
                );
                return {
                  statusCode: 200,
                  message: 'Data updated successfully',
                  data: {
                    woroId: id,
                    woroStatus: woroStatus,
                    woroUser: {userId: userId}
                  },
                };
              } catch (error) {
                throw new Error(`Error updating data: ${error.message}`);
              }
            }
              
              public async deleteWoro(id: number) {
                try {
                  await this.woroRepo.delete(id);
                  return {
                    statusCode: 200,
                    message: 'Data deleted successfully.',
                    data: {
                        woroId: id,
                    },
                  };
                } catch (error) {
                  throw new Error(`Error deleting data: ${error.message}`);
                }
              }
}
