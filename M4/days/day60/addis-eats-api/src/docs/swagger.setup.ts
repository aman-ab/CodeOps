import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

// Built ONCE, then used for two things: the /docs page and the exported openapi.json.
export function buildOpenApiDocument(app: INestApplication): OpenAPIObject {
  const config = new DocumentBuilder()
    .setTitle('Addis Eats API')
    // Two sentences naming what surprises every new caller, then the one header worth knowing.
    .setDescription(
      'Food delivery for Addis Ababa. Money is always whole santim (24000 = 240.00 ETB); ' +
        'phone numbers are TeleBirr format (09xxxxxxxx or +2519xxxxxxxx). ' +
        'Every response carries an x-request-id header: quote it when you report a problem.',
    )
    .setVersion('1.0')
    .addTag('restaurants', 'Kitchens that take orders')
    .addTag('dishes', 'Items on a restaurant menu')
    .addTag('orders', 'Customer orders and their status')
    // Makes "Try it out" work on guarded endpoints: paste a key once under Authorize.
    // In week 12 this becomes addBearerAuth().
    .addApiKey(
      { type: 'apiKey', name: 'x-api-key', in: 'header', description: 'Staff key. In development: STAFF_API_KEY from your .env.' },
      'api-key',
    )
    .build();

  return SwaggerModule.createDocument(app, config);
}

// /docs (the page) and /docs-json (the raw document). Never mounted in production.
export function mountSwagger(app: INestApplication, document: OpenAPIObject): void {
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: { persistAuthorization: true }, // the key survives a refresh
  });
}
