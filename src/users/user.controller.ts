import { Controller, Get, Logger, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { PaginatedResponse } from '../common/api-response.dto';
import { PaginationQuery } from '../common/pagination.query';
import { AuthGuard } from 'src/common/auth.guard';
import { UserMapper } from './user.mapper';

@Controller('users')
export class UserController {
  private readonly logger: Logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getPaginated(@Query() query: PaginationQuery): Promise<PaginatedResponse> {
    const result = await this.userService.getPaginated(query);
    return UserMapper.toListResponsePaginated(result.data, result);
  }
}
