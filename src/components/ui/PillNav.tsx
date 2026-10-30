"use client";

import React, { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import "./PillNav.css";

export interface NavItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  ariaLabel?: string;
}

const THEMES: Record<string, Record<string, string>> = {
  dark: {
    "--pn-surface": "rgba(14, 16, 21, 0.75)",
    "--pn-solid": "#0E1015",
    "--pn-edge": "rgba(0, 210, 255, 0.12)",
    "--pn-rim": "rgba(255, 255, 255, 0.06)",
    "--pn-shadow": "0 22px 44px -20px rgba(0, 0, 0, 0.8), 0 6px 16px -8px rgba(0, 0, 0, 0.5)",
    "--pn-text": "rgba(142, 149, 165, 0.8)",
    "--pn-strong": "#EDEDEF",
    "--pn-pill": "#00D2FF",
    "--pn-pill-ink": "#060709",
    "--pn-pill-shadow": "inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 6px 16px -6px rgba(0, 210, 255, 0.4)",
    "--pn-dot": "#00D2FF",
    "--pn-ring": "rgba(0, 210, 255, 0.55)",
    "--pn-row-hover": "rgba(255, 255, 255, 0.06)",
    "--pn-tile": "linear-gradient(180deg, #161a22 0%, #0e1117 100%)",
    "--pn-tile-rim":
      "inset 0 0 0 1px rgba(0, 210, 255, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
  },
};

const SIZES: Record<string, Record<string, string>> = {
  sm: {
    "--pn-h": "36px",
    "--pn-pad": "3px",
    "--pn-inner": "30px",
    "--pn-x": "12px",
    "--pn-font": "12px",
    "--pn-gap": "6px",
    "--pn-mark": "18px",
  },
  md: {
    "--pn-h": "44px",
    "--pn-pad": "4px",
    "--pn-inner": "36px",
    "--pn-x": "16px",
    "--pn-font": "13px",
    "--pn-gap": "8px",
    "--pn-mark": "22px",
  },
};

const ROOT = "pill-nav";
const SURFACE = "pill-nav__surface";
const RIM = "pill-nav__rim";
const ROOT_RIM = "pill-nav__rim pill-nav__rim--root";
const LOGO = "pill-nav__logo";
const LOGO_LINK = "pill-nav__logo-link";
const MARK = "pill-nav__mark";
const BAR = "pill-nav__bar";
const TRACK = "pill-nav__track";
const LIST = "pill-nav__list";
const SLOT = "pill-nav__slot";
const ITEM = "pill-nav__item";
const FACE = "pill-nav__face";
const FACE_ALT = "pill-nav__face-alt";
const FILL = "pill-nav__fill";
const GLIDE = "pill-nav__glide";
const INK = "pill-nav__ink";
const INK_ITEM = "pill-nav__ink-item";
const DOT = "pill-nav__dot";
const TOGGLE = "pill-nav__toggle";
const TOGGLE_BARE = "pill-nav__toggle--bare";
const BURGER = "pill-nav__burger";
const LINE_TOP = "pill-nav__line pill-nav__line--top";
const LINE_BOTTOM = "pill-nav__line pill-nav__line--bottom";
const PANEL = "pill-nav__panel";
const MENU = "pill-nav__menu";
const ROW = "pill-nav__row";
const MEASURE = "pill-nav__measure";

const DEFAULT_ITEMS: NavItem[] = [
  { label: "00 // HOME", href: "#" },
  { label: "01 // WORK", href: "#work" },
  { label: "02 // RIGOR", href: "#about" },
  { label: "03 // CONTACT", href: "#contact" },
];

