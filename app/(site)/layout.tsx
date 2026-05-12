import { BookswapFooter } from "@/components/bookswap/footer";
import { BookswapHeader } from "@/components/bookswap/header";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-col bg-slate-50 text-slate-900 antialiased">
      <BookswapHeader />
      <main className="flex-1">{children}</main>
      <BookswapFooter />
    </div>
  );
}
