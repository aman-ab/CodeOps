import { CanActivate, Injectable, NotFoundException } from '@nestjs/common';

// Debug routes exist only to PROVE behaviour (500 shape, 408 timeout).
// Off by default; never set ENABLE_DEBUG_ROUTES=true in production.
@Injectable()
export class DebugEnabledGuard implements CanActivate {
  canActivate(): boolean {
    if (process.env.ENABLE_DEBUG_ROUTES !== 'true') throw new NotFoundException();
    return true;
  }
}
