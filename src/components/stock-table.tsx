import { WhatsappLogoIcon } from "@phosphor-icons/react/ssr";
import TextLink from "./text-link";

export type StockRow = {
  id: string;
  label: string;
  size: string;
  length: string;
  quantity: string;
  grade: string;
  askHref: string;
  whatsappHref: string;
};

type StockTableProps = {
  heading: string;
  headingId: string;
  columns: { size: string; length: string; quantity: string; grade: string; actions: string };
  rows: StockRow[];
  askLabel: string;
  whatsappLabel: string;
};

function rowActions(row: StockRow, askLabel: string, whatsappLabel: string) {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2">
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
  );
}

export default function StockTable({ heading, headingId, columns, rows, askLabel, whatsappLabel }: StockTableProps) {
  return (
    <div>
      <h3 id={headingId} className="text-h3">
        {heading}
      </h3>

      <table aria-labelledby={headingId} className="mt-4 hidden w-full border-collapse text-left tabular-nums md:table">
        <thead>
          <tr className="border-b-2 border-field text-small text-muted">
            <th scope="col" className="py-2.5 pr-4 font-semibold">{columns.size}</th>
            <th scope="col" className="py-2.5 pr-4 font-semibold">{columns.length}</th>
            <th scope="col" className="py-2.5 pr-4 font-semibold">{columns.quantity}</th>
            <th scope="col" className="py-2.5 pr-4 font-semibold">{columns.grade}</th>
            <th scope="col" className="py-2.5 font-semibold">{columns.actions}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-line">
              <th scope="row" className="py-3.5 pr-4 font-semibold text-heading">{row.size}</th>
              <td className="py-3.5 pr-4">{row.length}</td>
              <td className="py-3.5 pr-4">{row.quantity}</td>
              <td className="py-3.5 pr-4">{row.grade}</td>
              <td className="py-3.5">{rowActions(row, askLabel, whatsappLabel)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul aria-labelledby={headingId} className="mt-4 grid gap-3 md:hidden">
        {rows.map((row) => (
          <li key={row.id} className="rounded-md border border-line bg-surface p-4">
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 tabular-nums">
              <dt className="text-small text-muted">{columns.size}</dt>
              <dd className="font-semibold text-heading">{row.size}</dd>
              <dt className="text-small text-muted">{columns.length}</dt>
              <dd>{row.length}</dd>
              <dt className="text-small text-muted">{columns.quantity}</dt>
              <dd>{row.quantity}</dd>
              <dt className="text-small text-muted">{columns.grade}</dt>
              <dd>{row.grade}</dd>
            </dl>
            <div className="mt-3 border-t border-line pt-3">{rowActions(row, askLabel, whatsappLabel)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
