// DEMO user table. Passwords are stored as scrypt hashes (see lib/password.js) — the plain
// passwords are in the README for you to sign in with, and nowhere in the code.
// Swap for a real database; keep the same three functions.
const users = [
  { id: "usr_1", name: "Abebe", phone: "0911000001", role: "customer", passwordHash: "scrypt$38f25c060ee1d92d68113316308543b2$26e55381edd859f17735ea7c1870d7d86b30bb8fa28f4bbbc1d35fe165c79a07c716a702c069a1cd853569d4e14e7ff81d6b0bb935990fdb12f5e0017b073285" },
  { id: "usr_2", name: "Almaz", phone: "0911000002", role: "customer", passwordHash: "scrypt$9a5b511ac4fb14267cdb73c7c4185f5c$03d80bb652a1cb4326c97545dcb5b5fd74581c8e2a4d325dac0457f5361fac1534811d9f03fe4f87f6ad3b24c1609226b8776eae9a86faa7571e5fd09f5cb064" },
  { id: "usr_3", name: "Kebede", phone: "0911000003", role: "staff", passwordHash: "scrypt$49944cb6d59b6413ca40a9e131a88383$935afd8640249fecfd2aa9c401d2a192c5a0e40bbeb316b934fc741aa501d95c4d2f92c821237bca57b5d97a271da286b29edc18156cb3e79891cd9d1c75c445" },
];

// "+251911000001" and "0911000001" are the same number
export function normalizePhone(input) {
  const p = String(input ?? "").replace(/[\s-]/g, "");
  return p.startsWith("+2519") ? "0" + p.slice(4) : p;
}

export function findUserByPhone(phone) {
  const wanted = normalizePhone(phone);
  return users.find((u) => u.phone === wanted) ?? null;
}

// Never returns the hash to callers that only need to know who someone is.
export function getUserById(id) {
  const u = users.find((x) => x.id === id);
  return u ? { id: u.id, name: u.name, role: u.role } : null;
}
