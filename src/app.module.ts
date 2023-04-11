import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HotelsService } from './hotel/hotels/hotels.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, HotelsService],
})
export class AppModule {}
