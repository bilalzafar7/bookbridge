import Link from "next/link";

export default function BookNotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <h1 className="text-xl font-bold text-slate-900">Book not found</h1>
      <p className="mt-2 text-sm text-slate-600">
        This listing may have been removed or the link is incorrect.
      </p>
      <Link
        href="/browse"
        className="mt-6 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700"
      >
        Back to Browse
      </Link>
    </div>
  );
}
