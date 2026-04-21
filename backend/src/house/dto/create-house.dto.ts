import { UUID } from 'crypto';
import { HouseAmenities, HouseStatus, PropertyTypeEnum, HouseType } from '../enums/house.enums';
import { Location } from '../entities/location.entity';

export class CreateHouseDto {
  title: string;
  description: string;
  imageUrls: string[];
  price: number;
  // Owner is inferred from the authenticated user on create.
  owner?: UUID;
  type: HouseType;
  propertyType: PropertyTypeEnum;
  location: Location;
  status: HouseStatus;
  rooms: number;
  bathrooms: number;
  bedrooms: number;
  kitchen: number;
  area: number;
  yearBuilt: number;
  amenities: HouseAmenities[];
}
