import { TransformFnParams } from 'class-transformer';

// "?status=PENDING,PREPARING" -> ["PENDING", "PREPARING"]
// "?status=PENDING"           -> ["PENDING"]
// "?status=A&status=B"        -> arrives as an array already, kept as it is
export const toList = ({ value }: TransformFnParams): unknown => {
  if (typeof value !== 'string') return value;
  return value.split(',').map((s) => s.trim()).filter((s) => s.length > 0);
};

// Matches "name" or "-name" for any allowed field. Used with @Matches(..., { each: true }).
export const sortPattern = (fields: readonly string[]): RegExp =>
  new RegExp(`^-?(${fields.join('|')})$`);
