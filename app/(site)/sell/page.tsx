import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IconArrowLeft } from "@/components/bookswap/icons";
import { auth } from "@/auth";
import { SellBookForm } from "./sell-book-form";

export default async function SellPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/sell");
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-10">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        <IconArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-slate-900 md:text-3xl">
        List a Book for Sale
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        Add a cover image URL and details — your listing is saved to your account
        and shown on Browse.
      </p>

      <SellBookForm />

      <div className="mt-10 grid gap-6 md:grid-cols-2 md:items-stretch">
        <div className="relative aspect-square min-h-[200px] overflow-hidden rounded-xl bg-slate-200 md:min-h-0">
          <Image
            src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=500&q=80"
            alt=""
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 280px"
          />
        </div>
        <div className="flex flex-col justify-center rounded-xl bg-blue-50 p-6">
          <h2 className="text-lg font-bold text-slate-900">
            Pro tip for quick sales
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">
            Most students search during the first two weeks of the semester. Use
            a clear cover photo URL and price competitively (often 40–50% off
            retail) so your listing stands out.
          </p>
        </div>
      </div>
    </div>
  );
}
