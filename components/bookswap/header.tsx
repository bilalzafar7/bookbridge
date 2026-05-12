"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { IconSearch } from "./icons";
import { BookswapUserNav } from "./user-nav";

export function BookswapHeader() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const canSell = status === "authenticated" && !!session?.user;
  const browseActive =
    pathname === "/" ||
    pathname.startsWith("/browse") ||
    pathname.startsWith("/books");
  const sellActive = pathname.startsWith("/sell");
  const showBrowseSearch = pathname === "/browse";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-3 md:px-6">
        <div className="relative flex min-h-10 items-center justify-between">
          <Link
            href="/"
            className="relative z-10 shrink-0 text-xl font-bold tracking-tight text-blue-600"
          >
            BookSwap
          </Link>

          <nav className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-6 text-sm font-medium text-slate-600">
            <Link
              href="/browse"
              className={
                browseActive
                  ? "border-b-2 border-blue-600 pb-0.5 text-blue-600"
                  : "hover:text-slate-900"
              }
            >
              Browse
            </Link>
            {canSell ? (
              <Link
                href="/sell"
                className={
                  sellActive
                    ? "border-b-2 border-blue-600 pb-0.5 text-blue-600"
                    : "hover:text-slate-900"
                }
              >
                Sell
              </Link>
            ) : (
              <span
                className="cursor-not-allowed border-b-2 border-transparent pb-0.5 text-slate-400"
                title="Log in to list a book for sale"
                aria-disabled="true"
              >
                Sell
              </span>
            )}
          </nav>

          <div className="relative z-10 flex shrink-0 items-center gap-2 md:gap-3">
            <BookswapUserNav />
          </div>
        </div>

        {showBrowseSearch ? (
          <div className="mx-auto mt-3 flex max-w-xl justify-center md:mt-4">
            <div className="flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
              <IconSearch className="shrink-0 text-slate-400" />
              <input
                type="search"
                placeholder="Search textbooks..."
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                aria-label="Search textbooks"
              />
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
