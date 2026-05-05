import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from '../auth-service/app.module';
import { ProductModule } from '../product-service/app.module';
import { CartModule } from '../cart-service/app.module';
import { OrderModule } from '../order-service/app.module';
import { ReviewModule } from '../review-service/app.module';
import { LegalModule } from '../legal-service/app.module';
import { ContactModule } from '../contact-service/app.module';

@Module({
  imports: [
    HttpModule,
    RouterModule.register([
      { path: 'api/auth', module: AuthModule },
      { path: 'api/products', module: ProductModule },
      { path: 'api/categories', module: ProductModule },
      { path: 'api/cart', module: CartModule },
      { path: 'api/orders', module: OrderModule },
      { path: 'api/reviews', module: ReviewModule },
      { path: 'api/legal', module: LegalModule },
      { path: 'api/contact', module: ContactModule },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}