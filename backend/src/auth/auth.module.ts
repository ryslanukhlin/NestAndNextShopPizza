import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategry } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { GoogleStrategy } from './google.stratygy';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
            useFactory: async () => ({
                secret: process.env.sercetKeyJwt,
                signOptions: { expiresIn: '1h' },
            })
        })
    ],
    providers: [AuthService, LocalStrategry, JwtStrategy, GoogleStrategy],
    exports: [AuthService, JwtModule],
    controllers: [AuthController]
})
export class AuthModule {}
