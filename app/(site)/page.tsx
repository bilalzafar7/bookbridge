import Image from "next/image";
import Link from "next/link";
import { BookCard } from "@/components/bookswap/book-card";
import { IconPlus, IconSearch, IconShield } from "@/components/bookswap/icons";
import { books } from "@/lib/mock-books";

const heroBooks =
  "https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&w=960&q=85";

const proBooks =
  "https://images.unsplash.com/photo-1516979187457-10eb88d2333e?auto=format&fit=crop&w=800&q=85";

export default function HomePage() {
  const featured = books[1];
  const grid = [books[2], books[3], books[4], books[5]];

  return (
    <>
      <section className="border-b border-slate-200 bg-slate-100/80">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2 md:items-center md:px-6 lg:py-20">
          <div>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 md:text-4xl lg:text-[2.5rem] lg:leading-[1.15]">
              The smarter way to swap textbooks on campus.
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-600">
              Join thousands of students saving money and reducing waste by
              trading directly with their peers. No middleman, no markups.
            </p>
            <form
              className="mt-8 flex w-full max-w-xl items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
              action="/browse"
            >
              <IconSearch className="shrink-0 text-slate-400" />
              <input
                name="q"
                type="search"
                placeholder="Search books by title or author"
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                aria-label="Search books"
              />
            </form>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
              <span className="text-slate-500">Popular:</span>
              {["Biology", "Calculus", "Psychology"].map((tag) => (
                <Link
                  key={tag}
                  href="/browse"
                  className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 transition hover:bg-blue-100"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md md:max-w-none">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-cyan-100 shadow-lg ring-1 ring-slate-200/60">
              <Image
                src={heroBooks}
                alt="Student reading a textbook in a bright campus library"
                fill
                className="object-cover"
                priority
                sizes="(max-width:768px) 100vw, 400px"
              />
            </div>
            <div className="absolute -bottom-2 left-4 flex max-w-[240px] items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-lg md:left-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-lg text-white">
                📚
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  500+ New listings
                </p>
                <p className="text-xs text-slate-500">Added today</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Recently Listed
            </h2>
            <p className="text-sm text-slate-600">
              Fresh arrivals from students at your university
            </p>
          </div>
          <Link
            href="/browse"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            Browse all →
          </Link>
        </div>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-10">
          <div className="flex min-h-0 lg:w-[46%] lg:max-w-xl lg:shrink-0">
            <BookCard book={featured} variant="large" />
          </div>
          <div className="grid flex-1 gap-6 sm:grid-cols-2 sm:gap-6 lg:gap-7">
            {grid.map((b) => (
              <BookCard key={b.id} book={b} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-600 py-14 text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-4 md:flex-row md:items-center md:justify-between md:px-6">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold md:text-3xl">
              Done with your semester?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-blue-100 md:text-base">
              Turn your old textbooks into cash or swap them for next
              semester&apos;s reading list. It takes less than 2 minutes to list
              a book.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
            <Link
              href="/sell"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-sm transition hover:bg-blue-50"
            >
              <IconPlus />
              List Your Book Now
            </Link>
            <Link
              href="#how"
              className="inline-flex items-center justify-center rounded-xl border-2 border-white px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              How it works
            </Link>
          </div>
        </div>
      </section>

      <section id="how" className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <IconShield className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Verified Students
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Every user is verified via their campus email, ensuring a safe and
              trusted environment for trading.
            </p>
          </div>
          <div>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <span className="text-xl" aria-hidden>
                💳
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Zero Platform Fees
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              We don&apos;t take a cut. Keep 100% of the price you set when you
              sell directly to another student.
            </p>
          </div>
          <div>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <span className="text-xl" aria-hidden>
                📍
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Campus Meetups
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Coordinate safe meetups at the library or student union. No
              shipping delays, no shipping costs.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 md:grid-cols-2 md:px-6">
          <div className="relative aspect-square max-h-64 overflow-hidden rounded-xl bg-slate-100 md:max-h-none">
            <Image
              src={proBooks}
              alt="Desk with textbooks and notes for studying"
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 400px"
            />
          </div>
          <div className="rounded-xl bg-blue-50 p-6 md:p-8">
            <h3 className="text-lg font-bold text-slate-900">
              Pro tip for quick sales
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              Most students search for books during the first two weeks of the
              semester. Price your book competitively (typically 40–50% off
              retail) to ensure it sells fast.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
