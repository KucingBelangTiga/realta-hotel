import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserBreakfeast } from 'output/entities/UserBreakfeast';
import { Repository } from 'typeorm';

@Injectable()
export class UserBreakfeastService {
    constructor(
        @InjectRepository(UserBreakfeast) private usbrService: Repository<UserBreakfeast>
    ) { }

    public async findAll() {
        return await this.usbrService.find();
    }

    public async findOne(usbrBordeId: number) {
        return await this.usbrService.findOne({ where: { usbrBordeId } });
    }

    public async createUsbr(
        usbrBordeId: number,
        usbrModifiedDate: Date,
        usbrTotalVacant: number
    ) {
        try {
            await this.usbrService.save({
                usbrBordeId: usbrBordeId,
                usbrModifiedDate: usbrModifiedDate,
                usbrTotalVacant: usbrTotalVacant
            });
            return 'data user breakfeast berhasil ditambahkan';
        } catch (err) {
            return err.message;
        }
    }

    public async updateUsbr(
        usbrBordeId: number,
        usbrModifiedDate: Date,
        usbrTotalVacant: number
    ) {
        try {
            await this.usbrService.update(usbrBordeId, {
                usbrModifiedDate: usbrModifiedDate,
                usbrTotalVacant: usbrTotalVacant
            });
            return 'data user breakfeast berhasil diubah';
        } catch (err) {
            return err.message;
        }
    }

    public async deleteUsbr(usbrBordeId: number) {
        try {
            await this.usbrService.delete(usbrBordeId);
            return 'data user breakfeast yang dipilih berhasil dihapus';
        } catch (err) {
            return err.message;
        }
    }
}
