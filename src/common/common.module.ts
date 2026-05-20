import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
@Global()
@Module({
    imports: [
    JwtModule.registerAsync({
        useFactory: (config: ConfigService) => ({
            secret: config.get<string>('JWT_SECRET'),
            signOptions: { expiresIn: '1d' },
        }),
        inject: [ConfigService],
        })
    ],
    controllers: [],
    providers: [JwtService,AuthGuard],
    exports: [JwtModule, AuthGuard],
})
export class CommonModule {}
