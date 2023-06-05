/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, Session } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { FilterOperator, FilterSuffix, Paginate, PaginateQuery, paginate, Paginated } from 'nestjs-paginate'
import { WorkOrders } from 'output/entities/WorkOrders';
import { Users } from 'output/entities/Users';
import { Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Op } from 'sequelize';
import {
  Get,
  Query,
} from '@nestjs/common';

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
            order: { woroId: 'ASC' },
          });
        }

        public async findFilteredWoro(from?: Date, to?: Date): Promise<any> {
          try {
            const whereClause: any = {};

            if (from && to) {
              whereClause.woroStartDate = Between(from, to);
            } else if (from) {
              whereClause.woroStartDate = MoreThanOrEqual(from);
            } else if (to) {
              whereClause.woroStartDate = LessThanOrEqual(to);
            }

            const result = await this.woroRepo.find({
              where: whereClause,
              relations: ['woroUser'],
              order: { woroId: 'ASC' },
            });

            if (result.length === 0) {
              return {
                message: 'No Work Order found.',
              };
            }
            return {
              message: 'Work Order found.',
              data: result,
            };
          } catch (error) {
            return error;
          }
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
            woroStatus = 'OPEN',
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

                //set worouser tetap pakai nilai lama jika tak diupdate
                let user = null;
                if (woroUserId) {
                  user = await this.usersRepo.findOne({ where: { userId: woroUserId } });
                  if (!user) {
                    throw new Error(`User with userId ${woroUserId} not found`);
                  }
                }

                const updateData: Partial<WorkOrders> = {
                  woroStartDate: woroStartDate,
                  woroStatus: woroStatus
                };

                if (user) {
                  updateData.woroUser = user;
                }

                await this.woroRepo.update({ woroId: id }, updateData);

                // await this.woroRepo.update(
                //   { woroId: id },
                //   {
                //     woroStartDate: woroStartDate,
                //     woroStatus: woroStatus,
                //     // woroUser: updatedWoroUser,
                //     woroUser: user
                //   }
                // );
                return {
                  statusCode: 200,
                  message: 'Data updated successfully',
                  data: {
                    woroId: id,
                    woroStatus: woroStatus,
                    // woroUser: updatedWoroUser,
                    woroUser: user
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
