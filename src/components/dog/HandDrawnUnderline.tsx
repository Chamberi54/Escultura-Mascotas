export default function HandDrawnUnderline({
  color = "var(--verdigris)",
}: {
  color?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 20"
      preserveAspectRatio="none"
      className="hand-underline pointer-events-none absolute -bottom-1.5 left-0 h-[0.4em] w-full"
    >
      <path
        d="M3,12 Q30,4 55,10 T110,8 T198,13"
        fill="none"
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
      />
    </svg>
  );
}
