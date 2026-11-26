import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";
 
async function bootstrap(): Promise<void> {
  // Build the application from the root module
  const app = await NestFactory.create(AppModule);
 
  // Cross-cutting settings live here, once
  app.setGlobalPrefix("api");
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors();
 
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
