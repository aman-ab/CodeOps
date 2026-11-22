import { Body, Controller, DefaultValuePipe, Get, Headers, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { DebugEnabledGuard } from './debug-enabled.guard';
import { SlowService } from './slow.service';

@ApiExcludeController() // debug routes are not part of the documented API
@Controller('debug')
@UseGuards(DebugEnabledGuard)
export class DebugController {
  constructor(
    private readonly slow: SlowService,
    @InjectPinoLogger(DebugController.name) private readonly logger: PinoLogger,
  ) {}

  // Day 58, criterion 4: a REAL TypeError. Expect 500, "Internal server error",
  // and the stack trace in the terminal ONLY.
  @Get('boom')
  boom(): number {
    const broken = undefined as unknown as { x: { y: number } };
    return broken.x.y; // TypeError: Cannot read properties of undefined
  }

  // Day 59, criterion 5: GET /debug/slow?ms=6000 -> 408 after 5 s. ?ms=100 -> 200.
  @Get('slow')
  slowRoute(
    @Query('ms', new DefaultValuePipe(6000), ParseIntPipe) ms: number,
  ): Promise<{ waitedMs: number }> {
    return this.slow.wait(ms);
  }

  // Day 60, criterion 3: DELIBERATELY logs the headers and body it receives, to prove the logger's
  // redaction catches authorization, x-api-key and any phone field. Never do this for real.
  @Post('echo')
  echo(
    @Body() body: Record<string, unknown>,
    @Headers() headers: Record<string, string | undefined>,
  ): { logged: true } {
    this.logger.info({ request: { headers, body } }, 'debug echo');
    return { logged: true };
  }
}
