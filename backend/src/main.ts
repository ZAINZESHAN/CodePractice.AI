import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common/pipes';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

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
    credentials: true, // ✅ yeh add karo
    allowedHeaders: ['Content-Type', 'Authorization'], // ✅ headers allow
  };
  app.enableCors(cors);

  const port = process.env.PORT || 5000; // default 5000
  app.useStaticAssets(join(__dirname, '..', 'uploads'), { prefix: '/uploads' });
  await app.listen(port);
  console.log(`Backend running on http://localhost:${port}`);
}
void bootstrap();
