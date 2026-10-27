import { WhatsappLogoIcon } from "@phosphor-icons/react/ssr";
import Button from "@/components/button";
import Section from "@/components/section";
import StockTable, { type StockRow } from "@/components/stock-table";
import TextLink from "@/components/text-link";
import { stock, whatsappMessages } from "@/content/site";
import { stockList, type StockItem } from "@/content/stock";
import { whatsappUrl } from "@/lib/whatsapp";

const dateFormat = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

function toRows(name: string, items: StockItem[]): StockRow[] {
  return items.map((item, index) => {
    const size = `${item.thickness} x ${item.width}`;
    return {
      id: `${name}-${index}`,
      label: `${name} ${size} mm`,
      size,
      length: item.length?.toString() ?? stock.onRequest,
      quantity: item.quantity?.toString() ?? stock.onRequest,
      grade: item.grade,
      askHref: "#contact",
      whatsappHref: whatsappUrl(whatsappMessages.stockSize(name.toLowerCase(), size)),
    };
  });
}

export default function StockList() {
  const tables = [
    { id: "pine", heading: stock.tables.pine, rows: toRows(stock.tables.pine, stockList.pine) },
    { id: "spruce", heading: stock.tables.spruce, rows: toRows(stock.tables.spruce, stockList.spruce) },
  ].filter((table) => table.rows.length > 0);

  return (
    <Section id="stock" ground="surface" heading={stock.heading} intro={stock.intro}>
      {tables.length > 0 ? (
        <>
          <div className="rounded-md border-l-4 border-wood bg-bg px-5 py-4">
            {stockList.asOf && (
              <p className="font-semibold text-heading">
                {stock.asOfLabel} <time dateTime={stockList.asOf}>{dateFormat.format(new Date(stockList.asOf))}</time>
              </p>
            )}
            {stockList.location && (
              <p className="text-small text-muted">
                {stock.locationLabel}: {stockList.location}
              </p>
            )}
            <p className="mt-1 text-small text-muted">{stock.availabilityNote}</p>
          </div>
          <div className="mt-10 grid gap-12">
            {tables.map((table) => (
              <StockTable
                key={table.id}
                heading={table.heading}
                headingId={`stock-${table.id}`}
                columns={stock.columns}
                rows={table.rows}
                askLabel={stock.askAction}
                whatsappLabel={stock.whatsappAction}
              />
            ))}
          </div>
          <p className="mt-10">
            {stock.otherSizes} <TextLink href="#contact">{stock.emptyAction}</TextLink>
          </p>
        </>
      ) : (
        <div className="max-w-2xl rounded-lg border border-line bg-bg p-6 md:p-8">
          <p className="text-lead text-heading">{stock.emptyState}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="#contact">{stock.emptyAction}</Button>
            <Button href={whatsappUrl(whatsappMessages.general)} variant="secondary" newTab>
              <WhatsappLogoIcon aria-hidden="true" size={20} />
              {stock.whatsappAction}
            </Button>
          </div>
        </div>
      )}
    </Section>
  );
}
