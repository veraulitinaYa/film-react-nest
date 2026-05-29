import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common'; // <-- ДОБАВЛЕНО

import 'dotenv/config';

// <-- ДОБАВЛЕНО: импорты логгеров
import { DevLogger } from './logger/dev.logger';
import { JsonLogger } from './logger/json.logger';
import { TskvLogger } from './logger/tskv.logger';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.setGlobalPrefix('api/afisha');
  app.enableCors();

  const loggerType = process.env.LOGGER_TYPE;

  if (loggerType === 'json') {
    app.useLogger(new JsonLogger());
  } else if (loggerType === 'tskv') {
    app.useLogger(new TskvLogger());
  } else {
    app.useLogger(new DevLogger());
  }

  await app.listen(PORT, '0.0.0.0');

  const url = await app.getUrl();

  const logger = new Logger('Bootstrap');

  logger.log('Сервер работает!');
  logger.log(`URL: ${url}/api/afisha`);

  logger.log(`DB Driver: ${process.env.DATABASE_DRIVER}`);
  logger.log(`DB URL: ${process.env.DATABASE_URL}`);
  logger.log(`Debug: ${process.env.DEBUG}`);
}

bootstrap();