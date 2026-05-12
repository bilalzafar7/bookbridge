"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IconTrash } from "@/components/bookswap/icons";
import { conditionBadgeClass, formatPrice } from "@/components/bookswap/styles";
import type { BookListing } from "@/lib/types";

export function DashboardListingCard({ book }: { book: BookListing }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    if (!window.confirm("Remove this listing from BookSwap?")) return;
    setError(null);
    setPending(true);
    try {
      const res = await fetch(`/api/books/${book.id}`, { method: "DELETE" });
      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setError(data.error ?? "Could not delete.");
        return;
      }

      router.refresh();
    } catch {
      setError("Network error.");
    } finally {
      setPending(false);
    }
  }

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <Link href={`/books/${book.id}`} className="block">
        <div className="relative aspect-[3/4] bg-slate-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={book.image}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <span className="absolute right-2 top-2 rounded-lg bg-blue-600 px-2 py-1 text-xs font-semibold text-white">
            {formatPrice(book.price)}
          </span>
        </div>
      </Link>
      <div className="p-4">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-700">
            {book.category}
          </span>
          <span
            className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${conditionBadgeClass(book.condition)}`}
          >
            {book.condition}
          </span>
        </div>
        <Link href={`/books/${book.id}`}>
          <h3 className="mt-2 line-clamp-2 text-base font-bold text-slate-900 hover:text-blue-700">
            {book.title}
          </h3>
        </Link>
        <p className="mt-1 text-xs text-slate-500">
          {book.edition ? `${book.edition} · ` : ""}
          {book.author}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
          <span className="text-xs text-slate-500">
            Posted {book.postedAt ?? "recently"}
          </span>
          <button
            type="button"
            disabled={pending}
            onClick={(e) => {
              e.preventDefault();
              void handleDelete();
            }}
            className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:opacity-60"
            aria-label="Delete listing"
          >
            <IconTrash className="h-3.5 w-3.5" />
            Delete
          </button>
        </div>
        {error ? (
          <p className="mt-2 text-xs text-red-600" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </article>
  );
}
