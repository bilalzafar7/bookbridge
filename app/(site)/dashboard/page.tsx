import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { listBooksByOwner } from "@/lib/books-db";
import { DashboardListingCard } from "./dashboard-listing-card";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/dashboard");
  }

  const displayName =
    session.user.name?.trim() ||
    session.user.email?.split("@")[0] ||
    "there";

  const listings = await listBooksByOwner(session.user.id);
  const activeCount = listings.length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
      <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
        Welcome back, {displayName}
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        Manage your textbook listings on BookSwap.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-500">Active Listings</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">{activeCount}</p>
          <span
            className="absolute right-4 top-4 text-2xl text-blue-600"
            aria-hidden
          >
            📘
          </span>
        </div>
        <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-500">Books Sold</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">—</p>
          <span
            className="absolute right-4 top-4 text-2xl text-orange-500"
            aria-hidden
          >
            🏷️
          </span>
        </div>
        <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-500">Pending Requests</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">—</p>
          <span
            className="absolute right-4 top-4 text-2xl text-blue-600"
            aria-hidden
          >
            💬
          </span>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold text-slate-900">My Listings</h2>
        <Link
          href="/sell"
          className="inline-flex w-fit items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          + List New Book
        </Link>
      </div>

      {listings.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-slate-200 bg-slate-50/80 px-6 py-12 text-center">
          <p className="text-sm font-medium text-slate-700">
            You don&apos;t have any listings yet.
          </p>
          <p className="mt-2 text-sm text-slate-500">
            <Link href="/sell" className="font-semibold text-blue-600 hover:underline">
              List your first book
            </Link>{" "}
            to appear here and on Browse.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((book) => (
            <DashboardListingCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
