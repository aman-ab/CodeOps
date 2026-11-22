import {
  CanActivate, ExecutionContext, ForbiddenException, Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthenticatedRequest } from '../auth/authenticated-request';
import { Role } from '../auth/roles';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    // getAllAndOverride: the FIRST place that has @Roles wins. Handler first, class second,
    // so a method-level @Roles overrides a controller-level one. Swap the array and the
    // controller would always win: a method could never be stricter than its class,
    // which is a security bug, not a style problem.
    const required = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    if (!required?.length) return true; // no @Roles = open

    const user = ctx.switchToHttp().getRequest<AuthenticatedRequest>().user;
    if (required.some((r) => user?.roles.includes(r))) return true;

    // Throw instead of returning false: the client gets a reason and the right code.
    throw new ForbiddenException(`Requires role: ${required.join(' or ')}`);
  }
}
