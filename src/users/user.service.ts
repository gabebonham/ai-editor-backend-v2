import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PaginationQuery } from '../common/pagination.query';
import { UsersRepository } from '../database/repositories/user.repository';
import { PaginatedResponse } from '../common/api-response.dto';
import { UserEntity } from 'src/database/entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async create(username: string, password: string, email: string): Promise<UserEntity> {
    const user = await this.usersRepository.findByEmail(email);
    if (user) {
      throw new BadRequestException('Email already in use.');
    }
    return await this.usersRepository.create({username, password, email});
  }
  async getByEmail(email: string): Promise<UserEntity> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  async getByEmailAndPassword(email: string, password: string) {
    const user = await this.usersRepository.findByEmailAndPassword(email, password);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  async getPaginated(dto: PaginationQuery): Promise<PaginatedResponse> {
    return await this.usersRepository.findAllPaginated(dto.page, dto.limit);
  }
  async update(id: string, data: Partial<UserEntity>): Promise<void> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    await this.usersRepository.create({ ...user, ...data });
  }
  async getById(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }
}
