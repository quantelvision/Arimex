const products = [
  { name: "Pine", line: "Sawn and planed pine for pallets, frames and furniture.", tags: ["Sizes on request", "Bulk orders"] },
  { name: "Spruce", line: "Pale, even spruce boards for packaging and joinery.", tags: ["Sizes on request", "Bulk orders"] },
  { name: "Wooden pallets", line: "2 way, 4 way, Euro size and custom pallets, built to your load.", tags: ["Made to order", "Custom sizes"] },
];

const steps = ["Enquiry", "Quote", "Confirm", "Manufacture", "Quality check", "Dispatch"];

function Placeholder({ label, tall = false }: { label: string; tall?: boolean }) {
  return (
    <div
      className={`flex items-end rounded-xl border border-line p-3 ${tall ? "h-72 md:h-96" : "h-40"}`}
      style={{
        background:
          "repeating-linear-gradient(100deg, var(--ax-wood) 0 14px, color-mix(in srgb, var(--ax-wood) 82%, var(--ax-bg)) 14px 30px)",
      }}
    >
      <span className="rounded bg-surface px-2 py-1 text-xs text-muted">{label}</span>
    </div>
  );
}

export default function Home() {
  return (
    <main className="font-body">
      <header className="sticky top-0 z-40 border-b border-line bg-bg/95 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <span className="heading text-2xl">AriMex</span>
          <ul className="hidden gap-6 text-sm md:flex">
            {["Products", "Pallets", "Process", "About", "Contact"].map((l) => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} className="hover:text-accent">{l}</a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="rounded-lg bg-cta px-4 py-2 text-sm font-semibold text-on-cta">
            Get a quote
          </a>
        </nav>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-14 md:grid-cols-2 md:px-6 md:py-24">
        <div>
          <p className="mb-3 text-sm font-semibold tracking-wide text-accent uppercase">Chennai, made to order</p>
          <h1 className="text-4xl md:text-6xl">Pine, spruce and wooden pallets built to your load</h1>
          <p className="mt-5 max-w-prose text-lg text-muted">
            Tell us the size, quantity and delivery city. We quote, build and dispatch.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="rounded-lg bg-cta px-5 py-3 font-semibold text-on-cta">Request a quote</a>
            <a href="#contact" className="rounded-lg border border-ink px-5 py-3 font-semibold">WhatsApp us</a>
          </div>
        </div>
        <Placeholder label="Hero video or stacked lumber photo" tall />
      </section>

      <section className="border-y border-line bg-surface">
        <ul className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-8 gap-y-2 px-4 py-4 text-sm font-semibold md:px-6">
          {["Made to order", "All pallet types", "Custom sizes", "Chennai based"].map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>

      <section id="products" className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <h2 className="text-3xl md:text-4xl">Three products, done properly</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {products.map((p) => (
            <article key={p.name} className="overflow-hidden rounded-2xl border border-line bg-surface">
              <Placeholder label={`${p.name} photo`} />
              <div className="p-5">
                <h3 className="text-2xl">{p.name}</h3>
                <p className="mt-2 text-muted">{p.line}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full bg-band px-3 py-1 text-xs font-semibold text-on-band">{t}</span>
                  ))}
                </div>
                <a href="#contact" className="mt-5 inline-block font-semibold text-accent underline underline-offset-4">
                  Ask for a price
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="process" className="on-band bg-band text-on-band">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
          <h2 className="text-3xl md:text-4xl">How ordering works</h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {steps.map((s, i) => (
              <li key={s} className="rounded-xl border border-current/25 p-4">
                <span className="heading text-3xl text-on-band">0{i + 1}</span>
                <p className="mt-2 font-semibold">{s}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="contact" className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-5 md:px-6">
        <div className="md:col-span-3">
          <h2 className="text-3xl md:text-4xl">Request a quote</h2>
          <form className="mt-6 grid gap-4 sm:grid-cols-2">
            {["Name", "Phone", "Product", "Quantity", "Size", "Delivery city"].map((f) => (
              <label key={f} className="grid gap-1 text-sm font-semibold">
                {f}
                <input className="rounded-lg border border-line bg-surface px-3 py-2.5 font-normal text-ink" />
              </label>
            ))}
            <label className="grid gap-1 text-sm font-semibold sm:col-span-2">
              Message
              <textarea rows={4} className="rounded-lg border border-line bg-surface px-3 py-2.5 font-normal text-ink" />
            </label>
            <button type="button" className="rounded-lg bg-cta px-5 py-3 font-semibold text-on-cta sm:col-span-2 sm:justify-self-start">
              Send enquiry
            </button>
          </form>
        </div>
        <aside className="rounded-2xl border border-line bg-surface p-6 md:col-span-2">
          <h3 className="text-2xl">Amirtham Imports and Exports</h3>
          <p className="mt-3 text-muted">No 36 A, Appavu Street, Alandur, Chennai 600016</p>
          <p className="mt-3">
            <a href="tel:+917550130234" className="font-semibold text-accent">+91 75501 30234</a>
          </p>
          <p className="mt-1">amirthamtrades@gmail.com</p>
        </aside>
      </section>

      <footer className="on-band bg-band text-on-band">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4 px-4 py-8 text-sm md:px-6">
          <span className="heading text-xl text-on-band">AriMex</span>
          <span>Amirtham Imports and Exports, Chennai</span>
        </div>
      </footer>
    </main>
  );
}
