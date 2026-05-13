import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export type LegalDoc = "privacy" | "cookie" | "condizioni";

type Props = {
  children: React.ReactNode;
  title: string;
  intro?: string;
  current: LegalDoc;
};

const legalLinks: { href: string; label: string; id: LegalDoc }[] = [
  { href: "/privacy-policy", label: "Privacy Policy", id: "privacy" },
  { href: "/cookie-policy", label: "Cookie Policy", id: "cookie" },
  { href: "/condizioni-di-vendita", label: "Condizioni di vendita", id: "condizioni" },
];

export function LegalShell({ children, title, intro, current }: Props) {
  return (
    <div
      className="flex min-h-screen flex-col bg-[#0d1117] text-zinc-200"
      style={{ backgroundColor: "#0d1117", color: "#e4e4e7" }}
    >
      <SiteHeader />
      <main
        className="flex-1 px-4 py-10 sm:px-6 sm:py-14"
        style={{ color: "#d4d4d8" }}
      >
        <div className="mx-auto max-w-3xl">
          <nav
            className="mb-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 border-b border-white/10 pb-6 text-[10px] font-semibold uppercase tracking-[0.22em] sm:text-xs"
            aria-label="Documenti legali"
          >
            <Link href="/" className="text-[#d32f2f] hover:underline">
              Home
            </Link>
            {legalLinks.map((item) => (
              <span key={item.id} className="flex items-center gap-x-2">
                <span className="text-zinc-600" aria-hidden>
                  ·
                </span>
                <Link
                  href={item.href}
                  className={
                    current === item.id
                      ? "text-white underline decoration-white/30 underline-offset-4"
                      : "text-zinc-500 hover:text-zinc-200"
                  }
                >
                  {item.label}
                </Link>
              </span>
            ))}
          </nav>

          <header className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#93c5fd]">
              Documentazione legale
            </p>
            <h1
              className="font-display mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl"
              style={{ color: "#fafafa" }}
            >
              {title}
            </h1>
            {intro ? (
              <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">{intro}</p>
            ) : null}
          </header>

          <div className="space-y-10 text-sm leading-relaxed sm:text-base">{children}</div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
