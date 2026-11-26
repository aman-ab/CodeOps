import type { Request } from 'express';
import { AuthUser } from './roles';

// Week 12's JWT guard will put a REAL user here. RolesGuard only ever reads req.user,
// so it keeps working unchanged.
export interface AuthenticatedRequest extends Request {
  user?: AuthUser;
}
