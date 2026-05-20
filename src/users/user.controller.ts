import { Controller, Logger, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { PaginatedResponse } from '../common/api-response.dto';
import { PaginationQuery } from '../common/pagination.query';

@Controller()
export class UserController {
  private readonly logger: Logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  @Post()
  async getPaginated(@Query() query: PaginationQuery): Promise<PaginatedResponse> {
    return await this.userService.getPaginated(query);
  }
}
