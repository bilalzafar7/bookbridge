"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { IconChevronDown, IconUser } from "./icons";

export function BookswapUserNav() {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(e: MouseEvent) {
      if (wrapRef.current?.contains(e.target as Node)) return;
      setMenuOpen(false);
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (status === "loading") {
    return (
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-400"
        aria-hidden
      >
        <span className="h-4 w-4 animate-pulse rounded-full bg-slate-300" />
      </div>
    );
  }

  if (session?.user) {
    const label = session.user.name || session.user.email || "Account";

    return (
      <div className="relative shrink-0" ref={wrapRef}>
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          className="flex max-w-[min(14rem,calc(100vw-8rem))] items-center gap-1.5 rounded-lg border border-slate-200 bg-white py-1.5 pl-2.5 pr-2 text-left text-sm font-medium text-slate-800 shadow-sm transition hover:bg-slate-50"
          aria-expanded={menuOpen}
          aria-haspopup="menu"
          aria-label="Account menu"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
            <IconUser className="h-4 w-4" />
          </span>
          <span className="hidden min-w-0 truncate sm:inline">{label}</span>
          <IconChevronDown
            className={`h-4 w-4 shrink-0 text-slate-500 transition ${menuOpen ? "rotate-180" : ""}`}
          />
        </button>

        {menuOpen ? (
          <div
            role="menu"
            className="absolute right-0 z-50 mt-1.5 min-w-[11rem] rounded-lg border border-slate-200 bg-white py-1 shadow-lg"
          >
            <Link
              role="menuitem"
              href="/dashboard"
              className="block px-4 py-2.5 text-sm text-slate-800 hover:bg-slate-50"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
            <button
              role="menuitem"
              type="button"
              className="w-full px-4 py-2.5 text-left text-sm text-slate-800 hover:bg-slate-50"
              onClick={() => {
                setMenuOpen(false);
                signOut({ callbackUrl: "/" });
              }}
            >
              Sign out
            </button>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="flex shrink-0 items-center gap-2 md:gap-3">
      <Link
        href="/login"
        className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
      >
        Log in
      </Link>
      <Link
        href="/signup"
        className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
      >
        Sign up
      </Link>
      <span
        className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-600 md:hidden"
        aria-hidden
      >
        <IconUser className="h-4 w-4" />
      </span>
    </div>
  );
}
