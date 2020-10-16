import { Module } from '@nestjs/common';
import { EntityModule } from 'src/entities/entities.module';

import { LoginService as AppLoginService } from './app/login/login.service';

const serviceList = [AppLoginService];

const mouduleList = [EntityModule];

@Module({
  imports: [...mouduleList],
  providers: [...serviceList],
  exports: [...serviceList],
})
export class ServicesModule {}
