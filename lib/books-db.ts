import { ObjectId, type Filter, type Sort } from "mongodb";
import { booksBySeller, getBookById as getMockBookById } from "./mock-books";
import type { BrowseSort } from "./browse-params";
import type { BookCondition, BookListing } from "./types";
import { getDb } from "./mongodb";

const PAGE_SIZE_DEFAULT = 9;

const CATEGORY_FILTER_MAP: Record<string, string> = {
  cs: "Computer Science",
  econ: "Economics",
  eng: "Engineering",
};

const COLLECTION = "books";

/** Stored book row — only `userId` references the seller account. */
export type BookDocument = {
  _id: ObjectId;
  userId: ObjectId;
  title: string;
  author: string;
  edition?: string;
  year?: string;
  price: number;
  condition: BookCondition;
  category: string;
  image: string;
  description?: string;
  createdAt: Date;
};

type UserProj = {
  _id: ObjectId;
  name?: string | null;
  email?: string | null;
};

type SellerInfo = BookListing["seller"];

function isObjectIdString(id: string): boolean {
  return /^[a-f0-9]{24}$/i.test(id) && ObjectId.isValid(id);
}

function formatPostedAt(d: Date): string {
  const diffMs = Date.now() - d.getTime();
  const sec = Math.floor(diffMs / 1000);
  if (sec < 60) return "Just now";
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} min ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return hr === 1 ? "1 hour ago" : `${hr} hours ago`;
  const days = Math.floor(hr / 24);
  if (days === 1) return "1 day ago";
  if (days < 7) return `${days} days ago`;
  if (days < 14) return "1 week ago";
  return `${Math.floor(days / 7)} weeks ago`;
}

function userDocToSeller(u: UserProj): SellerInfo {
  const name =
    (typeof u.name === "string" && u.name.trim()) ||
    (typeof u.email === "string" && u.email.split("@")[0]) ||
    "Seller";
  return { name, rating: 5, trades: 0 };
}

async function buildSellerMap(
  userIds: ObjectId[],
): Promise<Map<string, SellerInfo>> {
  const unique = [...new Map(userIds.map((id) => [id.toString(), id])).values()];
  const map = new Map<string, SellerInfo>();
  if (unique.length === 0) return map;

  const db = await getDb();
  const users = (await db
    .collection("users")
    .find({ _id: { $in: unique } })
    .project({ name: 1, email: 1 })
    .toArray()) as UserProj[];

  for (const u of users) {
    map.set(u._id.toHexString(), userDocToSeller(u));
  }
  return map;
}

function docToListing(
  doc: BookDocument,
  sellerMap: Map<string, SellerInfo>,
): BookListing {
  const seller =
    sellerMap.get(doc.userId.toHexString()) ?? {
      name: "Seller",
      rating: 5,
      trades: 0,
    };

  return {
    id: doc._id.toHexString(),
    title: doc.title,
    author: doc.author,
    edition: doc.edition,
    year: doc.year,
    price: doc.price,
    condition: doc.condition,
    category: doc.category,
    image: doc.image,
    description: doc.description,
    seller,
    postedAt: formatPostedAt(doc.createdAt),
  };
}

function buildBrowseFilter(input: {
  categoryKeys: string[];
  condition?: BookCondition;
  maxPrice: number;
}): Filter<BookDocument> {
  const filter: Filter<BookDocument> = {
    price: { $lte: input.maxPrice },
  };

  const categories = [
    ...new Set(
      input.categoryKeys
        .map((k) => CATEGORY_FILTER_MAP[k])
        .filter((c): c is string => Boolean(c)),
    ),
  ];
  if (categories.length > 0) {
    filter.category = { $in: categories };
  }

  if (input.condition) {
    filter.condition = input.condition;
  }

  return filter;
}

function browseSort(sort: BrowseSort): Sort {
  switch (sort) {
    case "price-asc":
      return { price: 1, createdAt: -1 };
    case "price-desc":
      return { price: -1, createdAt: -1 };
    default:
      return { createdAt: -1 };
  }
}

export async function queryBrowseBooks(input: {
  page: number;
  pageSize?: number;
  categoryKeys: string[];
  condition?: BookCondition;
  maxPrice: number;
  sort: BrowseSort;
}): Promise<{
  books: BookListing[];
  total: number;
  page: number;
  totalPages: number;
}> {
  const pageSize = input.pageSize ?? PAGE_SIZE_DEFAULT;
  const filter = buildBrowseFilter({
    categoryKeys: input.categoryKeys,
    condition: input.condition,
    maxPrice: input.maxPrice,
  });

  const db = await getDb();
  const coll = db.collection<BookDocument>(COLLECTION);

  const total = await coll.countDocuments(filter);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.min(Math.max(1, input.page), totalPages);
  const skip = (page - 1) * pageSize;

  const docs = await coll
    .find(filter)
    .sort(browseSort(input.sort))
    .skip(skip)
    .limit(pageSize)
    .toArray();

  const sellerMap = await buildSellerMap(docs.map((d) => d.userId));
  const books = docs.map((d) => docToListing(d, sellerMap));

  return { books, total, page, totalPages };
}

