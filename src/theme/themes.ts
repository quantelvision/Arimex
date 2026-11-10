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
    overlay: string;
    onOverlay: string;
    // letters of the logo: the brand navy on light grounds, the heading colour on dark ones
    logo: string;
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
    id: "pine",
    label: "Natural pine",
    note: "Warm pine tones with a forest green accent. The default.",
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
      overlay: "#1E140C",
      onOverlay: "#FBF7F0",
      logo: "#002F67",
    },
  },
  {
    id: "client",
    label: "Client palette",
    note: "Pink base, deep brown and black cherry, as the client asked.",
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
      overlay: "#240C0E",
      onOverlay: "#FFF1EE",
      logo: "#002F67",
    },
  },
  {
    id: "blush",
    label: "Blush and timber",
    note: "Light base with the client pink as the band colour.",
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
      overlay: "#240C0E",
      onOverlay: "#FFFFFF",
      logo: "#002F67",
    },
  },
  {
    id: "walnut",
    label: "Walnut and cream",
    note: "Cream pages, walnut brown bands and amber links.",
    scheme: "light",
    tokens: {
      bg: "#F6F1EA",
      surface: "#FFFDF9",
      band: "#3B2A20",
      onBand: "#F6F1EA",
      ink: "#2A1E17",
      heading: "#3B2A20",
      muted: "#6B5A4D",
      accent: "#8A4F17",
      cta: "#3B2A20",
      onCta: "#FFFDF9",
      wood: "#B9814F",
      line: "#E6DCCF",
      field: "#8C7869",
      error: "#A8261B",
      shadow: "#3B2A20",
      overlay: "#1F1611",
      onOverlay: "#FFFDF9",
      logo: "#002F67",
    },
  },
  {
    id: "forest",
    label: "Forest and oak",
    note: "Pale sage ground with deep forest green bands.",
    scheme: "light",
    tokens: {
      bg: "#EEF1EA",
      surface: "#FAFBF7",
      band: "#1F3A2B",
      onBand: "#EEF1EA",
      ink: "#1B261F",
      heading: "#1F3A2B",
      muted: "#4D5C52",
      accent: "#2A6440",
      cta: "#1F3A2B",
      onCta: "#FAFBF7",
      wood: "#C49A6C",
      line: "#D7DED3",
      field: "#77877B",
      error: "#A8261B",
      shadow: "#1F3A2B",
      overlay: "#111D16",
      onOverlay: "#FAFBF7",
      logo: "#002F67",
    },
  },
  {
    id: "teak",
    label: "Teak and sand",
    note: "Sandy ground with teak orange buttons.",
    scheme: "light",
    tokens: {
      bg: "#F3E9DA",
      surface: "#FCF7F0",
      band: "#4A2A12",
      onBand: "#FCF7F0",
      ink: "#2E1D10",
      heading: "#4A2A12",
      muted: "#67503C",
      accent: "#934A18",
      cta: "#934A18",
      onCta: "#FFFFFF",
      wood: "#C98B5E",
      line: "#E5D6BF",
      field: "#8F7A63",
      error: "#A8261B",
      shadow: "#4A2A12",
      overlay: "#22140A",
      onOverlay: "#FCF7F0",
      logo: "#002F67",
    },
  },
  {
    id: "cedar",
    label: "Cedar and stone",
    note: "Stone grey ground with red cedar bands.",
    scheme: "light",
    tokens: {
      bg: "#EFEBE7",
      surface: "#FAF8F6",
      band: "#6B2C1D",
      onBand: "#FAF8F6",
      ink: "#2A211E",
      heading: "#5A2418",
      muted: "#5C524D",
      accent: "#9A3A22",
      cta: "#6B2C1D",
      onCta: "#FAF8F6",
      wood: "#C67B52",
      line: "#DDD6D0",
      field: "#887D77",
      error: "#9F1D1D",
      shadow: "#3A1A12",
      overlay: "#1F120E",
      onOverlay: "#FAF8F6",
      logo: "#002F67",
    },
  },
  {
    id: "birch",
    label: "Birch and slate",
    note: "Cool, light birch with slate blue bands.",
    scheme: "light",
    tokens: {
      bg: "#EEF0F2",
      surface: "#FFFFFF",
      band: "#2C3A47",
      onBand: "#EEF0F2",
      ink: "#1E262E",
      heading: "#2C3A47",
      muted: "#535E69",
      accent: "#2B5A85",
      cta: "#2C3A47",
      onCta: "#FFFFFF",
      wood: "#D2B48C",
      line: "#D9DEE3",
      field: "#7B8691",
      error: "#B3261E",
      shadow: "#2C3A47",
      overlay: "#141B22",
      onOverlay: "#FFFFFF",
      logo: "#002F67",
    },
  },
  {
    id: "kraft",
    label: "Kraft paper",
    note: "Brown paper ground, black ink and a rust accent.",
    scheme: "light",
    tokens: {
      bg: "#EBDFCB",
      surface: "#F7F0E4",
      band: "#1F1B16",
      onBand: "#F7F0E4",
      ink: "#1F1B16",
      heading: "#1F1B16",
      muted: "#574A3A",
      accent: "#8C3417",
      cta: "#1F1B16",
      onCta: "#F7F0E4",
      wood: "#B58457",
      line: "#D8C8AE",
      field: "#7F6F5B",
      error: "#9F1D1D",
      shadow: "#1F1B16",
      overlay: "#15120E",
      onOverlay: "#F7F0E4",
      logo: "#002F67",
    },
  },
  {
    id: "dark",
    label: "Dark timber",
    note: "Black cherry ground with pink and wood highlights.",
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
      overlay: "#160708",
      onOverlay: "#FCD5CE",
      logo: "#FCD5CE",
    },
  },
  {
    id: "charcoal",
    label: "Charcoal and sawdust",
    note: "Dark charcoal with sawdust gold highlights.",
    scheme: "dark",
    tokens: {
      bg: "#1C1B19",
      surface: "#262421",
      band: "#33302B",
      onBand: "#F1E6D2",
      ink: "#EDE6DA",
      heading: "#F6EEDF",
      muted: "#B8AE9F",
      accent: "#E0B272",
      cta: "#E0B272",
      onCta: "#1C1B19",
      wood: "#C98B5E",
      line: "#3A3732",
      field: "#8C857A",
      error: "#FF9C8F",
      shadow: "#000000",
      overlay: "#0E0D0C",
      onOverlay: "#F6EEDF",
      logo: "#F6EEDF",
    },
  },
  {
    id: "night-spruce",
    label: "Night spruce",
    note: "Deep spruce green, dark, with soft green highlights.",
    scheme: "dark",
    tokens: {
      bg: "#121A16",
      surface: "#1A241F",
      band: "#23332B",
      onBand: "#E3EDE6",
      ink: "#E3EDE6",
      heading: "#EEF5F0",
      muted: "#A9B8AE",
      accent: "#9FD0A8",
      cta: "#9FD0A8",
      onCta: "#121A16",
      wood: "#C49A6C",
      line: "#2A3A32",
      field: "#7E9086",
      error: "#FF9C8F",
      shadow: "#000000",
      overlay: "#0B110E",
      onOverlay: "#EEF5F0",
      logo: "#EEF5F0",
    },
  },
];

