/** Allowed `category` values — aligned with browse filters & seeded data. */
export const BOOK_CATEGORIES = [
  "Economics",
  "Science",
  "Computer Science",
  "Biology",
  "Mathematics",
  "Sociology",
  "Political Science",
  "Psychology",
  "Engineering",
] as const;

export type BookCategory = (typeof BOOK_CATEGORIES)[number];
