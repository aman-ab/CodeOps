import { z } from "zod";

// Server-only variables, validated once when the server boots (see instrumentation.js).
// A clear error on the first line beats an undefined three screens later.
const serverSchema = z.object({
  SESSION_SECRET: z.string().min(32, "must be at least 32 characters (openssl rand -base64 32)"),
});

export function validateServerEnv() {
  const result = serverSchema.safeParse(process.env);
  if (!result.success) {
    const problems = Object.entries(result.error.flatten().fieldErrors)
      .map(([name, errors]) => `  - ${name}: ${errors.join(", ")}`)
      .join("\n");
    throw new Error(`Invalid environment:\n${problems}\nCopy .env.example to .env.local and fill it in.`);
  }
  return result.data;
}
