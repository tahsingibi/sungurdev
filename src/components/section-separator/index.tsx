export default function SectionSeparator() {
  return (
    <div
      aria-hidden="true"
      className="relative left-1/2 h-7 w-screen -translate-x-1/2 border-y border-border bg-[repeating-linear-gradient(135deg,transparent_0,transparent_7px,var(--hatch-line)_7px,var(--hatch-line)_8px)]"
    />
  );
}
