import { WhatsappLogoIcon } from "@phosphor-icons/react/ssr";
import TextLink from "./text-link";

export type StockRow = {
  id: string;
  label: string;
  size: string;
  askHref: string;
  whatsappHref: string;
};

type StockTableProps = {
  heading: string;
  headingId: string;
  columns: { size: string; actions: string };
  rows: StockRow[];
  askLabel: string;
  whatsappLabel: string;
};

export default function StockTable({ heading, headingId, columns, rows, askLabel, whatsappLabel }: StockTableProps) {
  return (
    <div>
      <h3 id={headingId} className="text-h3">
        {heading}
      </h3>
      <table aria-labelledby={headingId} className="mt-4 w-full border-collapse text-left tabular-nums">
        <thead>
          <tr className="border-b-2 border-field text-small text-muted">
            <th scope="col" className="py-2.5 pr-4 font-semibold">{columns.size}</th>
            <th scope="col" className="py-2.5 font-semibold">{columns.actions}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-line">
              <th scope="row" className="py-3 pr-4 font-semibold whitespace-nowrap text-heading">{row.size}</th>
              <td className="py-3">
                <div className="flex flex-wrap gap-x-5 gap-y-1">
                  <TextLink href={row.askHref}>
                    {askLabel}
                    <span className="sr-only">: {row.label}</span>
                  </TextLink>
                  <TextLink href={row.whatsappHref} newTab>
                    <WhatsappLogoIcon aria-hidden="true" size="1.2em" className="mr-1.5 inline align-[-0.2em]" />
                    {whatsappLabel}
                    <span className="sr-only">: {row.label}</span>
                  </TextLink>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
