export type BookCondition = "New" | "Like New" | "Used" | "Good";

export type BookListing = {
  id: string;
  title: string;
  author: string;
  edition?: string;
  year?: string;
  price: number;
  condition: BookCondition;
  category: string;
  image: string;
  description?: string;
  seller: {
    name: string;
    rating: number;
    trades: number;
  };
  postedAt?: string;
};
