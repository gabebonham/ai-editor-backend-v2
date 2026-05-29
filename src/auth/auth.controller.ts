import { Body, Controller, Get, Logger, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserRequest } from './dtos/register-user.request';
import { LoginUserRequest } from './dtos/login.request';
import { LoginResponse } from './dtos/login.response';
import { UserEntity } from 'src/database/entities/user.entity';
import { AuthGuard } from 'src/common/auth.guard';
@Controller('auth')
export class AuthController {
  private readonly logger: Logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() dto: RegisterUserRequest): Promise<Partial<UserEntity>> {
    return await this.authService.register(dto);
  }
  @Post('login')
  async login(@Body() dto: LoginUserRequest, @Res({ passthrough: true }) res: any): Promise<LoginResponse> {
    const result = await this.authService.login(dto);
    res.cookie('token', result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // false em dev
      sameSite: 'lax',                               // funciona em dev
      maxAge: result.expires_in,
    });
    return result;
  }
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: any) {
    res.clearCookie('token');
  }
  @Get('me')
  @UseGuards(AuthGuard)
  me(@Req() req: any) {
    return req.user;
  }
}
