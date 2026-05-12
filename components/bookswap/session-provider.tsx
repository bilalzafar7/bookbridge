"use client";

import { SessionProvider } from "next-auth/react";

export function BookswapSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
