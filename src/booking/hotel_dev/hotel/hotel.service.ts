import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Facilities } from 'output/entities/Facilities';
import { HotelReviews } from 'output/entities/HotelReviews';
import { Hotels } from 'output/entities/Hotels';
import { Repository } from 'typeorm';

@Injectable()
export class HotelService {
    constructor(
        @InjectRepository(Hotels) private hotelService: Repository<Hotels>,
        @InjectRepository(Facilities) private hotelFacilitiesService: Repository<Facilities>,
        @InjectRepository(HotelReviews) private reviewService: Repository<HotelReviews>
    ) { }

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

    public async findAllFacilities() {
        return await this.hotelFacilitiesService
            .find({ relations: { faciHotel: true } })
    }

    public async findOne(hotelId: number) {
        return await this.hotelService.findOne({ where: { hotelId: hotelId } });
    }

    public async findAllReviews() {
        return await this.reviewService.find({ relations: { horeHotel: true } });
    }

}
