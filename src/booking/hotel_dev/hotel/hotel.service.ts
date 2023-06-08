import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryGroup } from 'output/entities/CategoryGroup';
import { Entitys } from 'output/entities/Entitys';
import { Facilities } from 'output/entities/Facilities';
import { HotelReviews } from 'output/entities/HotelReviews';
import { Hotels } from 'output/entities/Hotels';
import { PriceItems } from 'output/entities/PriceItems';
import { UserAccounts } from 'output/entities/UserAccounts';
import { Sequelize, Model, DataTypes, QueryTypes } from 'sequelize';
import { Repository } from 'typeorm';

@Injectable()
export class HotelService {
    constructor(
        @InjectRepository(Hotels) private hotelService: Repository<Hotels>,
        @InjectRepository(Facilities) private hotelFacilitiesService: Repository<Facilities>,
        @InjectRepository(HotelReviews) private reviewService: Repository<HotelReviews>,
        @InjectRepository(PriceItems) private priceItemsService: Repository<PriceItems>,
        @InjectRepository(Entitys) private entityService: Repository<Entitys>,
        @InjectRepository(UserAccounts) private usersListService: Repository<UserAccounts>,
        @InjectRepository(CategoryGroup) private categoryGroupService: Repository<CategoryGroup>,
    ) { }

    // sequelize = new Sequelize(database, user, password, {
    //     host,
    //     port,
    //     dialect: 'postgres',
    //     logging: false
    //   })

    public async findAll() {
        return await this.hotelService.find({ relations: { hotelAddr: true } });
    }


    // public async findAll() {
    //     // return await this.hotelService.find({ relations: { hotelAddr: true } });
    //     return await this.hotelFacilitiesService
    //         .createQueryBuilder("facilities")
    //         .leftJoin("facilities.faciHotel", "hotels")
    //         .getMany()
    // }

    public async findOneFacilities(faciHotel: Hotels) {
        return await this.hotelFacilitiesService
            .createQueryBuilder("facilities")
            .innerJoin("facilities.faciHotel", "hotels")
            .where("facilities.faciHotel = :faciHotel", { faciHotel: faciHotel })
            .getMany()
    }

    public async findReviewUsername() {
        // return await this.reviewService
        //     .createQueryBuilder("hotel_reviews")
        //     .innerJoin("hotel_reviews.horeUserId", "users")
        //     .where("hotel_reviews.horeUserId = :userId")
        //     .getMany()
        // return await this.sequelize.query('SELECT * FROM hotel.hotel_reviews INNER JOIN users.users ON users.user_id = hotel_reviews.hore_user_id', { type: QueryTypes.SELECT });
        return await this.reviewService.query('SELECT * FROM hotel.hotel_reviews JOIN hotel.hotels ON hotels.hotel_id = hotel_reviews.hore_hotel_id JOIN users.users ON users.user_id = hotel_reviews.hore_user_id')
    }

    public async findAllFacilities() {
        return await this.hotelFacilitiesService
            .find({ relations: { faciHotel: true, faciCagro: true } })
    }

    public async findOne(hotelId: number) {
        return await this.hotelService.findOne({ where: { hotelId: hotelId } });
    }

    public async findAllReviews() {
        return await this.reviewService.find({ relations: { horeHotel: true } });
    }

    public async getAllPriceItems() {
        return await this.priceItemsService.find();
    }

    public async getAllEntitysPayment() {
        return await this.entityService.find({ relations: { bank: true, paymentGateway: true } });
    }

    public async getUserList() {
        return await this.usersListService.find();
    }

    public async getCategoryGroup() {
        return await this.categoryGroupService.find();
    }

}
