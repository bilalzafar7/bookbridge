"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BOOK_CATEGORIES } from "@/lib/book-categories";
import type { BookCondition } from "@/lib/types";
import { IconArrowRight } from "@/components/bookswap/icons";

const CONDITIONS: BookCondition[] = ["New", "Like New", "Used", "Good"];

export function SellBookForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [edition, setEdition] = useState("");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState<BookCondition | "">("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);

    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image,
          title,
          author,
          edition: edition.trim() || undefined,
          year: year.trim() || undefined,
          category,
          condition,
          price: parseFloat(price),
          description: description.trim() || undefined,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        id?: string;
      };

      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        setPending(false);
        return;
      }

      if (data.id) {
        router.push(`/books/${data.id}`);
        router.refresh();
        return;
      }

      setError("Unexpected response.");
      setPending(false);
    } catch {
      setError("Network error. Try again.");
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-8 space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
    >
      <div>
        <label
          htmlFor="sell-image"
          className="text-xs font-semibold text-slate-700"
        >
          Cover image URL <span className="text-red-600">*</span>
        </label>
        <input
          id="sell-image"
          type="url"
          required
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://images.unsplash.com/..."
          className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none ring-blue-500 focus:ring-2"
          autoComplete="off"
        />
        <p className="mt-1 text-xs text-slate-500">
          Paste a direct link to a JPG or PNG (e.g. Unsplash or your host). Must
          start with http:// or https://
        </p>
        {image.trim() && (
          <div className="relative mt-3 aspect-[3/4] max-h-56 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary seller URLs */}
            <img
              src={image.trim()}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={(ev) => {
                (ev.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            htmlFor="sell-title"
            className="text-xs font-semibold text-slate-700"
          >
            Book title <span className="text-red-600">*</span>
          </label>
          <input
            id="sell-title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none ring-blue-500 focus:ring-2"
            placeholder="e.g. Fundamentals of Physics"
            maxLength={240}
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="sell-author"
            className="text-xs font-semibold text-slate-700"
          >
            Author <span className="text-red-600">*</span>
          </label>
          <input
            id="sell-author"
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none ring-blue-500 focus:ring-2"
            placeholder="e.g. Halliday, Resnick"
            maxLength={200}
          />
        </div>
        <div>
          <label
            htmlFor="sell-edition"
            className="text-xs font-semibold text-slate-700"
          >
            Edition <span className="font-normal text-slate-500">(optional)</span>
          </label>
          <input
            id="sell-edition"
            value={edition}
            onChange={(e) => setEdition(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none ring-blue-500 focus:ring-2"
            placeholder="e.g. 11th Edition"
            maxLength={120}
          />
        </div>
        <div>
          <label
            htmlFor="sell-year"
            className="text-xs font-semibold text-slate-700"
          >
            Year <span className="font-normal text-slate-500">(optional)</span>
          </label>
          <input
            id="sell-year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none ring-blue-500 focus:ring-2"
            placeholder="e.g. 2023"
            maxLength={32}
          />
        </div>
        <div>
          <label
            htmlFor="sell-category"
            className="text-xs font-semibold text-slate-700"
          >
            Category <span className="text-red-600">*</span>
          </label>
          <select
            id="sell-category"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none ring-blue-500 focus:ring-2"
          >
            <option value="">Select a category</option>
            {BOOK_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="sell-condition"
            className="text-xs font-semibold text-slate-700"
          >
            Condition <span className="text-red-600">*</span>
          </label>
          <select
            id="sell-condition"
            required
            value={condition}
            onChange={(e) =>
              setCondition(e.target.value as BookCondition | "")
            }
            className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none ring-blue-500 focus:ring-2"
          >
            <option value="">Select condition</option>
            {CONDITIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="sell-price"
            className="text-xs font-semibold text-slate-700"
          >
            Price (USD) <span className="text-red-600">*</span>
          </label>
          <div className="mt-1.5 flex rounded-lg border border-slate-200 focus-within:ring-2 focus-within:ring-blue-500">
            <span className="flex items-center border-r border-slate-200 bg-slate-50 px-3 text-sm text-slate-600">
              $
            </span>
            <input
              id="sell-price"
              required
              min={0}
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="min-w-0 flex-1 border-0 bg-transparent px-3 py-2.5 text-sm outline-none"
              placeholder="0.00"
              inputMode="decimal"
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="sell-description"
            className="text-xs font-semibold text-slate-700"
          >
            Description{" "}
            <span className="font-normal text-slate-500">(optional)</span>
          </label>
          <textarea
            id="sell-description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1.5 w-full resize-y rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none ring-blue-500 focus:ring-2"
            placeholder="Condition notes, highlights, access codes, etc."
            maxLength={4000}
          />
        </div>
      </div>

      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <div className="flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-sm text-slate-600">
          <span className="text-blue-600" aria-hidden>
            🛡️
          </span>
          Your listing is tied to your account and appears on Browse.
        </p>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-70"
        >
          {pending ? "Publishing…" : "List book"}
          <IconArrowRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
