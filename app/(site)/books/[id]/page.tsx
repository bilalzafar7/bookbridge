import Link from "next/link";
import { notFound } from "next/navigation";
import { BookGallery } from "./book-gallery";
import { IconArrowLeft } from "@/components/bookswap/icons";
import { RelatedBySeller } from "./related-by-seller";
import { conditionPillClass, formatPrice } from "@/components/bookswap/styles";
import {
  getBookListingForPage,
  getRelatedForBook,
} from "@/lib/books-db";

type Props = { params: Promise<{ id: string }> };

export default async function BookDetailPage({ params }: Props) {
  const { id } = await params;
  const book = await getBookListingForPage(id);
  if (!book) notFound();

  const related = await getRelatedForBook(book);

  const byLine = book.edition
    ? `by ${book.author} · ${book.edition}`
    : `by ${book.author}`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8">
      <nav className="mb-6 text-xs text-slate-500">
        <Link href="/browse" className="hover:text-blue-600">
          Browse
        </Link>
        <span className="mx-1.5">›</span>
        <span>Textbooks</span>
        <span className="mx-1.5">›</span>
        <span className="text-slate-700">Book Details</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
        <BookGallery image={book.image} title={book.title} />

        <div>
          <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            {book.category}
          </span>
          <div className="mt-3 flex flex-wrap items-baseline gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              {book.title}
            </h1>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <span className="text-3xl font-bold text-blue-600">
              {formatPrice(book.price)}
            </span>
            <span
              className={`rounded-md px-2.5 py-1 text-xs font-semibold ${conditionPillClass(book.condition)}`}
            >
              {book.condition}
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-600">{byLine}</p>

          <div className="mt-8">
            <h2 className="text-sm font-bold text-slate-900">Book Description</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {book.description ??
                `${book.title} is listed in ${book.condition} condition. Message the seller for more photos or to arrange a campus meetup.`}
            </p>
          </div>

          <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-600">
                <span className="text-lg" aria-hidden>
                  👤
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-900">
                  {book.seller.name}
                </p>
                <p className="text-sm text-amber-900/90">
                  ⭐ {book.seller.rating.toFixed(1)} ({book.seller.trades}{" "}
                  trades)
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/browse"
              className="inline-flex w-full min-w-[200px] items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 sm:w-auto"
            >
              <IconArrowLeft className="h-4 w-4 shrink-0" />
              Browse other books
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-12 flex gap-4 rounded-xl bg-blue-600 p-6 text-white md:p-8">
        <div className="shrink-0 text-white/90">
          <IconShieldWhite />
        </div>
        <div>
          <h2 className="text-lg font-bold">Safe Swap Guarantee</h2>
          <p className="mt-2 text-sm leading-relaxed text-blue-100">
            Transactions can be held in escrow: the seller is paid only after you
            confirm the book&apos;s condition. Meet on campus with confidence.
          </p>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-14">
          <h2 className="text-xl font-bold text-slate-900">
            Other books by {book.seller.name.split(" ")[0]}
          </h2>
          <RelatedBySeller books={related} />
        </section>
      ) : null}
    </div>
  );
}

function IconShieldWhite() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
