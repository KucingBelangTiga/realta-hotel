/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { JobRole } from 'output/entities/JobRole';
import { FilterOperator, FilterSuffix, Paginate, PaginateQuery, paginate, Paginated } from 'nestjs-paginate'

@Injectable()
export class JobRoleService {
    constructor(
        @InjectRepository(JobRole)
        private joroRepo: Repository<JobRole>, 
        ) {}
    
        public async findAllJoro(query: PaginateQuery): Promise<Paginated<JobRole>> {
            return paginate (query, this.joroRepo, {
                sortableColumns: ['joroId', 'joroName', 'joroModifiedDate'],
                defaultSortBy: [['joroId', 'ASC']],
                searchableColumns: ['joroId', 'joroName', 'joroModifiedDate'],
                select: ['joroId', 'joroName', 'joroModifiedDate'],
                maxLimit: 10, defaultLimit: 5,
                filterableColumns: { 
                    joroId: [FilterOperator. IN],
                    joroName: [FilterOperator. ILIKE],
                },
            });
        }
        public async findOneJoro(id: number) {
                return await this.joroRepo.findOne({ where: { joroId: id } });
        }
        // public async findNameJoro(joroName: string) {
        //     try {
        //       const response = await this.joroRepo
        //         .createQueryBuilder('joro')
        //         .select()
        //         .where('LOWER(joro.joroName) Like LOWER(:joroName)', {
        //           joroName: `%${joroName.toLowerCase()}%`,
        //         })
        //         .getMany();
        //       if (response.length === 0) {
        //         return {
        //           statusCode: 401,
        //           message: 'Joro not found.',
        //         };
        //       } else {
        //         return response;
        //       }
        //     } catch (error) {
        //       throw new Error(
        //         `Error:, ${error.message}`,
        //       );
        //     }
        //   }
    
          public async createJoro(
            joroName: string,
            joroModifiedDate: Date
            ) {
            try {
              const response = await this.joroRepo.save({
                joroName: joroName,
                joroModifiedDate: joroModifiedDate
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
      
            public async updateJoro(
              id: number,
              joroName: string,
              joroModifiedDate: Date
            ) {
              try {
                await this.joroRepo.update(
                  { joroId: id },
                  {
                    joroName: joroName,
                    joroModifiedDate: joroModifiedDate
                  }
                );
                return {
                  statusCode: 200,
                  message: 'Data updated successfully',
                  data: {
                    joroId: id,
                    joroName: joroName,
                    joroModifiedDate: joroModifiedDate
                  },
                };
              } catch (error) {
                throw new Error(`Error updating data: ${error.message}`);
              }
            }
              
              public async deleteJoro(id: number) {
                try {
                  await this.joroRepo.delete(id);
                  return {
                    statusCode: 200,
                    message: 'Data deleted successfully.',
                    data: {
                        joroId: id,
                    },
                  };
                } catch (error) {
                  throw new Error(`Error deleting data: ${error.message}`);
                }
              }
}
