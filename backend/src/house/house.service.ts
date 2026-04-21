import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { House } from './entities/house.entity';
import { User } from '../users/entities/user.entity';
import { PropertyType } from './entities/property_type.entity';
import { Amenity } from './entities/amenities.entity';
import { DeepPartial } from 'typeorm';

@Injectable()
export class HouseService {
  constructor(
    @InjectRepository(House)
    private readonly houseRepository: Repository<House>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createHouseDto: CreateHouseDto, authUserId: string) {
    const owner = await this.userRepository.findOne({
      where: { supabaseUserId: authUserId },
    });

    if (!owner) {
      throw new NotFoundException(
        'Owner profile was not found. Create a user profile first.',
      );
    }

    const entity = this.houseRepository.create({
      ...this.mapDtoToHousePartial(createHouseDto),
      owner,
    });

    return this.houseRepository.save(entity);
  }

  async findAll() {
    return this.houseRepository.find({
      relations: {
        owner: true,
      },
    });
  }

  async findOne(id: string) {
    const house = await this.houseRepository.findOne({
      where: { id },
      relations: {
        owner: true,
      },
    });

    if (!house) {
      throw new NotFoundException(`House "${id}" was not found.`);
    }

    return house;
  }

  async update(id: string, updateHouseDto: UpdateHouseDto, authUserId: string) {
    const house = await this.findOne(id);
    this.assertOwner(house, authUserId);

    this.houseRepository.merge(house, this.mapDtoToHousePartial(updateHouseDto));
    return this.houseRepository.save(house);
  }

  async remove(id: string, authUserId: string, canDeleteAny: boolean) {
    const house = await this.findOne(id);
    if (!canDeleteAny) {
      this.assertOwner(house, authUserId);
    }
    await this.houseRepository.remove(house);
    return { deleted: true };
  }

  private assertOwner(house: House, authUserId: string) {
    if (!house.owner || house.owner.id !== authUserId) {
      throw new ForbiddenException('Only the house owner can perform this action.');
    }
  }

  private mapDtoToHousePartial(
    dto: Partial<CreateHouseDto>,
  ): DeepPartial<House> {
    return {
      title: dto.title,
      description: dto.description,
      price: dto.price,
      type: dto.type,
      status: dto.status,
      rooms: dto.rooms,
      bathrooms: dto.bathrooms,
      bedrooms: dto.bedrooms,
      kitchen: dto.kitchen,
      area: dto.area,
      yearBuilt: dto.yearBuilt,
      location: dto.location,
      images: dto.imageUrls?.map((url) => ({ url })),
      propertyType: dto.propertyType
        ? ({ name: dto.propertyType } as DeepPartial<PropertyType>)
        : undefined,
      amenities: dto.amenities?.map(
        (name) => ({ name }) as DeepPartial<Amenity>,
      ),
    };
  }
}
