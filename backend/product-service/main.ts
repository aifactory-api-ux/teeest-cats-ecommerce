import { NestFactory } from '@nestjs/core';
import { ProductModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  });

  const port = process.env.PORT || 8002;
  await app.listen(port);
  console.log(`Product service running on port ${port}`);
}

bootstrap();