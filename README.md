# BookBridge (BookSwap)

Next.js app for listing and browsing textbooks: **NextAuth** (email/password), **MongoDB** for users and book listings, **Browse** with filters and pagination, **Sell** (image URL + details), and **Dashboard** (your listings, delete).

## Prerequisites

- **Node.js** 20+ (see `package.json` engines if added)
- **npm** (or pnpm/yarn)
- **MongoDB Atlas** cluster (or any MongoDB URI the driver accepts)

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

Edit **`.env.local`** (this file is gitignored — do not commit secrets):

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | Connection string, e.g. `mongodb+srv://USER:PASSWORD@cluster.mongodb.net/bookbridge?retryWrites=true&w=majority` |
| `MONGODB_DB` | Database name (default: `bookbridge`) |
| `AUTH_SECRET` | Random secret for NextAuth sessions: `openssl rand -base64 32` |
| `AUTH_URL` | App URL in dev: `http://localhost:3000` — in production, your real site URL |

### 3. (Optional) Seed sample listings

Populates the `books` collection for **Browse** (see `scripts/seed-books.ts` for the owner user id used by the seed):

```bash
npm run seed:books
```

Requires a valid `MONGODB_URI` in `.env.local`.

## Run locally

**Development** (hot reload):

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Production build** (test locally):

```bash
npm run build
npm start
```

**Lint:**

```bash
npm run lint
```

## Using the app

1. **Sign up** at `/signup`, then **log in** at `/login`.
2. **Browse** at `/browse` — listings load from MongoDB (filter/pagination via URL query params).
3. **List a book** at `/sell` (must be logged in) — uses a **cover image URL** and saves to your account.
4. **Dashboard** at `/dashboard` — your listings; **Delete** removes a book you own (also available via `DELETE /api/books/[id]`).

## Tech stack

- [Next.js](https://nextjs.org) (App Router)
- [NextAuth.js v5](https://authjs.dev) (`next-auth@beta`)
- [MongoDB](https://www.mongodb.com/docs/drivers/node/current/) + `mongodb` Node driver

For framework details, see [Next.js documentation](https://nextjs.org/docs).
