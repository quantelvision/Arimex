export const business = {
  brand: "AriMex",
  legalName: "Amirtham Imports and Exports",
  address: {
    street: "No 36 A, Appavu Street",
    locality: "Alandur",
    city: "Chennai",
    postalCode: "600016",
    region: "Tamil Nadu",
    country: "India",
    countryCode: "IN",
  },
  phone: { display: "+91 75501 30234", tel: "+917550130234" },
  whatsapp: "917550130234",
  // TODO(client): confirm the business email, proposal is sales@arimex.in (open question 4)
  email: "amirthamtrades@gmail.com",
  gstin: "33DGVPP8566G1ZK",
};

// title up to 50 characters and description up to 90 (Quantel Vision, 10 Nov 2026)
export const meta = {
  title: "Pine, Spruce and Wooden Pallets, Chennai | AriMex",
  description: "Imported pine and spruce timber, and wooden pallets made to order. Alandur, Chennai.",
  locale: "en_IN",
  language: "en-IN",
};

export const nav = {
  label: "Main",
  skipLink: "Skip to content",
  links: [
    { label: "Products", href: "#products" },
    { label: "Sizes", href: "#stock" },
    { label: "Pallets", href: "#pallets" },
    { label: "How it works", href: "#process" },
    { label: "About", href: "#about" },
    { label: "FAQ", href: "#faq" },
  ],
  quoteAction: "Get a quote",
  openMenu: "Open menu",
  closeMenu: "Close menu",
};

export const hero = {
  heading: "Your trusted partner for premium timber and pallet solutions",
  lead: "Spruce and pine timber supplied across India, and wooden pallets built to your order.",
  quoteAction: "Request a quote",
  whatsappAction: "Chat on WhatsApp",
  // TODO(client): replace with a photo or video of AriMex stock (open question 9)
  media: {
    poster: "/images/hero-poster.jpg",
    // the first match plays: a centre crop for portrait screens, full size for wide ones
    videos: [
      { media: "(orientation: portrait)", webm: "/videos/hero-portrait.webm", mp4: "/videos/hero-portrait.mp4" },
      { media: "(min-width: 1280px)", webm: "/videos/hero-1080.webm", mp4: "/videos/hero-1080.mp4" },
      { media: "all", webm: "/videos/hero-720.webm", mp4: "/videos/hero-720.mp4" },
    ],
    alt: "Aerial view of stacked sawn timber in a timber yard",
  },
  pauseVideo: "Pause background video",
  playVideo: "Play background video",
};

export const trustPoints = [
  { id: "made-to-order", text: "Pallets made to order" },
  { id: "pallet-types", text: "2 way, 4 way and Euro size" },
  { id: "custom-sizes", text: "Custom sizes" },
  { id: "location", text: "Based in Alandur, Chennai" },
];

export const productOptions = [
  { value: "pine", label: "Pine" },
  { value: "spruce", label: "Spruce" },
  { value: "pallets", label: "Wooden pallets" },
  { value: "other", label: "Other" },
];

