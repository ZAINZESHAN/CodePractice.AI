import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
