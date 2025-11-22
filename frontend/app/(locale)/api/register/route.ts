import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { fullName, email, password, password2, agree } = (await req.json()) as {
      fullName?: string;
      email?: string;
      password?: string;
      password2?: string;
      agree?: boolean;
    };

    const errors: { path: (string | number)[]; message: string }[] = [];

    if (!fullName || fullName.trim().length < 2) {
      errors.push({ path: ["fullName"], message: "Full name is required" });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push({ path: ["email"], message: "Valid email is required" });
    }
    if (!password || password.length < 8) {
      errors.push({ path: ["password"], message: "Password must be at least 8 characters" });
    }
    if (password2 !== password) {
      errors.push({ path: ["password2"], message: "Passwords do not match" });
    }
    if (agree !== true) {
      errors.push({ path: ["agree"], message: "You must agree to the terms" });
    }

    if (errors.length > 0) {
      return Response.json({ ok: false, errors }, { status: 400 });
    }

    // TODO: Persist user securely (hash password server-side)
    // Example placeholder (no-op):
    // await db.user.create({ fullName, email, passwordHash: await bcrypt.hash(password, 12) })

    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ ok: false, message: "Unexpected error" }, { status: 500 });
  }
}
