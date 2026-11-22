import { ArgumentMetadata, PipeTransform, ValidationPipe } from '@nestjs/common';

const base = {
  whitelist: true,                                   // strip undeclared properties
  transform: true,                                   // build the DTO instance (step 2)
  transformOptions: { enableImplicitConversion: false }, // explicit @Type() only
  stopAtFirstError: false,                           // report every failure at once
  disableErrorMessages: false,
};

// "This module rejects on writes and strips on queries."
//   body  -> forbidNonWhitelisted: an unknown field is a 400 that names it
//   query -> an unknown key is silently dropped
// Two pre-built pipes (not one with a flag flipped per call) so two requests
// handled at the same time can never see each other's setting.
export class EdgeValidationPipe implements PipeTransform {
  private readonly strict = new ValidationPipe({ ...base, forbidNonWhitelisted: true });
  private readonly lenient = new ValidationPipe({ ...base, forbidNonWhitelisted: false });

  transform(value: unknown, metadata: ArgumentMetadata): Promise<unknown> {
    const pipe = metadata.type === 'body' ? this.strict : this.lenient;
    return pipe.transform(value, metadata);
  }
}
