import { Controller, Get, Param } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { Facilities } from 'output/entities/Facilities';
import { Hotels } from 'output/entities/Hotels';

@Controller('hotel')
export class HotelController {
    constructor(private HotelService: HotelService) { }

    @Get()
    public async getAll() {
        return await this.HotelService.findAll();
    }

    @Get('/facilities/:id')
    public async getOneFacilities(@Param('id') faciHotel: Hotels) {
        return await this.HotelService.findOneFacilities(faciHotel);
    }

    @Get('/facilities')
    public async getAllFacilities() {
        return await this.HotelService.findAllFacilities();
    }

    @Get('/reviews')
    public async getHotelReviews() {
        return await this.HotelService.findAllReviews();
    }

    @Get(':hotelId')
    public async getOne(@Param('hotelId') hotelId: number) {
        return await this.HotelService.findOne(hotelId);
    }

}
