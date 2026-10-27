export type Palette = {
  id: string;
  label: string;
  note: string;
  scheme: "light" | "dark";
  tokens: {
    bg: string;
    surface: string;
    band: string;
    onBand: string;
    ink: string;
    heading: string;
    muted: string;
    accent: string;
    cta: string;
    onCta: string;
    wood: string;
    line: string;
    field: string;
    error: string;
    shadow: string;
  };
};

export type FontPairing = {
  id: string;
  label: string;
  note: string;
  heading: { family: string; weight: number; stretch: string; tracking: string };
  body: { family: string };
};

export const palettes: Palette[] = [
  {
    id: "client",
    label: "A. Client palette",
    note: "Pink base, deep brown and black cherry as requested",
    scheme: "light",
    tokens: {
      bg: "#FCD5CE",
      surface: "#FFF1EE",
      band: "#410200",
      onBand: "#FCD5CE",
      ink: "#240C0E",
      heading: "#410200",
      muted: "#6B3A30",
      accent: "#8E3B16",
      cta: "#240C0E",
      onCta: "#FCD5CE",
      wood: "#C98B5E",
      line: "#EDB4A8",
      field: "#A0665A",
      error: "#A3121B",
      shadow: "#410200",
    },
  },
  {
    id: "blush",
    label: "B. Blush and timber",
    note: "Light base, client pink as the signature band",
    scheme: "light",
    tokens: {
      bg: "#FDF3EE",
      surface: "#FFFFFF",
      band: "#FCD5CE",
      onBand: "#240C0E",
      ink: "#240C0E",
      heading: "#410200",
      muted: "#6E4A3F",
      accent: "#8E3B16",
      cta: "#8E3B16",
      onCta: "#FFFFFF",
      wood: "#C98B5E",
      line: "#F0D9CF",
      field: "#A07A6E",
      error: "#B3261E",
      shadow: "#410200",
    },
  },
  {
    id: "dark",
    label: "C. Dark timber",
    note: "Black cherry ground, pink and wood as highlights",
    scheme: "dark",
    tokens: {
      bg: "#240C0E",
      surface: "#341416",
      band: "#410200",
      onBand: "#FCD5CE",
      ink: "#FCD5CE",
      heading: "#FCD5CE",
      muted: "#C9A49C",
      accent: "#E9B48A",
      cta: "#E9B48A",
      onCta: "#240C0E",
      wood: "#C98B5E",
      line: "#4A2226",
      field: "#A0766E",
      error: "#FF9C8F",
      shadow: "#000000",
    },
  },
  {
    id: "pine",
    label: "D. Natural pine",
    note: "Neutral fallback with no pink, for comparison",
    scheme: "light",
    tokens: {
      bg: "#F4EDE1",
      surface: "#FBF7F0",
      band: "#2B1D12",
      onBand: "#F4EDE1",
      ink: "#2B1D12",
      heading: "#2B1D12",
      muted: "#6B5847",
      accent: "#2F5D3A",
      cta: "#2F5D3A",
      onCta: "#FFFFFF",
      wood: "#C98B5E",
      line: "#E2D6C3",
      field: "#8C7C68",
      error: "#A8261B",
      shadow: "#2B1D12",
    },
  },
];

const serif = "Georgia, 'Times New Roman', serif";
const sans = "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

export const fontPairings: FontPairing[] = [
  {
    id: "sturdy",
    label: "1. Bitter and Source Sans 3",
    note: "Slab serif headings, like a stamped crate",
    heading: { family: `'Bitter Variable', ${serif}`, weight: 700, stretch: "100%", tracking: "-0.01em" },
    body: { family: `'Source Sans 3 Variable', ${sans}` },
  },
  {
    id: "editorial",
    label: "2. Literata and Public Sans",
    note: "Calm book serif, premium and trustworthy",
    heading: { family: `'Literata Variable', ${serif}`, weight: 600, stretch: "100%", tracking: "-0.015em" },
    body: { family: `'Public Sans Variable', ${sans}` },
  },
  {
    id: "industrial",
    label: "3. Archivo Condensed and Archivo",
    note: "One family, condensed headings, plain B2B",
    heading: { family: `'Archivo Variable', ${sans}`, weight: 700, stretch: "75%", tracking: "0" },
    body: { family: `'Archivo Variable', ${sans}` },
  },
];

export const defaultPalette = "client";
export const defaultFont = "sturdy";

export const switcherEnabled = process.env.NEXT_PUBLIC_THEME_SWITCHER !== "off";

export const storageKeys = { palette: "arimex-palette", font: "arimex-font" };

const kebab = (s: string) => s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);

export function buildThemeCss(): string {
  const paletteBlocks = palettes.map((p) => {
    const vars = Object.entries(p.tokens)
      .map(([k, v]) => `--ax-${kebab(k)}:${v};`)
      .join("") + `color-scheme:${p.scheme};`;
    const sel = p.id === defaultPalette ? `:root,[data-theme="${p.id}"]` : `[data-theme="${p.id}"]`;
    return `${sel}{${vars}}`;
  });

  const fontBlocks = fontPairings.map((f) => {
    const vars =
      `--ax-font-heading:${f.heading.family};` +
      `--ax-heading-weight:${f.heading.weight};` +
      `--ax-heading-stretch:${f.heading.stretch};` +
      `--ax-heading-tracking:${f.heading.tracking};` +
      `--ax-font-body:${f.body.family};`;
    const sel = f.id === defaultFont ? `:root,[data-font="${f.id}"]` : `[data-font="${f.id}"]`;
    return `${sel}{${vars}}`;
  });

  return [...paletteBlocks, ...fontBlocks].join("\n");
}

export function noFlashScript(): string {
  const p = JSON.stringify(palettes.map((x) => x.id));
  const f = JSON.stringify(fontPairings.map((x) => x.id));
  return `(function(){try{var d=document.documentElement,q=new URLSearchParams(location.search),P=${p},F=${f};
var t=q.get("theme")||localStorage.getItem("${storageKeys.palette}");
var n=q.get("font")||localStorage.getItem("${storageKeys.font}");
if(P.indexOf(t)>-1)d.dataset.theme=t;if(F.indexOf(n)>-1)d.dataset.font=n;}catch(e){}})();`;
}
