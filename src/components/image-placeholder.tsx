export default function ImagePlaceholder({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`bg-[repeating-linear-gradient(100deg,var(--ax-wood)_0_14px,color-mix(in_srgb,var(--ax-wood)_82%,var(--ax-bg))_14px_30px)] ${className}`}
    />
  );
}
