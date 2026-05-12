import { LoginForm } from "./login-form";

function safeCallbackUrl(raw: string | string[] | undefined): string {
  if (typeof raw !== "string" || !raw.startsWith("/") || raw.startsWith("//")) {
    return "/";
  }
  return raw;
}

export default async function LoginPage(props: {
  searchParams: Promise<{ callbackUrl?: string | string[] }>;
}) {
  const searchParams = await props.searchParams;
  const callbackUrl = safeCallbackUrl(searchParams.callbackUrl);

  return <LoginForm callbackUrl={callbackUrl} />;
}
