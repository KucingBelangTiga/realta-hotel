import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryGroup } from 'output/entities/CategoryGroup';
import { Policy } from 'output/entities/Policy';
import { PolicyCategoryGroup } from 'output/entities/PolicyCategoryGroup';
import { Repository } from 'typeorm';
import { CreateCategoryGroupDto } from './category-group.dto';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class CategoryGroupService {
  constructor(
    @InjectRepository(CategoryGroup)
    private serviceRepo: Repository<CategoryGroup>,
    @InjectRepository(PolicyCategoryGroup)
    private policy: Repository<PolicyCategoryGroup>,
  ) {}

  public async findAll() {
    return await this.serviceRepo.find({
      order: { cagroId: 'ASC' },
      relations: { policyCategoryGroups: { pocaPoli: true } },
    });
  }

  public async findPage(
    options: IPaginationOptions,
  ): Promise<Pagination<PolicyCategoryGroup>> {
    const queryBuilder = this.policy
      .createQueryBuilder('c')
      .innerJoinAndSelect('c.pocaCagro', 'pocaCagro')
      .innerJoinAndSelect('c.pocaPoli', 'pocaPoli')
      .orderBy('pocaCagro.cagroId', 'ASC');
    return paginate<PolicyCategoryGroup>(queryBuilder, options);
  }

  public async findPolicy() {
    return await this.policy.find({
      relations: { pocaCagro: true, pocaPoli: true },
    });
  }

  public async findOne(id: number) {
    return await this.serviceRepo.findOne({
      where: { cagroId: id },
      relations: { policyCategoryGroups: { pocaPoli: true } },
    });
  }

  public async create(
    file: any,
    categoryGroupDetail: CreateCategoryGroupDto,
    policyDetail: {
      pocaPoli: Policy;
    },
  ) {
    try {
      const categoryGroup = await this.serviceRepo.save({
        ...categoryGroupDetail,
        cagroIcon: file.originalname,
        cagroIconUrl: file.originalname,
      });
      const policyCategory = await this.policy.save({
        ...policyDetail,
        pocaCagro: { cagroId: categoryGroup.cagroId },
      });
      return policyCategory;
    } catch (error) {
      return error.message;
    }
  }

  public async update(
    id: number,
    file: any,
    categoryGroupDetail: CreateCategoryGroupDto,
  ) {
    try {
      //   const findOne = this.serviceRepo.findOne({
      //     where: { cagroId: id },
      //     relations: { policyCategoryGroups: true },
      //   });
      const categoryGroup = await this.serviceRepo.update(id, {
        ...categoryGroupDetail,
        cagroIcon: file.originalname,
        cagroIconUrl: file.originalname,
      });

      return categoryGroup;
    } catch (error) {
      return error.message;
    }
  }

  public async updatePolicy(id: number, poliId: number) {
    try {
      const policy = await this.policy.update(id, {
        pocaPoli: { poliId: poliId },
      });

      return policy;
    } catch (error) {
      return error.message;
    }
  }

  public async delete(id: number) {
    try {
      const categoryGroup = await this.serviceRepo.delete(id);

      return categoryGroup;
    } catch (error) {
      return error.message;
    }
  }
}