export const products = {
  heading: "Our products",
  intro: "Two softwoods, and pallets built to your order. Ask for a price on any of them and the quote form opens with that product selected.",
  usesLabel: "Common uses",
  specsLabel: "Specs",
  cards: [
    {
      id: "pine",
      name: "Pine",
      category: "Softwood timber",
      summary: "A warm, yellow-toned softwood with visible knots and resin. Easy to cut, nail and finish.",
      uses: ["Pallets and crates", "Door and window frames", "Furniture and joinery", "Building and site work"],
      // TODO(client): finish, grades, drying and origin for pine (open questions 6 and 7)
      specs: [
        { label: "Sizes", value: "See the sizes table, or ask for your size" },
        { label: "Grade and drying", value: "Confirmed in your quote" },
      ],
      action: "Ask for a pine price",
      image: "/images/products/pine.jpg",
      imageAlt: "Stacked sawn pine boards with knots and resin streaks, separated by spacer sticks",
    },
    {
      id: "spruce",
      name: "Spruce",
      category: "Softwood timber",
      summary: "A pale softwood, close to white, with small knots and an even look. Light to handle and clean to finish.",
      uses: ["Packaging and crates", "Pallets", "Interior joinery", "Light framing"],
      // TODO(client): finish, grades, drying and origin for spruce (open questions 6 and 7)
      specs: [
        { label: "Sizes", value: "See the sizes table, or ask for your size" },
        { label: "Grade and drying", value: "Confirmed in your quote" },
      ],
      action: "Ask for a spruce price",
      image: "/images/products/spruce.jpg",
      imageAlt: "Pale planed spruce boards with small knots, stacked in a timber warehouse",
    },
    {
      id: "pallets",
      name: "Wooden pallets",
      category: "Made to order",
      summary: "Built after you order, to the size and load you need. We make 2 way, 4 way, Euro size and custom pallets.",
      uses: ["Factory dispatch", "Warehouse storage", "Shipping and logistics", "Heavy or odd-shaped loads"],
      specs: [
        { label: "Types", value: "2 way, 4 way, Euro size, custom" },
        { label: "Sizes", value: "Built to your dimensions" },
        // TODO(client): wood used, load ratings, lead time and minimum order (open question 8)
        { label: "Wood and load", value: "Matched to your load in the quote" },
      ],
      action: "Ask for a pallet price",
      image: "/images/products/pallets.jpg",
      imageAlt: "A stack of new wooden block pallets on a warehouse floor",
    },
  ],
};

export const gallery = {
  heading: "Gallery",
  initialCount: 10,
  moreAction: "Add more",
  shownNote: (shown: number, total: number) => `Showing ${shown} of ${total} photos`,
  dialogLabel: "Photo gallery",
  closeLabel: "Close gallery",
  previousLabel: "Previous photo",
  nextLabel: "Next photo",
  position: (current: number, total: number) => `${current} of ${total}`,
  thumbnailsLabel: "All photos",
  showPhoto: (current: number) => `Show photo ${current}`,
  altFallback: (current: number) => `Timber photo ${current}`,
};

export const stock = {
  heading: "Sizes we supply",
  intro: "Pine and spruce sizes we supply. Ask about a size and we confirm availability and price.",
  tables: { pine: "Pine", spruce: "Spruce" },
  columns: { size: "Size (mm)", quantity: "Quantity (m³)", grade: "Grade", actions: "Enquire" },
  onRequest: "On request",
  askAction: "Enquire",
  whatsappAction: "WhatsApp",
  otherSizes: "Need a size that is not listed? Ask us and we will check.",
  emptyState: "Our size list is being updated. Tell us the size you need and we will check.",
  emptyAction: "Ask about a size",
};

export const pallets = {
  heading: "Pallets made to order",
  intro: "We build each batch after you confirm the order, so every pallet is made for your load and the way you handle it.",
  timber: {
    heading: "Sizes",
    action: "Ask about this size",
    // TODO(client): taken from the two packing lists sent on 2 Nov 2026; confirm these are the regular sizes (open question 14)
    sizes: [
      { thickness: 47, width: 150 },
      { thickness: 47, width: 175 },
      { thickness: 63, width: 175 },
      { thickness: 75, width: 200 },
    ],
  },
  typesHeading: "Pallet types",
  types: [
    {
      id: "two-way",
      name: "2 way",
      description: "Forklift entry from two opposite sides. A simple build for floor storage and one-way dispatch.",
    },
    {
      id: "four-way",
      name: "4 way",
      description: "Entry from all four sides, so forklifts and pallet jacks can lift it from any direction.",
    },
    {
      id: "euro",
      name: "Euro size",
      description: "Built to the 1200 x 800 mm European footprint.",
    },
    {
      id: "custom",
      name: "Custom",
      description: "Any length, width and height, built to your drawing, a photo or a sample pallet.",
    },
  ] as const,
  briefHeading: "What to tell us",
  brief: [
    "Pallet size: length, width and height",
    "Load per pallet in kg, and whether it sits evenly",
    "Quantity",
    "Single use or reusable",
    "How it is handled: forklift, pallet jack or racking",
    "Domestic or export shipment",
    "Delivery city",
  ],
  matchNote: "To copy a pallet you already use, send a photo and its measurements on WhatsApp.",
  action: "Ask for a pallet price",
};

