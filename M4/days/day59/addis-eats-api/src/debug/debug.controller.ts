import { Controller, DefaultValuePipe, Get, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { DebugEnabledGuard } from './debug-enabled.guard';
import { SlowService } from './slow.service';

@Controller('debug')
@UseGuards(DebugEnabledGuard)
export class DebugController {
  constructor(private readonly slow: SlowService) {}

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
}
