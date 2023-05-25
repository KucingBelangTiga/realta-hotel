/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { FilterOperator, FilterSuffix, Paginate, PaginateQuery, paginate, Paginated } from 'nestjs-paginate'
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
    
        // public async findAllWoro(query: PaginateQuery): Promise<Paginated<WorkOrders>> {
        //     return paginate (query, this.woroRepo, {
        //         sortableColumns: ['woroId', 'woroStartDate', 'woroStatus', 'woroUser.userId'],
        //         defaultSortBy: [['woroId', 'ASC']],
        //         searchableColumns: ['woroId', 'woroStartDate', 'woroStatus', 'woroUser.userId'],
        //         select: ['woroId', 'woroStartDate', 'woroStatus', 'woroUser.userId'],
        //         maxLimit: 10, defaultLimit: 5,
        //         relations: {
        //             woroUser: true,
        //         },
        //         filterableColumns: {
        //             woroId: [FilterOperator. IN],
        //             woroStatus: [FilterOperator. ILIKE],
        //             'woroUser.userId': [FilterOperator. IN],
        //         },
        //     });
        // }
        public async findAllWoro() {
          return await this.woroRepo.find({
            relations: ['woroUser'],
            // select: ['woroId', 'woroStartDate', 'woroStatus', 'woroUser'],
            order: { woroId: 'ASC' },
          });
        }
        public async findOneWoro(id: number) {
          const woro = await this.woroRepo.findOne({ 
                    where: { woroId: id },
                    relations: ['woroUser'],
                  });
                  if (!woro) {
                      throw new NotFoundException('Work Order not found');
                  }
                  return woro;
              }  
    
          public async createWoro(
            woroStartDate: Date,
            woroStatus: string,
            woroUserId: number
            ) {
            try {
            const user = await this.usersRepo.findOne({ where: { userId: woroUserId } });
            if (!user) {
              throw new Error(`User with userId ${woroUserId} not found`);
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
              woroUserId: number
            ) {
              try {
                const user = await this.usersRepo.findOne({ where: { userId: woroUserId } });
                if (!user) {
                  throw new Error(`User with userId ${woroUserId} not found`);
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
                    woroUser: {userId: woroUserId}
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
