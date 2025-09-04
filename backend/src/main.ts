import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common/pipes';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Extra fields remove ho jayein
      forbidNonWhitelisted: true, // Extra fields pe error throw ho
      transform: true, // DTO types auto transform ho
    }),
  );

  const cors = {
    origin: ['http://localhost:3000'], // frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  };
  app.enableCors(cors);

  const port = process.env.PORT || 5000; // default 5000
  await app.listen(port);
  console.log(`Backend running on http://localhost:${port}`);
}
void bootstrap();
