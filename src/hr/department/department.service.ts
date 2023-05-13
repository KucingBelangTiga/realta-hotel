/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Department } from 'output/entities/Department';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepo: Repository<Department>, 
    ) {}

    public async findAllDept() {
      return await this.departmentRepo.find();
    }
    
    public async findOneDept(id: number) {
      const department = await this.departmentRepo.findOne({
        where: { deptId: id },
      });
      if (!department) {
        throw new NotFoundException('Department not found');
      }
      return department;
    }

      public async createDept(
        deptName: string,
        deptModifiedDate: Date = new Date()
        ) {
        try {
          const dept = await this.departmentRepo.save({
            deptName: deptName,
            deptModifiedDate: deptModifiedDate
          });
          // return dept;
          return {
            statusCode: 201,
            message: 'Data added successfully',
            data: dept,
          };
        } catch (error) {
          throw new Error(`Error adding data: ${error.message}`);
        }
        }
  
        public async updateDept(
          id: number,
          deptName: string,
          deptModifiedDate: Date = new Date()
        ) {
          try {
            await this.departmentRepo.update(
              { deptId: id },
              {
                deptName: deptName,
                deptModifiedDate: deptModifiedDate
              }
            );
            return {
              statusCode: 200,
              message: 'Data updated successfully',
              data: {
                deptId: id,
                deptName: deptName,
                deptModifiedDate: deptModifiedDate
              },
            };
          } catch (error) {
            throw new Error(`Error updating data: ${error.message}`);
          }
        }
          
          public async deleteDept(id: number) {
            try {
              await this.departmentRepo.delete(id);
              return {
                statusCode: 200,
                message: 'Data deleted successfully.',
                data: {
                    deptId: id,
                },
              };
            } catch (error) {
              throw new Error(`Error deleting data: ${error.message}`);
            }
          }
  }
