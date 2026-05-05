import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ApiGatewayController } from './api-gateway.controller';

@Module({
  imports: [HttpModule],
  controllers: [ApiGatewayController],
  providers: [],
})
export class AppModule {}