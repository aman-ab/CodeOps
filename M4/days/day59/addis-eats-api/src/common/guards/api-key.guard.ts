import {
  CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { AuthenticatedRequest } from '../auth/authenticated-request';
import { Role } from '../auth/roles';
import { safeEqual } from '../auth/safe-equal';
import { ROLES_KEY } from '../decorators/roles.decorator';

// TEMPORARY scaffolding so guards can be taught before authentication (week 12 replaces it
// with a JWT guard that puts a real user on the request).
//
// Why it is GLOBAL and only acts on routes that declare @Roles:
// global guards run BEFORE controller/method guards, and RolesGuard (global) needs req.user to
// exist already. So this guard must run first and set it. Routes with no @Roles stay open.
@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly config: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(ctx: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      ctx.getHandler(), // method first ...
      ctx.getClass(),   // ... then class
    ]);
    if (!required?.length) return true; // open route: nothing to authenticate

    const req = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    const header = req.headers['x-api-key'];
    const key = Array.isArray(header) ? header[0] : header;

    // 401: "I do not know who you are"  /  403: "I know you, and the answer is no"
    if (!key) throw new UnauthorizedException('x-api-key is required');

    const role = this.roleFor(key);
    if (!role) throw new ForbiddenException('Invalid API key');

    req.user = { roles: [role] };
    return true;
  }

  // Keys come from configuration (.env), never from the source code.
  private roleFor(key: string): Role | undefined {
    if (safeEqual(key, this.config.get<string>('STAFF_API_KEY'))) return 'staff';
    if (safeEqual(key, this.config.get<string>('CUSTOMER_API_KEY'))) return 'customer';
    return undefined;
  }
}
