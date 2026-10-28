import type { ReactNode } from "react";
import { Link } from "react-router";

type Variant = "primary" | "light" | "dark" | "outline-light" | "outline-dark";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-tomato text-flour hover:bg-tomato-deep",
  light: "bg-flour text-ink hover:bg-white",
  dark: "bg-ink text-flour hover:bg-ink-2",
  "outline-light": "border border-flour/50 text-flour hover:bg-flour hover:text-ink",
  "outline-dark": "border border-ink/30 text-ink hover:bg-ink hover:text-flour",
};

type Props = {
  children: ReactNode;
  variant?: Variant;
  icon?: string;
  arrow?: boolean;
  className?: string;
  href?: string;
  to?: string;
  external?: boolean;
};

/** Rectangular, menu-card style button. Renders a router Link with `to`, an <a> with `href`. */
export default function Btn({ children, variant = "primary", icon, arrow, className = "", href, to, external }: Props) {
  const cls = `group inline-flex min-h-13 items-center justify-center gap-2.5 rounded-[3px] px-7 text-[13px] font-semibold tracking-[0.14em] uppercase transition-[background-color,color,transform] duration-200 active:scale-[0.97] ${VARIANTS[variant]} ${className}`;
  const inner = (
    <>
      {icon && <i className={`${icon} text-base`} aria-hidden />}
      <span>{children}</span>
      {arrow && (
        <i
          className="ri-arrow-right-line -mr-1 text-base transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1"
          aria-hidden
        />
      )}
    </>
  );
  if (to) return <Link to={to} className={cls}>{inner}</Link>;
  return (
    <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
      {inner}
    </a>
  );
}
