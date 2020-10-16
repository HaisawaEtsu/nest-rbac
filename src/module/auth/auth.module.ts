import { Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

import { jwtConstants } from './auth.constants';
import {
  AppAuthService,
} from 'src/module/auth/app/auth.service';
import { AppAuthController } from 'src/module/auth/app/auth.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    })
  ],
  providers: [AppAuthService, LocalStrategy, JwtStrategy],
  exports: [AppAuthService, PassportModule, JwtModule],
  controllers: [AppAuthController],
})
export class AuthModule {}
