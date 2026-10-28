import { ArrowsOutCardinalIcon, HammerIcon, MapPinIcon, RulerIcon } from "@phosphor-icons/react/ssr";
import Container from "@/components/container";
import { trustPoints } from "@/content/site";

const pointIcons: Record<string, typeof HammerIcon> = {
  "made-to-order": HammerIcon,
  "pallet-types": ArrowsOutCardinalIcon,
  "custom-sizes": RulerIcon,
  location: MapPinIcon,
};

export default function TrustStrip() {
  return (
    <div className="border-y border-line bg-surface">
      <Container>
        <ul className="flex flex-wrap justify-center gap-x-10 gap-y-3 py-5 font-semibold text-heading">
          {trustPoints.map((point) => {
            const PointIcon = pointIcons[point.id];
            return (
              <li key={point.id} data-reveal className="flex items-center gap-2.5">
                <PointIcon aria-hidden="true" size={22} className="shrink-0 text-accent" />
                {point.text}
              </li>
            );
          })}
        </ul>
      </Container>
    </div>
  );
}