const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export interface PillNavProps {
  logo?: React.ReactNode;
  logoAlt?: string;
  logoHref?: string;
  items?: NavItem[];
  activeHref?: string;
  defaultActiveIndex?: number;
  onItemClick?: (item: NavItem, index: number, event: React.MouseEvent) => void;
  linkComponent?: any;
  theme?: "dark";
  layout?: "split" | "joined";
  size?: "sm" | "md";
  surface?: "glass" | "solid" | "none";
  itemStyle?: "text" | "pill";
  hoverEffect?: "fill" | "glide";
  indicator?: "dot" | "pill";
  highlightColor?: string;
  highlightTextColor?: string;
  barColor?: string;
  textColor?: string;
  bounce?: number;
  stretch?: number;
  intro?: boolean;
  collapse?: "auto" | "always" | "never";
  onMenuToggle?: (open: boolean) => void;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function PillNav({
  logo,
  logoAlt = "Logo",
  logoHref = "#",
  items = DEFAULT_ITEMS,
  activeHref,
  defaultActiveIndex = 0,
  onItemClick,
  linkComponent: LinkComponent = "a",
  theme = "dark",
  layout = "joined",
  size = "md",
  surface = "glass",
  itemStyle = "pill",
  hoverEffect = "glide",
  indicator = "dot",
  highlightColor = "#00D2FF",
  highlightTextColor = "#060709",
  barColor,
  textColor,
  bounce = 0.3,
  stretch = 0.5,
  intro = true,
  collapse = "auto",
  onMenuToggle,
  ariaLabel = "Main Navigation",
  className = "",
  style,
}: PillNavProps) {
  const panelId = useId();
  const rootRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const glideRef = useRef<HTMLSpanElement>(null);
  const inkRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLSpanElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const measureListRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<(HTMLLIElement | null)[]>([]);
  const engineRef = useRef<any>(null);
  const introRef = useRef(intro);
  const slideRef = useRef(false);
  const pendingRef = useRef<boolean | null>(null);
  const [selected, setSelected] = useState(defaultActiveIndex);
  const [collapsed, setCollapsed] = useState(collapse === "always");
  const [open, setOpen] = useState(false);
  const [panelShown, setPanelShown] = useState(false);

  const controlled = activeHref !== undefined;
  const activeIndex = controlled ? items.findIndex((item) => item.href === activeHref) : selected;
  const joined = layout === "joined";
  const hasLogo = Boolean(logo);
  const fill = hoverEffect === "fill";
  const glide = !fill && (hoverEffect === "glide" || indicator === "pill");

  const settings = {
    hoverEffect,
    indicator,
    activeIndex,
    bounce: clamp(bounce, 0, 1),
    stretch: clamp(stretch, 0, 1),
  };
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  const palette = THEMES[theme] ?? THEMES.dark;
  const vars: Record<string, string> = { ...palette, ...(SIZES[size] ?? SIZES.md) };
  if (surface === "glass") vars["--pn-blur"] = "blur(20px) saturate(1.6)";
  if (surface === "solid") {
    vars["--pn-surface"] = palette["--pn-solid"];
    vars["--pn-blur"] = "none";
  }
  if (highlightColor) {
    vars["--pn-pill"] = highlightColor;
    vars["--pn-dot"] = highlightColor;
    vars["--pn-pill-ink"] = highlightTextColor;
  }

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const state = {
      x0: 0,
      x1: 0,
      v0: 0,
      v1: 0,
      alpha: 0,
      pop: 1,
      press: 1,
      pressVelocity: 0,
      dotX: 0,
      dotVelocity: 0,
      dotAlpha: 0,
      hover: -1,
      focus: false,
      sliding: false,
      pressing: false,
      waiting: slideRef.current && !reduce,
    };
    slideRef.current = false;
    const rects: { left: number; width: number }[] = [];
    let trackWidth = 0;
    let trackHeight = 0;
    let raf = 0;
    let last = 0;

    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      trackWidth = track.offsetWidth;
      trackHeight = track.offsetHeight;
      slotRefs.current.forEach((slot, index) => {
        if (!slot) return;
        rects[index] = { left: slot.offsetLeft, width: slot.offsetWidth };
        const reach =
          Math.ceil(2 * Math.sqrt((slot.offsetWidth / 2) ** 2 + slot.offsetHeight ** 2)) + 2;
        slot.style.setProperty("--pn-fill", `${reach}px`);
      });
    };

    const glideIndex = () => {
      const s = settingsRef.current;
      if (s.hoverEffect === "fill") return -1;
      if (s.hoverEffect === "glide" && state.hover >= 0) return state.hover;
      return s.indicator === "pill" ? s.activeIndex : -1;
    };

    const sync = () => {
      const s = settingsRef.current;
      slotRefs.current.forEach((slot, index) => {
        if (!slot) return;
        const hovered = state.hover === index;
        slot.toggleAttribute("data-lit", hovered);
        slot.toggleAttribute("data-hover", hovered && s.hoverEffect === "fill");
      });
      root.toggleAttribute("data-focus", state.focus && state.hover >= 0);
      root.toggleAttribute(
        "data-dot-lit",
        s.hoverEffect === "fill" && state.hover >= 0 && state.hover === s.activeIndex
      );
    };

    const render = () => {
      const glideEl = glideRef.current;
      const ink = inkRef.current;
      const dot = dotRef.current;
      const width = Math.max(0, state.x1 - state.x0);
      const scale = state.press * state.pop;
      const target = rects[glideIndex()];
      const squash = target ? 1 - clamp((width / Math.max(target.width, 1) - 1) * 0.3, 0, 0.14) : 1;
      if (glideEl) {
        glideEl.style.width = `${width}px`;
        glideEl.style.transform = `translate3d(${state.x0}px, 0, 0) scale(${scale}, ${scale * squash})`;
        glideEl.style.opacity = `${state.alpha}`;
      }
      if (ink) {
        const half = (width * scale) / 2;
        const center = (state.x0 + state.x1) / 2;
        const inset = (trackHeight * (1 - scale * squash)) / 2;
        ink.style.clipPath = `inset(${inset}px ${trackWidth - center - half}px ${inset}px ${center - half}px round ${trackHeight / 2}px)`;
        ink.style.opacity = `${state.alpha}`;
      }
      if (dot) {
        const pull = clamp(Math.abs(state.dotVelocity) / 700, 0, 2.2);
        dot.style.transform = `translate3d(${state.dotX}px, 0, 0) scaleX(${1 + pull})`;
        dot.style.opacity = `${state.dotAlpha}`;
      }
    };

    const tick = (now: number) => {
      raf = 0;
      const s = settingsRef.current;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
      last = now;
      const index = glideIndex();
      const target = rects[index];
      const zeta = 1 - 0.55 * s.bounce;
      const base = 520;
      let busy = false;

      if (target && !state.waiting) {
        const t0 = target.left;
        const t1 = target.left + target.width;
        if (state.alpha < 0.02 && !state.sliding) {
          state.x0 = t0;
          state.x1 = t1;
          state.v0 = 0;
          state.v1 = 0;
          state.pop = 0.9;
        }
        if (reduce) {
          state.x0 = t0;
          state.x1 = t1;
          state.v0 = 0;
          state.v1 = 0;
        } else {
          const direction = Math.sign((t0 + t1) / 2 - (state.x0 + state.x1) / 2);
          const lead = base * (1 + 0.9 * s.stretch);
          const trail = base * (1 - 0.5 * s.stretch);
          const k0 = direction < 0 ? lead : direction > 0 ? trail : base;
          const k1 = direction > 0 ? lead : direction < 0 ? trail : base;
          const steps = Math.ceil(dt / (1 / 240));
          const h = dt / steps;
          for (let i = 0; i < steps; i++) {
            state.v0 += (-k0 * (state.x0 - t0) - 2 * zeta * Math.sqrt(k0) * state.v0) * h;
            state.x0 += state.v0 * h;
            state.v1 += (-k1 * (state.x1 - t1) - 2 * zeta * Math.sqrt(k1) * state.v1) * h;
            state.x1 += state.v1 * h;
          }
        }
        state.alpha += (1 - state.alpha) * (reduce ? 1 : 1 - Math.exp(-dt / 0.06));
        busy =
          Math.abs(state.x0 - t0) > 0.05 ||
          Math.abs(state.x1 - t1) > 0.05 ||
          Math.abs(state.v0) > 0.5 ||
          Math.abs(state.v1) > 0.5 ||
          state.alpha < 0.999;
        if (!busy) state.sliding = false;
      } else {
        state.alpha += (0 - state.alpha) * (reduce ? 1 : 1 - Math.exp(-dt / 0.07));
        if (state.alpha > 0.002) busy = true;
        else state.alpha = 0;
      }

      state.pop += (1 - state.pop) * (reduce ? 1 : 1 - Math.exp(-dt / 0.09));
      if (Math.abs(1 - state.pop) > 0.001) busy = true;

      const dotTarget = s.indicator === "dot" ? rects[s.activeIndex] : null;
      if (dotTarget && !state.waiting) {
        const center = dotTarget.left + dotTarget.width / 2;
        if (state.dotAlpha < 0.02) {
          state.dotX = center;
          state.dotVelocity = 0;
        }
        if (reduce) {
          state.dotX = center;
          state.dotVelocity = 0;
        } else {
          const k = 360;
          const steps = Math.ceil(dt / (1 / 240));
          const h = dt / steps;
          for (let i = 0; i < steps; i++) {
            state.dotVelocity +=
              (-k * (state.dotX - center) -
                2 * (1 - 0.5 * s.bounce) * Math.sqrt(k) * state.dotVelocity) *
              h;
            state.dotX += state.dotVelocity * h;
          }
        }
        state.dotAlpha += (1 - state.dotAlpha) * (reduce ? 1 : 1 - Math.exp(-dt / 0.1));
        if (
          Math.abs(state.dotX - center) > 0.05 ||
          Math.abs(state.dotVelocity) > 0.5 ||
          state.dotAlpha < 0.999
        )
          busy = true;
      } else {
        state.dotAlpha += (0 - state.dotAlpha) * (reduce ? 1 : 1 - Math.exp(-dt / 0.1));
        if (state.dotAlpha > 0.002) busy = true;
        else state.dotAlpha = 0;
      }

      render();
      if (busy) raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!raf) {
        last = 0;
        raf = requestAnimationFrame(tick);
      }
    };

    const engine = {
      enter: (index: number, event: React.PointerEvent) => {
        if (event?.pointerType === "touch") return;
        state.hover = index;
        state.focus = false;
        sync();
        wake();
      },
      leave: () => {
        if (state.focus) return;
        state.hover = -1;
        sync();
        wake();
      },
      focus: (index: number, event: React.FocusEvent) => {
        const target = event?.target as HTMLElement;
        const visible = target instanceof Element && target.matches(":focus-visible");
        state.focus = visible;
        state.hover = visible ? index : state.hover;
        sync();
        wake();
      },
      blur: () => {
        if (!state.focus) return;
        state.focus = false;
        state.hover = -1;
        sync();
        wake();
      },
      refresh: () => {
        measure();
        sync();
        wake();
      },
    };
    engineRef.current = engine;

    measure();
    sync();
    render();
    wake();

    const resizeObserver = new ResizeObserver(() => {
      measure();
      render();
      wake();
    });
    if (trackRef.current) resizeObserver.observe(trackRef.current);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      engineRef.current = null;
    };
  }, [collapsed, items.length]);

  useEffect(() => {
    engineRef.current?.refresh();
  });

  const choose = (item: NavItem, index: number, event: React.MouseEvent) => {
    onItemClick?.(item, index, event);
    if (!controlled) setSelected(index);
  };

  const toggle = () => {
    const next = !open;
    if (next) setPanelShown(true);
    setOpen(next);
    onMenuToggle?.(next);
  };

  const link = (item: NavItem, props: any, children: React.ReactNode) => {
    if (!item.href) {
      return (
        <button type="button" {...props}>
          {children}
        </button>
      );
    }
    return (
      <LinkComponent href={item.href} {...props}>
        {children}
      </LinkComponent>
    );
  };

  const face = (item: NavItem) => (
    <>
      {item.icon}
      {item.label}
    </>
  );

  return (
    <nav
      ref={rootRef}
      className={[ROOT, joined ? SURFACE : "", className].filter(Boolean).join(" ")}
      data-layout={layout}
      data-items={itemStyle}
      data-collapsed={collapsed ? "" : undefined}
      data-open={open ? "" : undefined}
      data-panel={panelShown ? "" : undefined}
      style={{ ...vars, ...style } as React.CSSProperties}
      aria-label={ariaLabel}
    >
      {logo && (
        <span ref={logoRef} className={[LOGO, joined ? "" : SURFACE].filter(Boolean).join(" ")}>
          <LinkComponent href={logoHref} className={LOGO_LINK} aria-label={logoAlt}>
            <span ref={markRef} className={MARK}>
              {logo}
            </span>
          </LinkComponent>
          {!joined && <span className={RIM} />}
        </span>
      )}

      {!collapsed && (
        <div ref={barRef} className={[BAR, joined ? "" : SURFACE].filter(Boolean).join(" ")}>
          <div ref={trackRef} className={TRACK} onPointerLeave={() => engineRef.current?.leave()}>
            <ul className={LIST}>
              {items.map((item, index) => (
                <li
                  key={`${item.label}-${index}`}
                  ref={(element) => {
                    slotRefs.current[index] = element;
                  }}
                  className={SLOT}
                  data-on={fill && indicator === "pill" && index === activeIndex ? "" : undefined}
                  onPointerEnter={(event) => engineRef.current?.enter(index, event)}
                  onFocus={(event) => engineRef.current?.focus(index, event)}
                  onBlur={() => engineRef.current?.blur()}
                >
                  {link(
                    item,
                    {
                      className: ITEM,
                      "aria-current": index === activeIndex ? "page" : undefined,
                      "aria-label": item.ariaLabel,
                      onClick: (event: React.MouseEvent) => choose(item, index, event),
                    },
                    <>
                      {fill && <span className={FILL} aria-hidden="true" />}
                      <span className={FACE}>{face(item)}</span>
                      {fill && (
                        <span className={FACE_ALT} aria-hidden="true">
                          {face(item)}
                        </span>
                      )}
                    </>
                  )}
                </li>
              ))}
            </ul>
            {glide && <span ref={glideRef} className={GLIDE} aria-hidden="true" />}
            {indicator === "dot" && <span ref={dotRef} className={DOT} aria-hidden="true" />}
          </div>
          {!joined && <span className={RIM} />}
        </div>
      )}

      {collapsed && (
        <button
          ref={toggleRef}
          type="button"
          className={[TOGGLE, joined ? TOGGLE_BARE : SURFACE].join(" ")}
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={toggle}
        >
          <span className={BURGER} aria-hidden="true">
            <span className={LINE_TOP} />
            <span className={LINE_BOTTOM} />
          </span>
          {!joined && <span className={RIM} />}
        </button>
      )}

      {collapsed && panelShown && (
        <div ref={panelRef} id={panelId} className={[PANEL, SURFACE].join(" ")}>
          <ul className={MENU}>
            {items.map((item, index) => (
              <li key={`${item.label}-${index}`}>
                {link(
                  item,
                  {
                    className: ROW,
                    "aria-current": index === activeIndex ? "page" : undefined,
                    onClick: (event: React.MouseEvent) => {
                      choose(item, index, event);
                      setOpen(false);
                      onMenuToggle?.(false);
                    },
                  },
                  face(item)
                )}
              </li>
            ))}
          </ul>
          <span className={RIM} />
        </div>
      )}

      {joined && <span className={ROOT_RIM} />}
    </nav>
  );
}

export default PillNav;
