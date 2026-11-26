import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { EdgeValidationPipe } from './common/pipes/edge-validation.pipe';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  app.useGlobalPipes(new EdgeValidationPipe());          // Day 58: stage 4
  app.useGlobalFilters(new AllExceptionsFilter());       // Day 58: stage 7
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
