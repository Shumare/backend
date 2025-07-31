import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(6666, () => {
    console.log('🚀 Server running on http://localhost:6666');
  });
}

bootstrap();
