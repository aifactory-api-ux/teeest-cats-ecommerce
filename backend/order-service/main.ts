import { NestFactory } from '@nestjs/core';
import { OrderModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(OrderModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  });

  const port = process.env.PORT || 8004;
  await app.listen(port);
  console.log(`Order service running on port ${port}`);
}

bootstrap();