"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { BookCondition } from "@/lib/types";

type CatKey = "cs" | "econ" | "eng";

function parseCats(searchParams: URLSearchParams): CatKey[] {
  const raw = searchParams.get("cat") ?? "";
  return raw
    .split(",")
    .filter((k): k is CatKey => k === "cs" || k === "econ" || k === "eng");
}

function MaxPriceSlider({
  maxFromUrl,
  replaceQuery,
}: {
  maxFromUrl: number;
  replaceQuery: (mutate: (p: URLSearchParams) => void) => void;
}) {
  const [maxLocal, setMaxLocal] = useState(maxFromUrl);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  function pushMaxPrice(value: number) {
    replaceQuery((p) => {
      if (value >= 200) p.delete("max");
      else p.set("max", String(value));
    });
  }

  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);

  function scheduleMaxCommit(value: number) {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => pushMaxPrice(value), 350);
  }

  return (
    <>
      <input
        type="range"
        min={0}
        max={200}
        value={maxLocal}
        onChange={(e) => {
          const v = Number(e.target.value);
          setMaxLocal(v);
          scheduleMaxCommit(v);
        }}
        className="mt-4 w-full accent-blue-600"
        aria-valuemin={0}
        aria-valuemax={200}
        aria-valuenow={maxLocal}
        aria-label="Maximum price"
      />
      <div className="mt-1 flex justify-between text-xs text-slate-500">
        <span>$0</span>
        <span className="font-medium text-slate-700">
          ${maxLocal}
          {maxLocal >= 200 ? "+" : ""}
        </span>
        <span>$200+</span>
      </div>
    </>
  );
}

export function BrowseFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedCats = parseCats(searchParams);
  const allSubjects = selectedCats.length === 0;

  const condParam = searchParams.get("cond") as BookCondition | null;
  const condition: BookCondition | "any" =
    condParam &&
    (["New", "Like New", "Used", "Good"] as const).includes(
      condParam as BookCondition,
    )
      ? condParam
      : "any";

  const maxFromUrl = Math.min(
    200,
    Math.max(0, parseInt(searchParams.get("max") ?? "200", 10) || 200),
  );

  function replaceQuery(mutate: (p: URLSearchParams) => void) {
    const p = new URLSearchParams(searchParams.toString());
    p.delete("page");
    mutate(p);
    const q = p.toString();
    router.replace(q ? `${pathname}?${q}` : pathname);
  }

  function toggleCat(key: "all" | CatKey) {
    replaceQuery((p) => {
      if (key === "all") {
        p.delete("cat");
        return;
      }
      const current = parseCats(p);
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      const arr = [...next];
      if (arr.length === 0) p.delete("cat");
      else p.set("cat", arr.sort().join(","));
    });
  }

  function setCondition(next: BookCondition | "any") {
    replaceQuery((p) => {
      if (next === "any") p.delete("cond");
      else p.set("cond", next);
    });
  }

  function reset() {
    router.replace(pathname);
  }

  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900">Filters</h2>

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Category
        </p>
        <ul className="mt-3 space-y-2">
          {(
            [
              ["all", "All Subjects"],
              ["cs", "Computer Science"],
              ["econ", "Economics"],
              ["eng", "Engineering"],
            ] as const
          ).map(([key, label]) => (
            <li key={key}>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={key === "all" ? allSubjects : selectedCats.includes(key)}
                  onChange={() => toggleCat(key)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                {label}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Max price
        </p>
        <MaxPriceSlider
          key={searchParams.get("max") ?? "200"}
          maxFromUrl={maxFromUrl}
          replaceQuery={replaceQuery}
        />
      </div>

      <div className="mt-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Condition
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {(["Any", "New", "Like New", "Used", "Good"] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() =>
                setCondition(c === "Any" ? "any" : (c as BookCondition))
              }
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                (c === "Any" && condition === "any") ||
                (c !== "Any" && condition === c)
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={reset}
        className="mt-8 w-full rounded-xl bg-blue-50 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
      >
        Reset all filters
      </button>
    </aside>
  );
}
