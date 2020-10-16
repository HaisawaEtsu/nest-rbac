import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from './services/config/database/database.service';

@Controller()
export class AppController {
  constructor(private configService: DatabaseService){
  }
  
  @Get()
  getAppIndex(){
    // 用get并传入.env底下APP_NAME这个key
    console.log(this.configService)
    return this.configService.get('DB_DATABASE');
  }
}
