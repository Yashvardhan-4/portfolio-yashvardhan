import React from "react";

interface GridHairlineProps {
  className?: string;
  withCrosshairs?: boolean;
}

export function GridHairline({ className = "", withCrosshairs = false }: GridHairlineProps) {
  return (
    <div className={`relative w-full border-t border-[var(--border)] ${className}`}>
      {withCrosshairs && (
        <>
          <span
            aria-hidden="true"
            className="absolute -top-[7px] -left-[5px] select-none font-mono text-[11px] leading-none text-[var(--fg-muted)] opacity-40"
          >
            +
          </span>
          <span
            aria-hidden="true"
            className="absolute -top-[7px] -right-[5px] select-none font-mono text-[11px] leading-none text-[var(--fg-muted)] opacity-40"
          >
            +
          </span>
        </>
      )}
    </div>
  );
}

export function SectionCrosshairHeader({
  index,
  title,
  tag,
  className = "",
}: {
  index: string;
  title: string;
  tag?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--accent)]">
        <span>[{index}]</span>
        <span className="h-px w-6 bg-[var(--border)]" />
        {tag && <span className="text-[var(--fg-muted)]">{tag}</span>}
      </div>
      <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-[var(--fg)] sm:text-3xl md:text-4xl">
        {title}
      </h2>
    </div>
  );
}
