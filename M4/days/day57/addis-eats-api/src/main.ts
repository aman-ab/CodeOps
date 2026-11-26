import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DomainErrorFilter } from './common/domain-error.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  // Day 57: URI versioning. Every route becomes /api/v1/...
  // /api/restaurants (no version) is now a 404.
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new DomainErrorFilter());
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
