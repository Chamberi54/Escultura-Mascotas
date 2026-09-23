export default function PreferredSourceBadge() {
  return (
    <div className="mt-4 flex flex-col items-center gap-2">
      <span className="font-mono text-[10.5px] tracking-[0.08em] text-ink-soft/70 uppercase">
        Síguenos en Google
      </span>
      <div
        {...{ "google-add-preferred-source-btn": "" }}
        data-theme="light"
        data-lang="es"
      />
    </div>
  );
}
