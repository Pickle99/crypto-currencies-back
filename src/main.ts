import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });
  app.enableCors({
    origin: 'http://localhost:3000', // Next.js app's URL
  });
  await app.listen(8000);
}
bootstrap();