export const ordering = {
  heading: "How ordering works",
  intro: "Six steps from your first message to delivery.",
  stepLabel: "Step",
  steps: [
    {
      id: "enquiry",
      title: "Enquiry",
      text: "Send the product, size, quantity and delivery city by form, phone or WhatsApp.",
    },
    {
      id: "quote",
      title: "Quote",
      // TODO(client): what a quote includes, for example transport and GST
      text: "We reply with a price and the time the order will take.",
    },
    {
      id: "confirm",
      title: "Confirm",
      // TODO(client): payment terms
      text: "You confirm the order and the payment terms. Work starts only after this.",
    },
    {
      id: "manufacture",
      title: "Manufacture",
      text: "Pallets are built to your specification. Timber is prepared to the sizes you ordered.",
    },
    {
      id: "quality-check",
      title: "Quality check",
      text: "We check sizes and build quality against your order before dispatch.",
    },
    {
      id: "dispatch",
      title: "Dispatch",
      // TODO(client): delivery area and who arranges transport (open question 1)
      text: "Your order leaves for the delivery city in your quote.",
    },
  ],
};

export const quality = {
  heading: "Quality and specs",
  intro: "Every order is quoted against your specification. These are the points to tell us.",
  points: [
    {
      title: "Species",
      text: "Pine for warm colour and visible grain, spruce for a pale, even surface.",
    },
    {
      title: "Size",
      text: "Thickness, width and length in millimetres, and how many pieces or cubic metres you need.",
    },
    {
      title: "Grade and appearance",
      text: "How many knots are acceptable, and whether the faces will be on show.",
    },
    {
      title: "Drying",
      // TODO(client): kiln dried or not, and moisture content (open question 6)
      text: "Tell us the moisture level your work needs and we confirm what we can supply.",
    },
    {
      title: "Treatment",
      // TODO(client): heat treatment and ISPM-15 status (open question 5)
      text: "If your shipment needs heat treated wood, say so in your enquiry and we confirm before quoting.",
    },
  ],
};

export const industries = {
  heading: "Who we supply",
  // TODO(client): confirm the market, Chennai and Tamil Nadu only or export too (open question 1)
  intro: "Businesses that use timber and pallets in their daily work.",
  sectors: [
    { id: "exporters", name: "Exporters", text: "Pallets sized to your cartons and your container load." },
    { id: "manufacturing", name: "Manufacturing", text: "Pallets for moving goods through the plant and out to customers." },
    { id: "warehousing", name: "Warehousing and logistics", text: "Pallets that suit your storage and handling equipment." },
    { id: "construction", name: "Construction", text: "Pine and spruce for framing and site work." },
    { id: "furniture", name: "Furniture and joinery", text: "Pine and spruce boards for frames and panels." },
  ],
};

export const about = {
  heading: "About AriMex",
  tagline: "Premium timber. Trusted supply.",
  paragraphs: [
    "AriMex is the timber and pallet brand of Amirtham Imports and Exports, based in Alandur, Chennai. We trade high quality spruce and pine timber imported from around the world, and supply pallets to businesses in many industries.",
    "We focus on reliable, cost-effective products for logistics, packaging and material handling.",
  ],
  detailsHeading: "Business details",
  detailLabels: { legalName: "Legal name", brand: "Brand", gstin: "GSTIN", base: "Based in" },
};