const serif = "Georgia, 'Times New Roman', serif";
const sans = "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

export const fontPairings: FontPairing[] = [
  {
    id: "geometric",
    label: "Manrope",
    note: "One geometric family, clean and modern.",
    heading: { family: `'Manrope Variable', ${sans}`, weight: 800, stretch: "100%", tracking: "-0.02em" },
    body: { family: `'Manrope Variable', ${sans}` },
  },
  {
    id: "sturdy",
    label: "Bitter and Source Sans 3",
    note: "Slab serif headings, like a stamped crate.",
    heading: { family: `'Bitter Variable', ${serif}`, weight: 700, stretch: "100%", tracking: "-0.01em" },
    body: { family: `'Source Sans 3 Variable', ${sans}` },
  },
  {
    id: "editorial",
    label: "Literata and Public Sans",
    note: "Calm book serif, premium and trustworthy.",
    heading: { family: `'Literata Variable', ${serif}`, weight: 600, stretch: "100%", tracking: "-0.015em" },
    body: { family: `'Public Sans Variable', ${sans}` },
  },
  {
    id: "industrial",
    label: "Archivo Condensed and Archivo",
    note: "One family with condensed headings, plain B2B.",
    heading: { family: `'Archivo Variable', ${sans}`, weight: 700, stretch: "75%", tracking: "0" },
    body: { family: `'Archivo Variable', ${sans}` },
  },
  {
    id: "warm",
    label: "Gelasio and Figtree",
    note: "Warm, rounded serif over a friendly modern body.",
    heading: { family: `'Gelasio Variable', ${serif}`, weight: 700, stretch: "100%", tracking: "-0.01em" },
    body: { family: `'Figtree Variable', ${sans}` },
  },
  {
    id: "workshop",
    label: "Aleo and Work Sans",
    note: "Soft workshop slab with a plain body.",
    heading: { family: `'Aleo Variable', ${serif}`, weight: 700, stretch: "100%", tracking: "-0.01em" },
    body: { family: `'Work Sans Variable', ${sans}` },
  },
  {
    id: "freight",
    label: "Oswald and Libre Franklin",
    note: "Tall condensed headings, like freight labels.",
    heading: { family: `'Oswald Variable', ${sans}`, weight: 600, stretch: "100%", tracking: "0.01em" },
    body: { family: `'Libre Franklin Variable', ${sans}` },
  },
  {
    id: "classic",
    label: "Lora and Nunito Sans",
    note: "Classic serif with a friendly, rounded body.",
    heading: { family: `'Lora Variable', ${serif}`, weight: 600, stretch: "100%", tracking: "-0.01em" },
    body: { family: `'Nunito Sans Variable', ${sans}` },
  },
  {
    id: "technical",
    label: "Red Hat Display and Red Hat Text",
    note: "Precise and technical, suits spec heavy pages.",
    heading: { family: `'Red Hat Display Variable', ${sans}`, weight: 700, stretch: "100%", tracking: "-0.015em" },
    body: { family: `'Red Hat Text Variable', ${sans}` },
  },
  {
    id: "premium",
    label: "Cormorant and Source Sans 3",
    note: "High contrast serif for a premium feel.",
    heading: { family: `'Cormorant Variable', ${serif}`, weight: 700, stretch: "100%", tracking: "0" },
    body: { family: `'Source Sans 3 Variable', ${sans}` },
  },
];

