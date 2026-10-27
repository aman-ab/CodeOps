import { cookies } from "next/headers";
import { users } from "../app/data/users";

export async function getSession() {
  const cookieStore = await cookies();

  const userId = cookieStore.get("session")?.value;

  if (!userId) {
    return null;
  }

  const user = users.find((user) => user.id === userId);

  return user ?? null;
}
