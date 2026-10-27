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

const cell = "border border-field px-2.5 py-3.5 sm:px-6 sm:py-5";

export default function StockTable({ heading, headingId, columns, rows, enquireLabel }: StockTableProps) {
  return (
    <div className="min-w-0">
      <h3 id={headingId} className="text-h3">
        {heading}
      </h3>
      <div className="mt-5 overflow-x-auto">
        <table aria-labelledby={headingId} className="w-full border-collapse text-left text-body tabular-nums sm:text-lead md:table-fixed">
          <thead className="bg-band text-small text-on-band sm:text-body">
            <tr>
              <th scope="col" className={`${cell} font-semibold`}>{columns.size}</th>
              <th scope="col" className={`${cell} font-semibold`}>{columns.quantity}</th>
              <th scope="col" className={`${cell} font-semibold`}>{columns.grade}</th>
              <th scope="col" className={`${cell} text-center font-semibold`}>{columns.actions}</th>
            </tr>
          </thead>
          <tbody className="bg-surface">
            {rows.map((row) => (
              <tr key={row.id} className="even:bg-bg">
                <th scope="row" className={`${cell} font-semibold whitespace-nowrap text-heading`}>{row.size}</th>
                <td className={cell}>{row.quantity}</td>
                <td className={cell}>{row.grade}</td>
                <td className="border border-field p-1.5 text-center sm:px-4 sm:py-2">
                  <a
                    href="#contact"
                    data-product={row.product}
                    data-size={row.prefillSize}
                    className="inline-flex min-h-11 items-center justify-center border border-field px-3 text-small font-semibold text-heading hover:bg-ink/5 sm:min-h-12 sm:px-8 sm:text-body"
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
