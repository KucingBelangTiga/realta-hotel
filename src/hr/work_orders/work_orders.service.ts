/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { WorkOrders } from 'output/entities/WorkOrders';
import { Users } from 'output/entities/Users';
import { FilterOperator, FilterSuffix, Paginate, PaginateQuery, paginate, Paginated } from 'nestjs-paginate'

@Injectable()
export class WorkOrdersService {
    constructor(
        @InjectRepository(WorkOrders)
        private woroRepo: Repository<WorkOrders>, 
        ) {}
    
        public async findAllWoro(query: PaginateQuery): Promise<Paginated<WorkOrders>> {
            return paginate (query, this.woroRepo, {
                sortableColumns: ['woroId', 'woroStartDate', 'woroStatus', 'woroUser.userId'],
                defaultSortBy: [['woroId', 'ASC']],
                searchableColumns: ['woroId', 'woroStartDate', 'woroStatus', 'woroUser.userId'],
                select: ['woroId', 'woroStartDate', 'woroStatus', 'woroUser.userId'],
                maxLimit: 10, defaultLimit: 5,
                relations: {
                    woroUser: true,
                },
                filterableColumns: {
                    woroId: [FilterOperator. IN],
                    woroStatus: [FilterOperator. ILIKE],
                    'woroUser.userId': [FilterOperator. IN],
                },
            });
        }
        public async findOneWoro(id: number) {
                return await this.woroRepo.findOne({ 
                    where: { woroId: id },
                    relations: ['woroUser'],
                });
        }
    
          public async createWoro(
            woroStartDate: Date,
            woroStatus: string,
            userId: number
            ) {
            try {
              const response = await this.woroRepo.save({
                woroStartDate: woroStartDate,
                woroStatus: woroStatus,
                woroUser: {userId: userId}
              });
              return {
                statusCode: 201,
                message: 'Data added successfully',
                data: response,
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
                await this.woroRepo.update(
                  { woroId: id },
                  {
                    woroStartDate: woroStartDate,
                    woroStatus: woroStatus,
                    woroUser: {userId: userId}
                  }
                );
                return {
                  statusCode: 200,
                  message: 'Data updated successfully',
                  data: {
                    woroId: id,
                    woroStartDate: woroStartDate,
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
