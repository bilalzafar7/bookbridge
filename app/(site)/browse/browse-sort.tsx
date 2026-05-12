"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import type { BrowseSort } from "@/lib/browse-params";

const OPTIONS: { value: BrowseSort; label: string }[] = [
  { value: "newest", label: "Newest arrivals" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export function BrowseSortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const current = (searchParams.get("sort") as BrowseSort | null) ?? "newest";
  const value = OPTIONS.some((o) => o.value === current)
    ? current
    : "newest";

  const pushSort = useCallback(
    (sort: BrowseSort) => {
      const p = new URLSearchParams(searchParams.toString());
      p.delete("page");
      if (sort === "newest") p.delete("sort");
      else p.set("sort", sort);
      const q = p.toString();
      router.replace(q ? `${pathname}?${q}` : pathname);
    },
    [pathname, router, searchParams],
  );

  return (
    <label className="flex items-center gap-2 text-sm text-slate-600">
      <span className="shrink-0">Sort by:</span>
      <select
        value={value}
        onChange={(e) => pushSort(e.target.value as BrowseSort)}
        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
      >
        {OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
