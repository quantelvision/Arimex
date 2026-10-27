import { CheckIcon } from "@phosphor-icons/react/ssr";
import Container from "@/components/container";
import { trustPoints } from "@/content/site";

export default function TrustStrip() {
  return (
    <div className="border-y border-line bg-surface">
      <Container>
        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 py-5 font-semibold text-heading">
          {trustPoints.map((point) => (
            <li key={point} className="flex items-center gap-2">
              <CheckIcon aria-hidden="true" size={20} className="text-accent" />
              {point}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
