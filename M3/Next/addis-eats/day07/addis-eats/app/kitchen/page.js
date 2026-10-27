import { redirect } from "next/navigation";
import { getSession } from "../../lib/session";

export default async function KitchenPage() {
  const user = await getSession();

  if (!user) {
    redirect("/signin?next=/kitchen");
  }

  if (user.role !== "staff") {
    return (
      <main>
        <h1>Access Denied</h1>
        <p>Only staff members can access the kitchen.</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Kitchen</h1>

      <p>Welcome, {user.name}.</p>

      <p>Here staff can manage orders.</p>
    </main>
  );
}