export async function findBookInDb(id: string): Promise<BookListing | null> {
  if (!isObjectIdString(id)) return null;
  const db = await getDb();
  const doc = await db
    .collection<BookDocument>(COLLECTION)
    .findOne({ _id: new ObjectId(id) });
  if (!doc) return null;

  const sellerMap = await buildSellerMap([doc.userId]);
  return docToListing(doc, sellerMap);
}

export async function findSellerUserIdForBook(
  bookId: string,
): Promise<string | null> {
  if (!isObjectIdString(bookId)) return null;
  const db = await getDb();
  const doc = await db
    .collection<BookDocument>(COLLECTION)
    .findOne({ _id: new ObjectId(bookId) }, { projection: { userId: 1 } });
  return doc?.userId?.toHexString() ?? null;
}

export async function findRelatedBooksFromDb(
  ownerUserId: string,
  excludeBookId: string,
  limit: number,
): Promise<BookListing[]> {
  if (!isObjectIdString(ownerUserId) || !isObjectIdString(excludeBookId)) {
    return [];
  }
  const db = await getDb();
  const docs = await db
    .collection<BookDocument>(COLLECTION)
    .find({
      userId: new ObjectId(ownerUserId),
      _id: { $ne: new ObjectId(excludeBookId) },
    })
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();

  const sellerMap = await buildSellerMap(docs.map((d) => d.userId));
  return docs.map((d) => docToListing(d, sellerMap));
}

export async function listBooksByOwner(
  ownerUserId: string,
): Promise<BookListing[]> {
  if (!isObjectIdString(ownerUserId)) return [];

  const db = await getDb();
  const docs = await db
    .collection<BookDocument>(COLLECTION)
    .find({ userId: new ObjectId(ownerUserId) })
    .sort({ createdAt: -1 })
    .toArray();

  const sellerMap = await buildSellerMap(docs.map((d) => d.userId));
  return docs.map((d) => docToListing(d, sellerMap));
}

export async function deleteBookForOwner(
  bookId: string,
  ownerUserId: string,
): Promise<boolean> {
  if (!isObjectIdString(bookId) || !isObjectIdString(ownerUserId)) {
    return false;
  }

  const db = await getDb();
  const result = await db.collection(COLLECTION).deleteOne({
    _id: new ObjectId(bookId),
    userId: new ObjectId(ownerUserId),
  });
  return result.deletedCount === 1;
}

export async function insertBook(input: {
  userId: string;
  title: string;
  author: string;
  edition?: string;
  year?: string;
  price: number;
  condition: BookCondition;
  category: string;
  image: string;
  description?: string;
}): Promise<{ id: string }> {
  if (!ObjectId.isValid(input.userId)) {
    throw new Error("Invalid user id");
  }

  const db = await getDb();
  const doc: Omit<BookDocument, "_id"> = {
    userId: new ObjectId(input.userId),
    title: input.title.trim(),
    author: input.author.trim(),
    price: input.price,
    condition: input.condition,
    category: input.category.trim(),
    image: input.image.trim(),
    createdAt: new Date(),
  };

  const ed = input.edition?.trim();
  if (ed) doc.edition = ed;
  const yr = input.year?.trim();
  if (yr) doc.year = yr;
  const desc = input.description?.trim();
  if (desc) doc.description = desc;

  const result = await db.collection(COLLECTION).insertOne(doc);
  return { id: result.insertedId.toHexString() };
}

export async function ensureBooksIndexes(): Promise<void> {
  const db = await getDb();
  await db.collection(COLLECTION).createIndex({ userId: 1, createdAt: -1 });
  await db.collection(COLLECTION).createIndex({ createdAt: -1 });
  await db.collection(COLLECTION).createIndex({ category: 1, createdAt: -1 });
  await db.collection(COLLECTION).createIndex({ condition: 1, createdAt: -1 });
  await db.collection(COLLECTION).createIndex({ price: 1 });
}

export async function getBookListingForPage(
  id: string,
): Promise<BookListing | null> {
  const fromDb = await findBookInDb(id);
  if (fromDb) return fromDb;
  return getMockBookById(id) ?? null;
}

export async function getRelatedForBook(
  book: BookListing,
): Promise<BookListing[]> {
  const ownerId = await findSellerUserIdForBook(book.id);
  if (ownerId) {
    return findRelatedBooksFromDb(ownerId, book.id, 4);
  }
  return booksBySeller(book.seller.name, book.id).slice(0, 4);
}
