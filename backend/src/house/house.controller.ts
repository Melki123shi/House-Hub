import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnauthorizedException,
} from '@nestjs/common';
import { HouseService } from './house.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { Public } from '../auth/public.decorator';
import { CurrentUser } from '../auth/current-user.decorator';
import { Roles } from '../auth/role.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('house')
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  @Post()
  @Roles([UserRole.OWNER, UserRole.ADMIN])
  async create(
    @Body() createHouseDto: CreateHouseDto,
    @CurrentUser() user: { id?: string; sub?: string },
  ) {
    const authUserId = user.id ?? user.sub;
    if (!authUserId) {
      throw new UnauthorizedException('Authenticated user id was not found.');
    }
    return await this.houseService.create(createHouseDto, authUserId as string);
  }

  @Get()
  @Public()
  async findAll() {
    return await this.houseService.findAll();
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: string) {
    return await this.houseService.findOne(id);
  }

  @Patch(':id')
  @Roles([UserRole.OWNER])
  async update(
    @Param('id') id: string,
    @Body() updateHouseDto: UpdateHouseDto,
    @CurrentUser() user: { id?: string; sub?: string },
  ) {
    const authUserId = user.id ?? user.sub;
    if (!authUserId) {
      throw new UnauthorizedException('Authenticated user id was not found.');
    }
    return await this.houseService.update(id, updateHouseDto, authUserId as string);
  }

  @Delete(':id')
  @Roles([UserRole.OWNER, UserRole.ADMIN])
  async remove(
    @Param('id') id: string,
    @CurrentUser()
    user: { id?: string; sub?: string; role?: string; roles?: string[] },
  ) {
    const authUserId = user.id ?? user.sub;
    if (!authUserId) {
      throw new UnauthorizedException('Authenticated user id was not found.');
    }
    const assignedRoles = [
      ...(Array.isArray(user.roles) ? user.roles : []),
      ...(user.role ? [user.role] : []),
    ];
    const canDeleteAny = assignedRoles.includes(UserRole.ADMIN);
    return await this.houseService.remove(id, authUserId as string, canDeleteAny);
  }
}
