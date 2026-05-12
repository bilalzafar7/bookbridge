import Link from "next/link";
import type { BookListing } from "@/lib/types";

export function RelatedBySeller({ books }: { books: BookListing[] }) {
  return (
    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {books.map((b) => (
        <Link
          key={b.id}
          href={`/books/${b.id}`}
          className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
        >
          <div className="relative aspect-[3/4] bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={b.image}
              alt=""
              className="h-full w-full object-cover transition group-hover:scale-[1.02]"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <span className="absolute right-2 top-2 rounded-md bg-blue-600 px-2 py-0.5 text-xs font-bold text-white">
              ${Math.round(b.price)}
            </span>
          </div>
          <div className="p-3">
            <p className="line-clamp-2 text-sm font-bold text-slate-900">
              {b.title}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Condition: {b.condition}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
