/* DATA STORE
   Single source of truth for every page + the admin panel.
   Persists to localStorage under one key so the admin panel and the public
   site (running in the same browser) always agree on the current content. */

const STORE_KEY = "hkArchStudioData_v2";
const AUTH_KEY = "hkArchStudioAuth_v1";

const DEFAULT_DATA = {
  profile: {
    name: "Ar. Haseeb Ullah",
    title: "Architectural Designer & BIM Specialist",
    image: "assets/img/438348077_467159666264180_1363624297685461631_n.jpg",
    email: "haseebkhankpk1@gmail.com",
    phone: "+92 313 0961515",
    socials: {
      linkedin: "#",
      instagram: "#",
      facebook: "#",
      whatsapp: "#"
    
    }
  },

  heroSlides: [
    {
      title: "Modern Minimalist Villa",
      status: "Concept Stage",
      location: "Capital City",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
    },
    {
      title: "Commercial Plaza Tower",
      status: "Schematic Design",
      location: "Tech Hub",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
    }
  ],

  about: {
    heading: "Designing Contextual, High-Performance Architectural Spaces",
    bio1: "We are an architectural design and Building Information Modeling (BIM) practice focused on crafting sustainable residential, commercial, and interior typologies. Our work bridges creative design intent with rigorous technical documentation.",
    bio2: "Leveraging parametric BIM workflows, 3D photorealistic rendering, and site-responsive spatial planning, every project is tailored to client aspirations while maintaining environmental and structural integrity.",
    stats: [
      { val: "50+", lbl: "Projects Executed" },
      { val: "BIM", lbl: "Full Workflow" },
      { val: "100%", lbl: "Client Centric" }
    ]
  },

  services: [
    { icon: "fa-drafting-compass", title: "Architectural Design & Planning", desc: "Full schematic design, spatial massing, planning submission sets, and construction documentation." },
    { icon: "fa-cubes", title: "BIM & 3D Visualization", desc: "Parametric Revit modeling, photorealistic interior/exterior rendering, and virtual walkthroughs." },
    { icon: "fa-couch", title: "Interior Architecture", desc: "Spatial optimization, bespoke joinery detailing, material boards, and interior lighting plans." }
  ],

  process: [
    { step: "01", title: "Discovery & Brief", desc: "Analyzing site constraints, client program requirements, budget parameters, and vision." },
    { step: "02", title: "Concept Design", desc: "Formulating architectural massing, floor plan layouts, and initial 3D visual concepts." },
    { step: "03", title: "BIM & Working Drawings", desc: "Developing parametric BIM models, structural coordination, and detailed specifications." },
    { step: "04", title: "Execution Support", desc: "Site monitoring, contractor supervision, and ensuring architectural compliance." }
  ],

  categories: ["Residential", "Commercial", "Interior", "Heritage"],
  categoryBackgrounds: {},

  projects: [
    {
      id: "p1",
      title: "Hillside Residence",
      category: "Residential",
      client: "Private Client",
      location: "Northern Ridge",
      year: "2025",
      desc: "A contemporary residential house designed to integrate into steep topography using local stone and steel structures.",
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
      ]
    },
    {
      id: "p2",
      title: "Urban Corporate HQ",
      category: "Commercial",
      client: "Apex Group",
      location: "Business Bay",
      year: "2024",
      desc: "A 12-story energy-efficient commercial office building featuring a double-skin glass facade.",
      images: [
        "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=900&q=80"
      ]
    },
    {
      id: "p3",
      title: "Loft Interior Fit-Out",
      category: "Interior",
      client: "Private Client",
      location: "Riverside District",
      year: "2023",
      desc: "Bespoke joinery, warm oak paneling and a restrained material palette for a converted industrial loft.",
      images: [
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80"
      ]
    },
    {
      id: "p4",
      title: "Heritage Facade Restoration",
      category: "Heritage",
      client: "Municipal Trust",
      location: "Old City Quarter",
      year: "2022",
      desc: "Sensitive restoration of a colonial-era facade combining traditional lime plaster with hidden modern services.",
      images: [
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80"
      ]
    }
  ],

  ebooks: [
    {
      id: "b1",
      title: "BIM for Architects: From Basic to Advanced",
      author: "Haseeb Khan",
      type: "E-Book / Guide",
      year: "2026",
      desc: "A comprehensive practical handbook outlining parametric Revit modeling, Level 300/400 BIM execution, and coordination workflows.",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    },
    {
      id: "b2",
      title: "Topographic Integration in Modern Residential Design",
      author: "Ar. Haseeb Ullah",
      type: "Research Paper",
      year: "2025",
      desc: "Architectural study investigating structural stabilization and local stone detailing on steep hillside topographies.",
      cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    },
    {
      id: "b3",
      title: "Commercial Facade Engineering Manual",
      author: "Ar. Haseeb Ullah",
      type: "Technical Manual",
      year: "2024",
      desc: "Detailing parametric glass assemblies, double-skin thermal insulation, and facade load calculations.",
      cover: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    }
  ],

  location: {
    name: "Main Architectural Studio",
    tagline: "Design & BIM Execution Office, City Center",
    hours: "Monday – Saturday: 09:00 AM – 06:00 PM",
    email: "haseebkhankpk1@gmail.com",
    phone: "+92 313 0961515",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105884.2816912388!2d71.4586395!3d34.015137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d917b90f0e79cf%3A0xa816b2637558a412!2sPeshawar%2C%20Khyber%20Pakhtunkhwa%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s",
    directionsUrl: "https://maps.google.com"
  },

  settings: {
    adminPassword: "haseeb2026"
  },

  /* Site-wide copy: page titles, header/footer text, and section intros
     that don't belong to any one content block above but should still be
     editable without touching code. */
  siteText: {
    brandTagline: "Architecture & BIM Practice",
    footerTagline: "ARCHITECTURE & BIM PRACTICE",
    copyrightNote: "All rights reserved.",
    homeHeroEyebrow: "Featured Work In Progress",
    pageTitles: {
      home: "Ar. Haseeb Ullah — Architectural Design & BIM Practice",
      portfolio: "Portfolio — Ar. Haseeb Ullah",
      ebooks: "E-Books & Papers — Ar. Haseeb Ullah",
      about: "About — Ar. Haseeb Ullah",
      services: "Services — Ar. Haseeb Ullah",
      process: "Design Process — Ar. Haseeb Ullah",
      location: "Location — Ar. Haseeb Ullah"
    },
    homeCta: {
      eyebrow: "Start A Project",
      heading: "Let's put your site plan on the boards.",
      body: "From first sketch to construction documentation — book a consultation to discuss scope, timeline and budget.",
      buttonLabel: "Get In Touch"
    },
    pageIntros: {
      portfolio: { eyebrow: "Design Index", heading: "Project Index by Typology", subtext: "Select an architectural category to open its dedicated gallery archive." },
      ebooks:    { eyebrow: "Publications & Knowledge Base", heading: "E-Books & Research Papers", subtext: "BIM handbooks, architectural textbooks, and published research from the studio." },
      services:  { eyebrow: "What We Offer", heading: "Services Offered", subtext: "" },
      process:   { eyebrow: "Methodology", heading: "Our Design Process", subtext: "" },
      about:     { eyebrow: "About Our Studio" },
      location:  { eyebrow: "Visit Our Practice" }
    }
  }
};

