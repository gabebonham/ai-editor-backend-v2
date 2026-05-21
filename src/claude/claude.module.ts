import { Module } from '@nestjs/common';
import { ClaudeService } from './claude.service';
import { ClaudeController } from './claude.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../database/entities/user.entity';
import { UserRepository } from '../database/repositories/user.repository';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [ClaudeController],
  providers: [ClaudeService, UserRepository],
  exports: [ClaudeService],
})
export class ClaudeModule{}
