/** Small menu-card divider: two hairlines and a diamond. */
export default function Ornament({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px w-10 bg-current opacity-40" />
      <span className="size-1.5 rotate-45 bg-current" />
      <span className="h-px w-10 bg-current opacity-40" />
    </span>
  );
}
