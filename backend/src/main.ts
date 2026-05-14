import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api/afisha");
  app.enableCors();

  await app.listen(PORT,'0.0.0.0');

  const url = await app.getUrl();

  console.log(`Сервер работает!`);
  console.log(`URL: ${url}/api/afisha`);

  console.log(`DB Driver: ${process.env.DATABASE_DRIVER}`);
  console.log(`DB URL: ${process.env.DATABASE_URL}`);
  console.log(`Debug: ${process.env.DEBUG}`);
}

bootstrap();