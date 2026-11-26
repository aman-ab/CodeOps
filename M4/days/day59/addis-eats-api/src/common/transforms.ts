import { TransformFnParams } from 'class-transformer';

// @Type(() => Boolean) turns the string "false" into TRUE (any non-empty
// string is truthy). So we convert the two words ourselves.
export const toBoolean = ({ value }: TransformFnParams): unknown => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return value; // anything else stays as-is and @IsBoolean() rejects it
};
