import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { BOOK_CATEGORIES } from "@/lib/book-categories";
import { insertBook } from "@/lib/books-db";
import type { BookCondition } from "@/lib/types";

const CONDITIONS: BookCondition[] = ["New", "Like New", "Used", "Good"];

function isHttpUrl(s: string): boolean {
  try {
    const u = new URL(s.trim());
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Sign in to list a book." },
      { status: 401 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const b = body as Record<string, unknown>;

  const title = typeof b.title === "string" ? b.title : "";
  const author = typeof b.author === "string" ? b.author : "";
  const image = typeof b.image === "string" ? b.image : "";
  const category = typeof b.category === "string" ? b.category : "";
  const edition =
    typeof b.edition === "string" && b.edition.trim() ? b.edition.trim() : undefined;
  const year =
    typeof b.year === "string" && b.year.trim() ? b.year.trim() : undefined;
  const description =
    typeof b.description === "string" && b.description.trim()
      ? b.description.trim()
      : undefined;

  const conditionRaw = b.condition;
  const condition =
    typeof conditionRaw === "string" && CONDITIONS.includes(conditionRaw as BookCondition)
      ? (conditionRaw as BookCondition)
      : null;

  let price: number;
  if (typeof b.price === "number" && Number.isFinite(b.price)) {
    price = b.price;
  } else if (typeof b.price === "string") {
    price = parseFloat(b.price);
  } else {
    price = NaN;
  }

  if (!title.trim() || title.length > 240) {
    return NextResponse.json(
      { error: "Title is required (max 240 characters)." },
      { status: 400 },
    );
  }
  if (!author.trim() || author.length > 200) {
    return NextResponse.json(
      { error: "Author is required (max 200 characters)." },
      { status: 400 },
    );
  }
  if (!image.trim() || !isHttpUrl(image)) {
    return NextResponse.json(
      { error: "Enter a valid image URL (http or https)." },
      { status: 400 },
    );
  }
  if (image.length > 2000) {
    return NextResponse.json({ error: "Image URL is too long." }, { status: 400 });
  }
  if (!(BOOK_CATEGORIES as readonly string[]).includes(category)) {
    return NextResponse.json({ error: "Choose a valid category." }, { status: 400 });
  }
  if (!condition) {
    return NextResponse.json({ error: "Choose a condition." }, { status: 400 });
  }
  if (!Number.isFinite(price) || price < 0 || price > 50000) {
    return NextResponse.json(
      { error: "Enter a valid price between 0 and 50,000." },
      { status: 400 },
    );
  }
  if (edition && edition.length > 120) {
    return NextResponse.json({ error: "Edition is too long." }, { status: 400 });
  }
  if (year && year.length > 32) {
    return NextResponse.json({ error: "Year is too long." }, { status: 400 });
  }
  if (description && description.length > 4000) {
    return NextResponse.json({ error: "Description is too long." }, { status: 400 });
  }

  try {
    const { id } = await insertBook({
      userId: session.user.id,
      title,
      author,
      edition,
      year,
      price: Math.round(price * 100) / 100,
      condition,
      category,
      image,
      description,
    });
    return NextResponse.json({ id }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Could not save listing. Try again." },
      { status: 500 },
    );
  }
}
