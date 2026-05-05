import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    RouterModule.register([
      { path: 'api/auth', target: 'http://auth-service:8001' },
      { path: 'api/products', target: 'http://product-service:8002' },
      { path: 'api/categories', target: 'http://product-service:8002' },
      { path: 'api/cart', target: 'http://cart-service:8003' },
      { path: 'api/orders', target: 'http://order-service:8004' },
      { path: 'api/reviews', target: 'http://review-service:8005' },
      { path: 'api/legal', target: 'http://legal-service:8006' },
      { path: 'api/contact', target: 'http://contact-service:8007' },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}