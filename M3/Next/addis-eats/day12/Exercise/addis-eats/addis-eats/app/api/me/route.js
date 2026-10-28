import { getSession } from "../../../lib/session";

export const dynamic = "force-dynamic";

// GET /api/me -> 200 { user: { id, name, role } | null }
// Signed-out is a normal answer here (the header asks on every page), so it is 200, not 401.
// This is how the header learns who is signed in WITHOUT reading cookies in the layout —
// which would make every page in the app dynamic.
export async function GET() {
  return Response.json({ user: await getSession() });
}