export const faq = {
  heading: "Questions buyers ask",
  // only entries marked confirmed rest on facts the client has given, and only those go into the FAQPage structured data
  entries: [
    {
      question: "What is the minimum order?",
      // TODO(client): minimum order for timber and for pallets (open question 8)
      answer: "It depends on the product and size. Tell us the quantity you need and we will confirm.",
    },
    {
      question: "How long does a pallet order take?",
      // TODO(client): typical pallet lead time (open question 8)
      answer: "Pallets are made after you confirm the order. The time depends on the design and quantity, and we state it in your quote.",
    },
    {
      question: "Can you make pallets in custom sizes?",
      answer: "Yes. We build to the length, width and height you give us, for the load you describe. A drawing, a photo or a sample pallet helps.",
      confirmed: true,
    },
    {
      question: "Do you supply heat treated pallets for export?",
      // TODO(client): heat treatment and ISPM-15 status (open question 5)
      answer: "Tell us the destination when you enquire and we will confirm what we can supply for that shipment.",
    },
    {
      question: "Is your pine and spruce kiln dried?",
      // TODO(client): drying method and moisture content (open question 6)
      answer: "Tell us the moisture level your work needs and we will confirm before quoting.",
    },
    {
      question: "Which sizes of pine and spruce do you have?",
      answer: "The sizes table shows the pine and spruce sizes we supply. Ask us about any other size.",
    },
    {
      question: "How is timber priced?",
      // TODO(client): price unit, per cubic foot or per cubic metre
      answer: "We quote per order, based on size, grade and quantity.",
    },
    {
      question: "Which areas do you deliver to?",
      // TODO(client): delivery area (open question 1)
      answer: "We are based in Alandur, Chennai. Tell us your delivery city and we will confirm delivery in your quote.",
    },
    {
      question: "What are your payment terms?",
      // TODO(client): payment terms
      answer: "Payment terms are agreed when you confirm the order.",
    },
    {
      question: "Do you provide a GST invoice?",
      answer: `Yes. ${business.legalName} is GST registered, GSTIN ${business.gstin}.`,
      confirmed: true,
    },
    {
      question: "Can I see the wood before a bulk order?",
      // TODO(client): samples and stock visits
      answer: "Ask us about a sample or a visit to see the stock.",
    },
  ],
};

export const contact = {
  heading: "Request a quote",
  intro: "Send the details below and we reply by phone, WhatsApp or email.",
  detailsHeading: "Contact details",
  labels: { phone: "Phone", whatsapp: "WhatsApp", email: "Email", address: "Address" },
  mapAction: "Open in Google Maps",
};

export const enquiryForm = {
  fields: {
    name: { label: "Name" },
    company: { label: "Company" },
    phone: { label: "Phone", hint: "Mobile or landline, with or without +91" },
    email: { label: "Email" },
    product: { label: "Product", placeholder: "Choose a product" },
    quantity: { label: "Quantity", hint: "Pieces, pallets or cubic metres" },
    size: { label: "Size or specification", hint: "For example 1200 x 1000 mm, 4 way, 1000 kg load" },
    city: { label: "Delivery city" },
    message: { label: "Message", hint: "Anything else we should know" },
    honeypot: { label: "Leave this field empty" },
  },
  optionalLabel: "(optional)",
  requiredNote: "Name, phone and product are required.",
  submit: "Send enquiry",
  sending: "Sending",
  success: {
    heading: "Enquiry received",
    text: "Thank you. We will reply by phone or WhatsApp.",
    anotherAction: "Send another enquiry",
  },
  errors: {
    summary: "Please fix the fields marked below.",
    name: "Enter your name.",
    phone: "Enter a valid Indian phone number, for example 98765 43210.",
    email: "Enter a valid email address, or leave it blank.",
    product: "Choose a product.",
    tooLong: (max: number) => `Keep this to ${max} characters or fewer.`,
    rateLimited: "You have sent several enquiries in a short time. Wait a few minutes, or call or WhatsApp us.",
    failed: "Your enquiry could not be sent. Please call or WhatsApp us on +91 75501 30234.",
  },
};

export const enquiryEmailCopy = {
  heading: "New enquiry",
  callAction: "Call",
  whatsappAction: "WhatsApp",
  emailAction: "Email",
  whatsappGreeting: (name: string, product: string) => `Hello ${name}, this is AriMex about your enquiry for ${product}.`,
  replySubject: "Your AriMex enquiry",
  sentFrom: (site: string, time: string) => `Sent from the quote form on ${site} on ${time} IST.`,
};

export const whatsappMessages = {
  general: "Hello AriMex, I would like a quote.",
  product: (product: string) => `Hello AriMex, I would like a price for ${product}.`,
  floatingLabel: "Chat with AriMex on WhatsApp",
};

export const footer = {
  navLabel: "Footer",
  quickLinksHeading: "Quick links",
  gstinLabel: "GSTIN",
  copyright: (year: number) => `© ${year} Amirtham Imports and Exports`,
};
