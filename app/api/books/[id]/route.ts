import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { deleteBookForOwner } from "@/lib/books-db";

type RouteParams = { params: Promise<{ id: string }> };

export async function DELETE(_request: Request, { params }: RouteParams) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const ok = await deleteBookForOwner(id, session.user.id);

  if (!ok) {
    return NextResponse.json(
      { error: "Listing not found or you do not own it." },
      { status: 404 },
    );
  }

  return NextResponse.json({ ok: true });
}
