import type { BookCondition } from "./types";

/** Same cover URLs as mock data + your three custom assets. */
export const COVER_ORGANIC_CHEMISTRY =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-qkfVPgI0iH1EH682_PdmIf9M5XvWXsJ2dA&s";

export const COVER_CALCULUS =
  "https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3N8ZW58MHx8MHx8fDA%3D";

export const COVER_SOCIOLOGY_WORK =
  "https://miro.medium.com/v2/resize:fit:1200/1*S81O15rjKfG-BFdnNC6-GQ.jpeg";

export const COVER_UNSPLASH = [
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

export type SeedBookFields = {
  title: string;
  author: string;
  edition?: string;
  year?: string;
  price: number;
  condition: BookCondition;
  category: string;
  image: string;
  description?: string;
};

/** Twenty listings — all intended for the same `userId` in MongoDB. */
export const SEED_BOOKS: SeedBookFields[] = [
  {
    title: "Advanced Macroeconomics",
    author: "David Romer",
    edition: "5th Edition",
    price: 45,
    condition: "Like New",
    category: "Economics",
    image: COVER_UNSPLASH[0],
    description:
      "Graduate-level macro: growth, cycles, and policy. Minimal shelf wear.",
  },
  {
    title: "Principles of Organic Chemistry",
    author: "Dr. Michael J. Roberts",
    edition: "12th Edition",
    price: 45,
    condition: "Like New",
    category: "Science",
    image: COVER_ORGANIC_CHEMISTRY,
    description: "Clean copy; no highlighting.",
  },
  {
    title: "Microeconomics: Theory & Applications",
    author: "K.E. Case",
    year: "2023",
    price: 28,
    condition: "Used",
    category: "Economics",
    image: COVER_UNSPLASH[2],
  },
  {
    title: "Human Anatomy & Physiology",
    author: "Marieb & Hoehn",
    price: 60,
    condition: "New",
    category: "Biology",
    image: COVER_UNSPLASH[3],
  },
  {
    title: "Calculus: Early Transcendentals",
    author: "James Stewart",
    edition: "8th Ed.",
    price: 35,
    condition: "Good",
    category: "Mathematics",
    image: COVER_CALCULUS,
  },
  {
    title: "The Sociology of Work",
    author: "Keith Grint",
    edition: "4th Ed.",
    price: 20,
    condition: "Used",
    category: "Sociology",
    image: COVER_SOCIOLOGY_WORK,
  },
  {
    title: "Advanced Calculus: A Modern Approach",
    author: "Dr. Michael Sterling",
    price: 45,
    condition: "New",
    category: "Computer Science",
    image: COVER_UNSPLASH[6],
  },
  {
    title: "Introduction to Algorithms",
    author: "Cormen et al.",
    edition: "4th Edition",
    price: 72,
    condition: "Like New",
    category: "Computer Science",
    image: COVER_UNSPLASH[7],
  },
  {
    title: "Fundamentals of Physics",
    author: "Halliday, Resnick",
    edition: "11th Edition",
    price: 55,
    condition: "Used",
    category: "Science",
    image: COVER_UNSPLASH[8],
  },
  {
    title: "Principles of Finance",
    author: "Brealey & Myers",
    price: 32,
    condition: "Good",
    category: "Economics",
    image: COVER_UNSPLASH[9],
  },
  {
    title: "Linear Algebra Done Right",
    author: "Sheldon Axler",
    edition: "3rd Edition",
    price: 38,
    condition: "Like New",
    category: "Mathematics",
    image: COVER_UNSPLASH[10],
  },
  {
    title: "Introductory Econometrics",
    author: "Jeffrey Wooldridge",
    price: 42,
    condition: "Used",
    category: "Economics",
    image: COVER_UNSPLASH[11],
  },
  {
    title: "Statistical Inference",
    author: "Casella & Berger",
    edition: "2nd Edition",
    price: 48,
    condition: "Like New",
    category: "Mathematics",
    image: COVER_UNSPLASH[12],
  },
  {
    title: "Molecular Biology of the Cell",
    author: "Alberts et al.",
    edition: "6th Edition",
    price: 68,
    condition: "Good",
    category: "Biology",
    image: COVER_UNSPLASH[13],
  },
  {
    title: "Discrete Mathematics and Its Applications",
    author: "Kenneth Rosen",
    edition: "8th Edition",
    price: 44,
    condition: "Used",
    category: "Mathematics",
    image: COVER_UNSPLASH[14],
  },
  {
    title: "World Politics: Interests, Interactions, Institutions",
    author: "Frieden, Lake & Schultz",
    edition: "5th Edition",
    price: 36,
    condition: "Used",
    category: "Political Science",
    image: COVER_UNSPLASH[15],
  },
  {
    title: "Principles of Corporate Finance",
    author: "Brealey, Myers & Allen",
    edition: "13th Edition",
    price: 52,
    condition: "Like New",
    category: "Economics",
    image: COVER_UNSPLASH[4],
  },
  {
    title: "Psychology",
    author: "David G. Myers",
    edition: "13th Edition",
    price: 40,
    condition: "Good",
    category: "Psychology",
    image: COVER_UNSPLASH[9],
  },
  {
    title: "Campbell Biology",
    author: "Urry et al.",
    edition: "12th Edition",
    price: 65,
    condition: "Like New",
    category: "Biology",
    image: COVER_UNSPLASH[1],
  },
  {
    title: "Artificial Intelligence: A Modern Approach",
    author: "Russell & Norvig",
    edition: "4th Edition",
    price: 78,
    condition: "New",
    category: "Computer Science",
    image: COVER_UNSPLASH[5],
  },
];
