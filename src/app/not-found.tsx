import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="border border-[var(--border)] bg-[var(--surface)] p-8 sm:p-12 max-w-lg">
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
          [EXCEPTION: 404]
        </span>
        <h1 className="font-display text-4xl font-semibold text-[var(--fg)] mt-2">
          Route Not Found
        </h1>
        <p className="font-mono text-xs text-[var(--fg-muted)] mt-4 leading-relaxed">
          The requested coordinate does not exist in the architectural registry.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-[var(--accent)] bg-[var(--accent)] px-4 py-2 font-mono text-xs font-semibold text-[#08090a] hover:bg-[var(--accent-dim)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>RETURN TO PRIMARY FOLIO</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
