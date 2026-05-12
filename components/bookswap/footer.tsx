import Link from "next/link";

const linkCol = "flex flex-col gap-2 text-sm text-slate-600";

export function BookswapFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-lg font-bold text-blue-600">BookSwap</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-600">
              The smarter way to swap textbooks on campus. Save money and cut
              waste by trading with verified students.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Marketplace</p>
            <nav className={`${linkCol} mt-4`}>
              <Link href="/browse" className="hover:text-blue-600">
                Browse All
              </Link>
              <Link href="/browse" className="hover:text-blue-600">
                Textbooks
              </Link>
              <Link href="/browse" className="hover:text-blue-600">
                Fiction
              </Link>
              <Link href="/browse" className="hover:text-blue-600">
                Science
              </Link>
            </nav>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Support</p>
            <nav className={`${linkCol} mt-4`}>
              <Link href="#" className="hover:text-blue-600">
                Safety Tips
              </Link>
              <Link href="#" className="hover:text-blue-600">
                Help Center
              </Link>
              <Link href="#" className="hover:text-blue-600">
                Campus Reps
              </Link>
              <Link href="#" className="hover:text-blue-600">
                Contact Us
              </Link>
            </nav>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Legal</p>
            <nav className={`${linkCol} mt-4`}>
              <Link href="#" className="hover:text-blue-600">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-blue-600">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-blue-600">
                Cookie Policy
              </Link>
            </nav>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-8 text-sm text-slate-500 sm:flex-row sm:items-center">
          <p>© 2026 BookSwap. All rights reserved.</p>
          <div className="flex gap-4 text-slate-500">
            <span className="sr-only">Language and share</span>
            <span aria-hidden>🌐</span>
            <span aria-hidden>↗</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
