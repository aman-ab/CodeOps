import { SetMetadata } from '@nestjs/common';
import { Role } from '../auth/roles';

export const ROLES_KEY = 'roles';

// Does NOTHING at runtime except attach an array to the method (Day 54's decorator lesson).
// The guards read it back with the Reflector.
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
