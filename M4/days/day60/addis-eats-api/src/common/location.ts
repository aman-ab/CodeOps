import type { Response } from 'express';

// 201 should say WHERE the new thing lives. The id is only known after
// creation, so a static @Header() cannot do it. We use @Res({ passthrough: true })
// in the handler: Nest still serialises the return value, we only add a header.
export function setLocation(res: Response, path: string): void {
  res.location(path);
}
