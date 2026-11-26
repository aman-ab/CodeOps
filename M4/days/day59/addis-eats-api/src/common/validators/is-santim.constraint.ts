import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export const SANTIM_MAX = 10_000_000; // 100,000 ETB: a sanity ceiling

// Reusable constraint class form: unit-testable on its own. Use with @Validate(IsSantimConstraint)
@ValidatorConstraint({ name: 'isSantim', async: false })
export class IsSantimConstraint implements ValidatorConstraintInterface {
  validate(value: unknown): boolean {
    return typeof value === 'number' && Number.isInteger(value) && value > 0 && value <= SANTIM_MAX;
  }

  defaultMessage(args: ValidationArguments): string {
    return (
      `${args.property} must be a whole number of santim, ` +
      `between 1 and ${SANTIM_MAX} (100,000 ETB)`
    );
  }
}
