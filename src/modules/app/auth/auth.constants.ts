import { DatabaseService } from "src/services/config/database/database.service";


const databaseService = new DatabaseService(
  `.env.${process.env.NODE_ENV || 'development'}`,
)

export const jwtConstants = {
  secret: databaseService.get('SECRET')??'secretKey',
};