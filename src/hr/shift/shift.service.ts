/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Shift } from 'output/entities/Shift';

@Injectable()
export class ShiftService {
    constructor(
        @InjectRepository(Shift)
        private shiftRepo: Repository<Shift>, 
        ) {}
    
        public async findAllShift() {
          return await this.shiftRepo.find();
        }
        
        public async findOneShift(id: number) {
          const shift = await this.shiftRepo.findOne({
            where: { shiftId: id },
          });
          if (!shift) {
            throw new NotFoundException('Shift not found');
          }
          return shift;
        }
    
          public async createShift(
            shiftName: string,
            shiftStartTime: string,
            shiftEndTime: string
            ) {
            try {
              const shift = await this.shiftRepo.save({
                shiftName: shiftName,
                shiftStartTime: shiftStartTime,
                shiftEndTime: shiftEndTime
              });
              return {
                statusCode: 201,
                message: 'Data added successfully',
                data: shift,
              };
            } catch (error) {
              throw new Error(`Error adding data: ${error.message}`);
            }
            }
      
            public async updateShift(
              id: number,
              shiftName: string,
              shiftStartTime: string,
              shiftEndTime: string
            ) {
              try {
                await this.shiftRepo.update(
                  { shiftId: id },
                  {
                    shiftName: shiftName,
                    shiftStartTime: shiftStartTime,
                    shiftEndTime: shiftEndTime
                  }
                );
                return {
                  statusCode: 200,
                  message: 'Data updated successfully',
                  data: {
                    shiftId: id,
                    shiftName: shiftName,
                    shiftStartTime: shiftStartTime,
                    shiftEndTime: shiftEndTime
                  },
                };
              } catch (error) {
                throw new Error(`Error updating data: ${error.message}`);
              }
            }
              
              public async deleteShift(id: number) {
                try {
                  await this.shiftRepo.delete(id);
                  return {
                    statusCode: 200,
                    message: 'Data deleted successfully.',
                    data: {
                        shiftId: id,
                    },
                  };
                } catch (error) {
                  throw new Error(`Error deleting data: ${error.message}`);
                }
              }
}
  