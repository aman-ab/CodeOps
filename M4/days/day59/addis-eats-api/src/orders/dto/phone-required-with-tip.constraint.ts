import {
  ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface,
} from 'class-validator';

// MY CROSS-FIELD RULE: "A tip is paid through TeleBirr, so tipSantim needs a phone."
// Neither field alone can decide this: args.object is the WHOLE dto.
//
// Attached to `phone` (not tipSantim) because phone is the field the client
// must fix, and the message names the input the frontend should highlight.
@ValidatorConstraint({ name: 'phoneRequiredWithTip', async: false })
export class PhoneRequiredWithTip implements ValidatorConstraintInterface {
  validate(phone: unknown, args: ValidationArguments): boolean {
    const dto = args.object as { tipSantim?: number };
    if (dto.tipSantim === undefined) return true; // rule does not apply
    return typeof phone === 'string' && phone.length > 0;
  }

  defaultMessage(): string {
    return 'phone is required when tipSantim is given (tips are paid through TeleBirr)';
  }
}
