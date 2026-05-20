import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserRequest } from './dtos/register-user.request';
import { LoginUserRequest } from './dtos/login.request';
import { LoginResponse } from './dtos/login.response';
import { UserEntity } from 'src/database/entities/user.entity';
@Controller('auth')
export class AuthController {
  private readonly logger: Logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterUserRequest): Promise<Partial<UserEntity>> {
    return await this.authService.register(dto);
  }
  @Post('login')
  async login(@Body() dto: LoginUserRequest): Promise<LoginResponse> {
    return await this.authService.login(dto);
  }
}
