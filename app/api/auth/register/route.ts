import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/mongodb";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const { email: emailRaw, password, name: nameRaw } = body as Record<
    string,
    unknown
  >;

  if (typeof emailRaw !== "string" || typeof password !== "string") {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 },
    );
  }

  const email = emailRaw.toLowerCase().trim();
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters" },
      { status: 400 },
    );
  }

  const name =
    typeof nameRaw === "string" && nameRaw.trim()
      ? nameRaw.trim().slice(0, 120)
      : null;

  const db = await getDb();
  const users = db.collection("users");
  await users.createIndex({ email: 1 }, { unique: true });

  const passwordHash = await bcrypt.hash(password, 12);

  try {
    await users.insertOne({
      email,
      password: passwordHash,
      name,
      createdAt: new Date(),
    });
  } catch (e: unknown) {
    const code =
      typeof e === "object" && e !== null && "code" in e
        ? (e as { code: number }).code
        : undefined;
    if (code === 11000) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 },
      );
    }
    throw e;
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
