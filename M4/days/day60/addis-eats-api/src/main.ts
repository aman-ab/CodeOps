import { writeFileSync } from 'node:fs';
import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { EdgeValidationPipe } from './common/pipes/edge-validation.pipe';
import { buildOpenApiDocument, mountSwagger } from './docs/swagger.setup';

async function bootstrap(): Promise<void> {
  // Hold Nest's own start-up messages until pino is ready, so even those are JSON.
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));

  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  app.useGlobalPipes(new EdgeValidationPipe());          // Day 58: stage 4
  // The exception filter is registered with APP_FILTER in AppModule (it needs a logger injected).
  app.enableCors();

  const document = buildOpenApiDocument(app);

  // EXPORT_OPENAPI=1 npm run start  ->  writes openapi.json and exits (commit the file).
  if (process.env.EXPORT_OPENAPI) {
    writeFileSync('openapi.json', JSON.stringify(document, null, 2));
    await app.close();
    return;
  }

  // /docs lists every endpoint, field and validation rule: a map for anyone probing the API.
  if (process.env.NODE_ENV !== 'production') mountSwagger(app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