// neutral colours for the theme engine window, so it reads the same over every palette
export const engineUi = {
  surface: "#FFFFFF",
  subtle: "#F4F4F5",
  line: "#E4E4E7",
  text: "#18181B",
  muted: "#52525B",
  focus: "#2563EB",
  font: sans,
};

export const roundness = { initial: 1, min: 0, max: 2, step: 0.1 };

export const defaultPalette = "pine";
export const defaultFont = "geometric";

// email clients cannot read the site's CSS variables or load its web fonts, so the enquiry email takes the default palette directly
export const emailTheme = {
  colors: (palettes.find((palette) => palette.id === defaultPalette) ?? palettes[0]).tokens,
  font: "Manrope, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
};

export const switcherEnabled = process.env.NEXT_PUBLIC_THEME_SWITCHER !== "off";

export const storageKeys = {
  palette: "arimex-palette",
  font: "arimex-font",
  roundness: "arimex-roundness",
  position: "arimex-engine-position",
};

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

  const engineVars = Object.entries(engineUi)
    .map(([k, v]) => `--ax-ui-${k}:${v};`)
    .join("");
  const shared = `:root{--ax-round:${roundness.initial};${engineVars}}`;

  return [shared, ...paletteBlocks, ...fontBlocks].join("\n");
}

export function noFlashScript(): string {
  const p = JSON.stringify(palettes.map((x) => x.id));
  const f = JSON.stringify(fontPairings.map((x) => x.id));
  return `(function(){try{var d=document.documentElement,q=new URLSearchParams(location.search),P=${p},F=${f};
var t=q.get("theme")||localStorage.getItem("${storageKeys.palette}");
var n=q.get("font")||localStorage.getItem("${storageKeys.font}");
var r=parseFloat(q.get("round")||localStorage.getItem("${storageKeys.roundness}"));
if(P.indexOf(t)>-1)d.dataset.theme=t;if(F.indexOf(n)>-1)d.dataset.font=n;
if(r>=${roundness.min}&&r<=${roundness.max})d.style.setProperty("--ax-round",r);}catch(e){}})();`;
}
