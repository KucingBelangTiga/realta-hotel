import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HotelsService } from './hotel/hotels/hotels.service';
import { HotelsController } from './hotel/hotels/hotels.controller';
import { HotelsService } from './hotel/hotels/hotels.service';
import { HotelsController } from './hotel/hotels/hotels.controller';
import { HotelsController } from './hotel/hotels/hotels.controller';
import { HotelsService } from './hotel/hotels/hotels.service';

@Module({
  imports: [],
  controllers: [AppController, HotelsController],
  providers: [AppService, HotelsService],
})
export class AppModule {}
