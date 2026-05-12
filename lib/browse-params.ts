import type { BookCondition } from "./types";

export type BrowseSort = "newest" | "price-asc" | "price-desc";

export type ParsedBrowseParams = {
  page: number;
  categoryKeys: ("cs" | "econ" | "eng")[];
  condition?: BookCondition;
  maxPrice: number;
  sort: BrowseSort;
};

const CONDITIONS: BookCondition[] = ["New", "Like New", "Used", "Good"];

function firstString(
  v: string | string[] | undefined,
): string | undefined {
  if (typeof v === "string") return v;
  if (Array.isArray(v) && v[0]) return v[0];
  return undefined;
}

export function parseBrowseSearchParams(
  sp: Record<string, string | string[] | undefined>,
): ParsedBrowseParams {
  const pageRaw = firstString(sp.page);
  const page = Math.max(1, parseInt(pageRaw ?? "1", 10) || 1);

  const catRaw = firstString(sp.cat) ?? "";
  const categoryKeys = catRaw
    .split(",")
    .filter((k): k is "cs" | "econ" | "eng" =>
      k === "cs" || k === "econ" || k === "eng",
    );

  const condRaw = firstString(sp.cond);
  const condition =
    condRaw && CONDITIONS.includes(condRaw as BookCondition)
      ? (condRaw as BookCondition)
      : undefined;

  const maxRaw = firstString(sp.max);
  const maxPrice = Math.min(
    200,
    Math.max(0, parseInt(maxRaw ?? "200", 10) || 200),
  );

  const sortRaw = firstString(sp.sort) ?? "newest";
  const sort: BrowseSort =
    sortRaw === "price-asc" || sortRaw === "price-desc"
      ? sortRaw
      : "newest";

  return { page, categoryKeys, condition, maxPrice, sort };
}

/** Full `/browse` URL with filters (omit default-ish params to keep URLs short). */
export function buildBrowseUrl(state: {
  page: number;
  categoryKeys: ("cs" | "econ" | "eng")[];
  condition?: BookCondition;
  maxPrice: number;
  sort: BrowseSort;
}): string {
  const params = new URLSearchParams();

  if (state.page > 1) params.set("page", String(state.page));
  if (state.categoryKeys.length > 0) {
    params.set("cat", state.categoryKeys.join(","));
  }
  if (state.condition) params.set("cond", state.condition);
  if (state.maxPrice !== 200) params.set("max", String(state.maxPrice));
  if (state.sort !== "newest") params.set("sort", state.sort);

  const q = params.toString();
  return q ? `/browse?${q}` : "/browse";
}
