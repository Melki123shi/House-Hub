import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeepPartial, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    createUserDto: CreateUserDto,
    authUser: { id?: string; sub?: string; email?: string },
  ): Promise<User> {
    const supabaseUserId = authUser.id ?? authUser.sub;

    const existing = supabaseUserId
      ? await this.userRepository.findOne({ where: { supabaseUserId } })
      : null;

    if (existing) {
      const mergedExisting = this.userRepository.merge(existing, {
        ...createUserDto,
        email: createUserDto.email ?? authUser.email ?? existing.email,
      });
      return this.userRepository.save(mergedExisting);
    }

    const userPayload: DeepPartial<User> = {
      ...createUserDto,
      email: createUserDto.email ?? authUser.email,
      supabaseUserId,
    };
    const user = this.userRepository.create(userPayload);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return this.findByIdOrThrow(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findByIdOrThrow(id);
    const mergedUser = this.userRepository.merge(user, updateUserDto);
    return this.userRepository.save(mergedUser);
  }

  async remove(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  private async findByIdOrThrow(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
}
