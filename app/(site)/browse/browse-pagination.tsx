import type { ReactNode } from "react";
import Link from "next/link";
import {
  buildBrowseUrl,
  type BrowseSort,
  type ParsedBrowseParams,
} from "@/lib/browse-params";
import type { BookCondition } from "@/lib/types";

type FilterSlice = {
  categoryKeys: ParsedBrowseParams["categoryKeys"];
  condition?: BookCondition;
  maxPrice: number;
  sort: BrowseSort;
};

export function BrowsePagination({
  page,
  totalPages,
  filters,
}: {
  page: number;
  totalPages: number;
  filters: FilterSlice;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
      aria-label="Pagination"
    >
      <PaginationLink
        href={buildBrowseUrl({ ...filters, page: page - 1 })}
        disabled={page <= 1}
        ariaLabel="Previous page"
      >
        ← Prev
      </PaginationLink>

      <div className="flex flex-wrap items-center justify-center gap-1">
        {pages.map((n) => (
          <Link
            key={n}
            href={buildBrowseUrl({ ...filters, page: n })}
            className={`min-w-[2.25rem] rounded-lg px-3 py-2 text-center text-sm font-semibold ${
              n === page
                ? "bg-blue-600 text-white"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {n}
          </Link>
        ))}
      </div>

      <PaginationLink
        href={buildBrowseUrl({ ...filters, page: page + 1 })}
        disabled={page >= totalPages}
        ariaLabel="Next page"
      >
        Next →
      </PaginationLink>

      <span className="ml-2 text-sm text-slate-500">
        Page {page} of {totalPages}
      </span>
    </nav>
  );
}

function PaginationLink({
  href,
  disabled,
  children,
  ariaLabel,
}: {
  href: string;
  disabled: boolean;
  children: ReactNode;
  ariaLabel: string;
}) {
  if (disabled) {
    return (
      <span
        className="cursor-not-allowed rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-400"
        aria-disabled="true"
      >
        {children}
      </span>
    );
  }
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
    >
      {children}
    </Link>
  );
}
