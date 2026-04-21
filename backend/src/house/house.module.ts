import { Module } from '@nestjs/common';
import { HouseService } from './house.service';
import { HouseController } from './house.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { House } from './entities/house.entity';
import { Amenity } from './entities/amenities.entity';
import { Image } from './entities/image.entity';
import { Location } from './entities/location.entity';
import { PropertyType } from './entities/property_type.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([House, Amenity, Image, Location, PropertyType, User]),
  ],
  controllers: [HouseController],
  providers: [HouseService],
})
export class HouseModule { }
