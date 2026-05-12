import Link from "next/link";
import type { BookListing } from "@/lib/types";
import { conditionBadgeClass, formatPrice } from "./styles";

type Props = {
  book: BookListing;
  href?: string;
  /** Larger hero card on home */
  variant?: "default" | "large";
  ctaLabel?: string;
};

export function BookCard({
  book,
  href = `/books/${book.id}`,
  variant = "default",
  ctaLabel = "View Details",
}: Props) {
  const isLarge = variant === "large";

  return (
    <article
      className={`group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-900/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-slate-900/10 ${
        isLarge ? "lg:min-h-0" : ""
      }`}
    >
      <Link
        href={href}
        className={`relative block w-full overflow-hidden bg-slate-100 ${
          isLarge ? "aspect-[16/10]" : "aspect-[3/4]"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- listings may use arbitrary HTTPS image URLs */}
        <img
          src={book.image}
          alt={book.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/45 via-transparent to-transparent opacity-90"
          aria-hidden
        />
        <span className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-sm font-bold tabular-nums text-slate-900 shadow-md backdrop-blur-sm">
          {formatPrice(book.price)}
        </span>
        {book.postedAt ? (
          <span className="absolute bottom-3 left-3 rounded-md bg-black/35 px-2 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
            {book.postedAt}
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col p-4 md:p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${conditionBadgeClass(book.condition)}`}
          >
            {book.condition}
          </span>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
            {book.category}
          </span>
        </div>
        <h3
          className={`font-bold tracking-tight text-slate-900 ${
            isLarge
              ? "text-xl leading-snug md:text-2xl"
              : "line-clamp-2 text-sm leading-snug md:text-[15px]"
          }`}
        >
          {book.title}
        </h3>
        <p className="mt-1.5 text-xs text-slate-500 md:text-sm">
          {book.author}
          {book.edition ? ` · ${book.edition}` : ""}
          {book.year ? ` (${book.year})` : ""}
        </p>

        <div className="mt-auto pt-5">
          <Link
            href={href}
            className="flex w-full items-center justify-center rounded-xl bg-blue-600 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}
