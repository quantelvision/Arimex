import { WhatsappLogoIcon } from "@phosphor-icons/react/ssr";
import Button from "@/components/button";
import Section from "@/components/section";
import StockTable, { type StockRow } from "@/components/stock-table";
import TextLink from "@/components/text-link";
import { stock, whatsappMessages } from "@/content/site";
import { stockSizes, type StockSize } from "@/content/stock";
import { whatsappUrl } from "@/lib/whatsapp";

function toRows(product: "pine" | "spruce", name: string, sizes: StockSize[]): StockRow[] {
  return sizes.map((item) => {
    const size = `${item.thickness} x ${item.width}`;
    return {
      id: `${product}-${size}`,
      label: `${name} ${size} mm`,
      size,
      quantity: item.quantity?.toString() ?? stock.onRequest,
      grade: item.grade ?? stock.onRequest,
      product,
      prefillSize: item.grade ? `${size} mm, grade ${item.grade}` : `${size} mm`,
    };
  });
}

export default function StockList() {
  const tables = [
    { id: "pine", heading: stock.tables.pine, rows: toRows("pine", stock.tables.pine, stockSizes.pine) },
    { id: "spruce", heading: stock.tables.spruce, rows: toRows("spruce", stock.tables.spruce, stockSizes.spruce) },
  ].filter((table) => table.rows.length > 0);

  return (
    <Section id="stock" ground="surface" heading={stock.heading} intro={stock.intro}>
      {tables.length > 0 ? (
        <>
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-10">
            {tables.map((table) => (
              <StockTable
                key={table.id}
                heading={table.heading}
                headingId={`stock-${table.id}`}
                columns={stock.columns}
                rows={table.rows}
                enquireLabel={stock.askAction}
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
