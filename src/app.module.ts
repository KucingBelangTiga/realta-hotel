import { Module } from '@nestjs/common';
import { PurchasingModule } from './purchasing/purchasing.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 2000,
      username: 'postgres',
      password: 'dimasaldio',
      database: 'hotelRealta',
      entities: ['dist/output/entities/*.js'],
      synchronize: false,
      autoLoadEntities: true,
    }),
    PurchasingModule,
  ],
})
export class AppModule {}
