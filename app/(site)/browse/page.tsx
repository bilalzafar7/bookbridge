import { Suspense } from "react";
import { BookCard } from "@/components/bookswap/book-card";
import { parseBrowseSearchParams } from "@/lib/browse-params";
import { queryBrowseBooks } from "@/lib/books-db";
import { BrowseFilters } from "./browse-filters";
import { BrowsePagination } from "./browse-pagination";
import { BrowseSortSelect } from "./browse-sort";

export const dynamic = "force-dynamic";

function FiltersAsideFallback() {
  return (
    <div className="h-[28rem] animate-pulse rounded-xl border border-slate-200 bg-slate-100/80 lg:w-64" />
  );
}

function SortFallback() {
  return (
    <div className="h-10 w-full max-w-xs animate-pulse rounded-lg bg-slate-100 sm:ml-auto" />
  );
}

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const parsed = parseBrowseSearchParams(sp);

  const result = await queryBrowseBooks({
    page: parsed.page,
    pageSize: 9,
    categoryKeys: parsed.categoryKeys,
    condition: parsed.condition,
    maxPrice: parsed.maxPrice,
    sort: parsed.sort,
  });

  const { books, total, page, totalPages } = result;
  const start = total === 0 ? 0 : (page - 1) * 9 + 1;
  const end = total === 0 ? 0 : start + books.length - 1;

  const filterProps = {
    categoryKeys: parsed.categoryKeys,
    condition: parsed.condition,
    maxPrice: parsed.maxPrice,
    sort: parsed.sort,
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="shrink-0 lg:w-64">
          <Suspense fallback={<FiltersAsideFallback />}>
            <BrowseFilters />
          </Suspense>
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
                Browse Textbooks
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                {total === 0
                  ? "No textbooks match your filters."
                  : `Showing ${start}–${end} of ${total.toLocaleString()} book${total === 1 ? "" : "s"}`}
              </p>
            </div>
            <Suspense fallback={<SortFallback />}>
              <BrowseSortSelect />
            </Suspense>
          </div>

          {total === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/80 px-6 py-14 text-center">
              <p className="text-sm font-medium text-slate-700">
                No listings match these filters.
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Try resetting filters or widening the price range. If the
                database is empty, run{" "}
                <code className="rounded bg-white px-1.5 py-0.5 font-mono text-xs text-slate-800 ring-1 ring-slate-200">
                  npm run seed:books
                </code>
                .
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}

          <BrowsePagination
            page={page}
            totalPages={totalPages}
            filters={filterProps}
          />
        </div>
      </div>
    </div>
  );
}
