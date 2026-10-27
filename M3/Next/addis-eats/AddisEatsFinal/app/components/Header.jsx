import Navbar from "./Navbar";
import { getSession } from "../../lib/session";

export default async function Header() {
  const user = await getSession();

  return <Navbar user={user ? { name: user.name, role: user.role } : null} />;
}
