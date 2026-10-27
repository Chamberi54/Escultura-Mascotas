const FEATURES = [
  {
    label: "Regalos personalizados",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4}>
        <rect x={3} y={9} width={18} height={11} rx={1} />
        <path d="M3 9h18M12 9v11" />
        <path d="M12 9c-1.5-3-5-4-5-1.5S9 9 12 9c3 0 6.5-1 5-3.5S13.5 6 12 9z" />
      </svg>
    ),
  },
  {
    label: "Piezas únicas",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4}>
        <path d="M12 20s-7-4.5-7-10a4.5 4.5 0 0 1 7-3.5A4.5 4.5 0 0 1 19 10c0 5.5-7 10-7 10z" />
      </svg>
    ),
  },
  {
    label: "Hecho a mano",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4}>
        <path d="M7 13V6a1.5 1.5 0 0 1 3 0v5" />
        <path d="M10 11V4.5a1.5 1.5 0 0 1 3 0V11" />
        <path d="M13 11V5.5a1.5 1.5 0 0 1 3 0V12" />
        <path d="M16 12v-2a1.5 1.5 0 0 1 3 0v6c0 3-2 6-6 6h-1c-3 0-4.5-1-6-3l-2.5-4c-.6-1 .3-2 1.4-1.6L7 14" />
      </svg>
    ),
  },
  {
    label: "Envíos a toda España",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4}>
        <rect x={2} y={7} width={13} height={9} rx={1} />
        <path d="M15 10h4l3 3v3h-7z" />
        <circle cx={7} cy={18} r={1.6} />
        <circle cx={17.5} cy={18} r={1.6} />
      </svg>
    ),
  },
];

export default function FeatureStrip() {
  return (
    <section className="border-b border-line bg-paper-dim">
      <div className="mx-auto grid max-w-[1180px] grid-cols-2 gap-6 px-8 py-8 sm:grid-cols-4">
        {FEATURES.map((feature) => (
          <div key={feature.label} className="flex items-center gap-3">
            <div className="h-6 w-6 shrink-0 text-verdigris-dark">{feature.icon}</div>
            <span className="text-[13px] text-ink-soft">{feature.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
