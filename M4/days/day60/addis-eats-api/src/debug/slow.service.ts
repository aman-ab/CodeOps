import { Injectable } from '@nestjs/common';

// A method with a configurable delay. It MUST be asynchronous: a synchronous busy-loop blocks
// the event loop, so the timeout's timer could never fire.
@Injectable()
export class SlowService {
  async wait(ms: number): Promise<{ waitedMs: number }> {
    const waitedMs = Math.min(Math.max(ms, 0), 30_000);
    await new Promise<void>((resolve) => setTimeout(resolve, waitedMs));
    return { waitedMs };
  }
}
