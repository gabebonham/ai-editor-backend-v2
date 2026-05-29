import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { RegisterUserRequest } from './dtos/register-user.request';
import { LoginUserRequest } from './dtos/login.request';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/user.service';
import { UserEntity } from 'src/database/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginResponse } from './dtos/login.response';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);
  constructor(private jwtService: JwtService,private userService: UserService) {}
  async register(dto: RegisterUserRequest): Promise<Partial<UserEntity>> {
    const hash = await bcrypt.hash(dto.password, 10);

    const user = await this.userService.create(dto.username, hash, dto.email);
    const {password, ...finalUser} = user;
    return finalUser;
  }
  
  async login(dto: LoginUserRequest): Promise<LoginResponse> {
    try {
      const user = await this.userService.getByEmail(dto.email);
      const isValid = await bcrypt.compare(dto.password, user.password);
      if (!isValid) {
        throw new UnauthorizedException('Wrong credentials.');
      }
      const tokenRes = await this.generateToken(user);
      return tokenRes;
    } catch (error:any) {
      this.logger.error(`Login failed for email: ${dto.email}`, error.stack);
      throw new UnauthorizedException('Wrong credentials.');
    }
  }

  private async generateToken(user: UserEntity): Promise<LoginResponse> {
    const token = this.jwtService.sign({sub: user.id, email: user.email,username: user.username}, { expiresIn: '1d' });
    return {
      access_token: token,
      expires_in: 60 * 60 * 24 * 1000,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  }
}
