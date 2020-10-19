import { Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AppJwtStrategy } from './strategies/jwt.strategy';
import { AppLocalStrategy } from './strategies/local.strategy';

import { jwtConstants } from './auth.constants';
import {
  AppAuthService,
} from 'src/modules/app/auth/auth.service';
import { AppAuthController } from 'src/modules/app/auth/auth.controller';
import { AppAccountModule } from '../account/account.module';
import { ToolsModule } from 'src/modules/common/tools/tools.module';

@Module({
  imports: [
    PassportModule,
    AppAccountModule,
    ToolsModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    })
  ],
  providers: [AppAuthService, AppLocalStrategy, AppJwtStrategy],
  exports: [AppAuthService, PassportModule, JwtModule],
  controllers: [AppAuthController],
})
export class AppAuthModule {}
