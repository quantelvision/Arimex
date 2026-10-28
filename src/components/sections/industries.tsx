import {
  ArmchairIcon,
  FactoryIcon,
  HardHatIcon,
  ShippingContainerIcon,
  WarehouseIcon,
} from "@phosphor-icons/react/ssr";
import Section from "@/components/section";
import { industries } from "@/content/site";

const sectorIcons: Record<string, typeof FactoryIcon> = {
  exporters: ShippingContainerIcon,
  manufacturing: FactoryIcon,
  warehousing: WarehouseIcon,
  construction: HardHatIcon,
  furniture: ArmchairIcon,
};

export default function Industries() {
  return (
    <Section id="industries" ground="surface" heading={industries.heading} intro={industries.intro}>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {industries.sectors.map((sector) => {
          const SectorIcon = sectorIcons[sector.id];
          return (
            <li key={sector.id} data-reveal className="rounded-lg border border-line bg-bg p-5">
              <SectorIcon aria-hidden="true" size={32} className="text-accent" />
              <h3 className="mt-4 text-h3">{sector.name}</h3>
              <p className="mt-2 text-small text-muted">{sector.text}</p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
