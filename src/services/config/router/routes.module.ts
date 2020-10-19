import { Module } from '@nestjs/common';
import { Routes,RouterModule } from 'nest-router'
import { AppAccountModule } from 'src/modules/app/account/account.module';
import { ApplicationModule } from 'src/modules/app/application.module';
import { AppAuthModule } from 'src/modules/app/auth/auth.module';

const routes: Routes = [
  {
    path: '/app',
    module: ApplicationModule,
    children: [
      {
        path: '/auth',
        module: AppAuthModule,
      },
      {
        path: '/account',
        module: AppAccountModule,
      }
    ],
  },
];

const moduleList = [
  ApplicationModule,
  AppAuthModule,
  AppAccountModule
]

@Module({
  imports: [
      RouterModule.forRoutes(routes), // setup the routes
      ...moduleList
  ], // as usual, nothing new
})

export class RoutersModule {}