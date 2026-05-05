import { NestFactory } from '@nestjs/core';
import { CartModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(CartModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  });

  const port = process.env.PORT || 8003;
  await app.listen(port);
  console.log(`Cart service running on port ${port}`);
}

bootstrap();