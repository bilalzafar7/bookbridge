import type { BookListing } from "./types";

/** Custom cover art for specific listings (see `next.config.ts` remotePatterns). */
const COVER_ORGANIC_CHEMISTRY =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-qkfVPgI0iH1EH682_PdmIf9M5XvWXsJ2dA&s";

const COVER_CALCULUS =
  "https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3N8ZW58MHx8MHx8fDA%3D";

const COVER_SOCIOLOGY_WORK =
  "https://miro.medium.com/v2/resize:fit:1200/1*S81O15rjKfG-BFdnNC6-GQ.jpeg";

/** Distinct Unsplash photos — books, libraries, study (remotePatterns already allow images.unsplash.com). */
const COVER_URLS = [
  "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1519682337054-94a36b16d11a?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1513475382583-d06e58bcb0e0?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1524995997946-a7c1bd416988?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1589829085413-e56a006f40de?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1515879219757-46f346cba088?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1516979187457-10eb88d2333e?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1532012197267-a84bf204e586?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1526243741027-444d633d7365?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1512820790808-f83f13f000ca?auto=format&fit=crop&w=900&q=85",
] as const;

function coverAt(i: number): string {
  return COVER_URLS[i % COVER_URLS.length];
}

export const books: BookListing[] = [
  {
    id: "advanced-macroeconomics",
    title: "Advanced Macroeconomics",
    author: "David Romer",
    edition: "5th Edition",
    price: 45,
    condition: "Like New",
    category: "Economics",
    image: coverAt(0),
    description:
      "Comprehensive graduate-level macro text covering growth, business cycles, and policy. This copy has been handled carefully—no highlighting or dog-eared pages. Spine and cover show minimal shelf wear.",
    seller: { name: "Alex Johnson", rating: 4.9, trades: 12 },
    postedAt: "2 days ago",
  },
  {
    id: "organic-chemistry",
    title: "Principles of Organic Chemistry",
    author: "Dr. Michael J. Roberts",
    edition: "12th Edition",
    price: 45,
    condition: "Like New",
    category: "Science",
    image: COVER_ORGANIC_CHEMISTRY,
    seller: { name: "Jordan Lee", rating: 4.8, trades: 31 },
    postedAt: "1 day ago",
  },
  {
    id: "microeconomics-case",
    title: "Microeconomics: Theory & Applications",
    author: "K.E. Case",
    year: "2023",
    price: 28,
    condition: "Used",
    category: "Economics",
    image: coverAt(2),
    seller: { name: "Sam Rivera", rating: 4.7, trades: 8 },
    postedAt: "3 days ago",
  },
  {
    id: "anatomy-marieb",
    title: "Human Anatomy & Physiology",
    author: "Marieb & Hoehn",
    price: 60,
    condition: "New",
    category: "Biology",
    image: coverAt(3),
    seller: { name: "Taylor Chen", rating: 5, trades: 22 },
    postedAt: "5 hours ago",
  },
  {
    id: "calculus-stewart",
    title: "Calculus: Early Transcendentals",
    author: "James Stewart",
    edition: "8th Ed.",
    price: 35,
    condition: "Good",
    category: "Mathematics",
    image: COVER_CALCULUS,
    seller: { name: "Morgan Patel", rating: 4.6, trades: 15 },
    postedAt: "4 days ago",
  },
  {
    id: "sociology-work",
    title: "The Sociology of Work",
    author: "Keith Grint",
    edition: "4th Ed.",
    price: 20,
    condition: "Used",
    category: "Sociology",
    image: COVER_SOCIOLOGY_WORK,
    seller: { name: "Riley Brooks", rating: 4.5, trades: 6 },
    postedAt: "1 week ago",
  },
  {
    id: "advanced-calculus",
    title: "Advanced Calculus: A Modern Approach",
    author: "Dr. Michael Sterling",
    price: 45,
    condition: "New",
    category: "Computer Science",
    image: coverAt(6),
    seller: { name: "Alex Johnson", rating: 4.9, trades: 12 },
    postedAt: "2 days ago",
  },
  {
    id: "data-structures",
    title: "Introduction to Algorithms",
    author: "Cormen et al.",
    edition: "4th Edition",
    price: 72,
    condition: "Like New",
    category: "Computer Science",
    image: coverAt(7),
    seller: { name: "Casey Kim", rating: 4.8, trades: 19 },
    postedAt: "6 days ago",
  },
  {
    id: "physics-halliday",
    title: "Fundamentals of Physics",
    author: "Halliday, Resnick",
    edition: "11th Edition",
    price: 55,
    condition: "Used",
    category: "Science",
    image: coverAt(8),
    seller: { name: "Alex Johnson", rating: 4.9, trades: 12 },
    postedAt: "1 week ago",
  },
  {
    id: "principles-finance",
    title: "Principles of Finance",
    author: "Brealey & Myers",
    price: 32,
    condition: "Good",
    category: "Economics",
    image: coverAt(9),
    seller: { name: "Alex Johnson", rating: 4.9, trades: 12 },
    postedAt: "3 weeks ago",
  },
  {
    id: "linear-algebra",
    title: "Linear Algebra Done Right",
    author: "Sheldon Axler",
    edition: "3rd Edition",
    price: 38,
    condition: "Like New",
    category: "Mathematics",
    image: coverAt(10),
    seller: { name: "Alex Johnson", rating: 4.9, trades: 12 },
    postedAt: "2 weeks ago",
  },
  {
    id: "econometrics",
    title: "Introductory Econometrics",
    author: "Jeffrey Wooldridge",
    price: 42,
    condition: "Used",
    category: "Economics",
    image: coverAt(11),
    seller: { name: "Alex Johnson", rating: 4.9, trades: 12 },
    postedAt: "5 days ago",
  },
];

export function getBookById(id: string): BookListing | undefined {
  return books.find((b) => b.id === id);
}

export function booksBySeller(name: string, excludeId?: string): BookListing[] {
  return books.filter(
    (b) => b.seller.name === name && (!excludeId || b.id !== excludeId),
  );
}
