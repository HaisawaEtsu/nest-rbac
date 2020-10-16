import { Module } from '@nestjs/common';
import { EntityModule } from 'src/entities/entities.module';

import { LoginService as AdminLoginService } from './admin/login/login.service';

const serviceList = [AdminLoginService];

const mouduleList = [EntityModule];

@Module({
  imports: [...mouduleList],
  providers: [...serviceList],
  exports: [...serviceList],
})
export class ServicesModule {}
