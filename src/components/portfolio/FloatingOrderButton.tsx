import TactileButton from "@/components/dog/TactileButton";

export default function FloatingOrderButton({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <div className="fixed right-5 bottom-5 z-40 sm:right-8 sm:bottom-8">
      <TactileButton
        href={href}
        label={label}
        padding="15px 26px"
        rounded={100}
        base={{ color: "#076876", depth: 5 }}
        colors={{ fill: "#0097B2", textColor: "#F7F4EE" }}
        font={{ fontFamily: "var(--font-inter)", fontSize: "14.5px", fontWeight: 500 }}
      />
    </div>
  );
}
