import { registerDecorator, ValidationOptions } from 'class-validator';

export const TELEBIRR = /^(?:\+251|0)9\d{8}$/;

// 0912345678 and +251912345678 pass. 251912345678, 0812345678 and 09123456789 do not.
export function IsTeleBirrNumber(options?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      name: 'isTeleBirrNumber',
      target: object.constructor,
      propertyName,
      options,
      validator: {
        validate: (value: unknown): boolean => typeof value === 'string' && TELEBIRR.test(value),
        // written for the person holding the phone, not for the developer
        defaultMessage: (): string =>
          'phone must be a TeleBirr number: 09xxxxxxxx or +2519xxxxxxxx',
      },
    });
  };
}
