import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../users/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
 @Module({
   imports: [
     JwtModule.registerAsync({
       useFactory: (config: ConfigService) => ({
         secret: config.get<string>('JWT_SECRET'),
         signOptions: { expiresIn: '1d' },
       }),
       inject: [ConfigService],
     }),
     UserModule,
   ],
   controllers: [AuthController],
   providers: [AuthService],
 })
export class AuthModule {}