/* Merges saved content over the defaults *at every level*. A shallow merge
   would drop whole nested blocks — saved data written before a field existed
   (a new page intro, a new page title) would replace the entire siteText
   object, leaving pages reading undefined and rendering nothing. Arrays are
   taken from the saved data as-is: they're admin-managed lists, and merging
   them index-by-index would resurrect deleted entries. */
function mergeDefaults(base, saved) {
  if (Array.isArray(saved) || saved === null || typeof saved !== "object") {
    return saved === undefined ? base : structuredClone(saved);
  }
  const out = (base && typeof base === "object" && !Array.isArray(base)) ? base : {};
  Object.keys(saved).forEach(key => { out[key] = mergeDefaults(out[key], saved[key]); });
  return out;
}

const Store = {
  get() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return structuredClone(DEFAULT_DATA);
      const parsed = JSON.parse(raw);
      return mergeDefaults(structuredClone(DEFAULT_DATA), parsed);
    } catch (e) {
      console.error("Store.get failed, falling back to defaults", e);
      return structuredClone(DEFAULT_DATA);
    }
  },
  save(data) {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(data));
      /* localStorage only fires `storage` in *other* tabs, so also ping the
         current tab — any page listening via onChange() re-renders either way. */
      window.dispatchEvent(new CustomEvent("studio-data-saved"));
      return true;
    } catch (e) {
      console.error("Store.save failed", e);
      return false;
    }
  },
  /* Calls back whenever content is saved anywhere in this browser — from the
     admin panel in another tab, or from this page. Public pages use it to stay
     in step with the admin without a manual refresh. */
  onChange(handler) {
    window.addEventListener("storage", e => { if (e.key === STORE_KEY) handler(); });
    window.addEventListener("studio-data-saved", () => handler());
  },
  reset() {
    localStorage.removeItem(STORE_KEY);
  }
};

/* Very light "gate" so the admin panel isn't a plain public link.
   This is client-side only and meant to keep casual visitors out of the
   dashboard — for real protection this must be swapped for server-side
   authentication before going live. */
const Auth = {
  isLoggedIn() {
    return sessionStorage.getItem(AUTH_KEY) === "true";
  },
  /* expectedPassword comes from the live data store (data.settings.adminPassword)
     so a password change made in Settings takes effect immediately. */
  login(pw, expectedPassword) {
    if (pw && pw === expectedPassword) {
      sessionStorage.setItem(AUTH_KEY, "true");
      return true;
    }
    return false;
  },
  logout() {
    sessionStorage.removeItem(AUTH_KEY);
  }
};
