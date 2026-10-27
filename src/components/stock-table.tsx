export type StockRow = {
  id: string;
  label: string;
  size: string;
  quantity: string;
  grade: string;
  product: string;
  prefillSize: string;
};

type StockTableProps = {
  heading: string;
  headingId: string;
  columns: { size: string; quantity: string; grade: string; actions: string };
  rows: StockRow[];
  enquireLabel: string;
};

const cell = "px-3 py-3 sm:px-4";

export default function StockTable({ heading, headingId, columns, rows, enquireLabel }: StockTableProps) {
  return (
    <div>
      <h3 id={headingId} className="text-h3">
        {heading}
      </h3>
      <div className="mt-4 overflow-x-auto rounded-lg border border-field">
        <table aria-labelledby={headingId} className="w-full border-collapse text-left tabular-nums">
          <thead className="bg-band text-on-band">
            <tr className="divide-x divide-on-band/20 text-small">
              <th scope="col" className={`${cell} font-semibold`}>{columns.size}</th>
              <th scope="col" className={`${cell} font-semibold`}>{columns.quantity}</th>
              <th scope="col" className={`${cell} font-semibold`}>{columns.grade}</th>
              <th scope="col" className={`${cell} text-center font-semibold`}>{columns.actions}</th>
            </tr>
          </thead>
          <tbody className="bg-surface">
            {rows.map((row) => (
              <tr key={row.id} className="divide-x divide-line border-t border-line even:bg-bg">
                <th scope="row" className={`${cell} font-semibold whitespace-nowrap text-heading`}>{row.size}</th>
                <td className={cell}>{row.quantity}</td>
                <td className={cell}>{row.grade}</td>
                <td className="px-2 py-1.5 text-center sm:px-3">
                  <a
                    href="#contact"
                    data-product={row.product}
                    data-size={row.prefillSize}
                    className="inline-flex min-h-11 items-center justify-center rounded-md border border-field px-3 text-small font-semibold text-heading hover:bg-ink/5"
                  >
                    {enquireLabel}
                    <span className="sr-only">: {row.label}</span>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
