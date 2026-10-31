export const LOCALES = ["es", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const EMAIL = "jsetorres1997@gmail.com";
export const GITHUB = "https://github.com/xTorres97";

export type Project = {
  slug: string;
  name: string;
  /** Color propio del proyecto: tiñe su sección del portafolio */
  color: { base: string; soft: string; ink: string };
  kind: string;
  summary: string;
  problem: string;
  built: string[];
  detail: { title: string; text: string };
  stack: string[];
  stats: { value: string; label: string }[];
  demo: string;
  code: string;
  images: { src: string; alt: string }[];
};

type Dict = {
  meta: { title: string; description: string };
  nav: { work: string; services: string; process: string; contact: string };
  hero: { available: string; title: string; lead: string; ctaWork: string; ctaContact: string; location: string };
  work: { title: string; intro: string; problem: string; built: string; detail: string; demo: string; code: string; stack: string };
  services: { title: string; items: { title: string; text: string }[] };
  process: { title: string; steps: { title: string; text: string }[] };
  stack: { title: string; groups: { label: string; items: string[] }[] };
  contact: { title: string; text: string; copy: string; copied: string; write: string };
  footer: string;
  projects: Project[];
};

const COLORS = {
  psydesk: { base: "#8B7355", soft: "#F3EDE4", ink: "#3D2F21" },
  tienda: { base: "#1F4A3D", soft: "#E3EDE7", ink: "#15302A" },
  calendario: { base: "#2F5BEA", soft: "#E6ECFD", ink: "#1D3FB0" },
};

const es: Dict = {
  meta: {
    title: "Jose Torres · Desarrollador web full-stack",
    description: "Desarrollador web full-stack y diseñador freelance en Venezuela. Aplicaciones web completas con Next.js, TypeScript y Postgres: de la interfaz a la base de datos.",
  },
  nav: { work: "Proyectos", services: "Servicios", process: "Cómo trabajo", contact: "Contacto" },
  hero: {
    available: "Disponible para proyectos freelance",
    title: "Diseño y construyo aplicaciones web completas.",
    lead: "Soy Jose Torres, desarrollador full-stack y diseñador. Me encargo de todo el producto: la interfaz que usa tu cliente, la lógica que la sostiene y la base de datos detrás. Abajo hay tres proyectos que puedes probar ahora mismo.",
    ctaWork: "Ver proyectos",
    ctaContact: "Escríbeme",
    location: "Venezuela · trabajo en remoto",
  },
  work: {
    title: "Proyectos",
    intro: "Los tres tienen demo pública y código abierto. Puedes entrar, usarlos y leer cómo están hechos.",
    problem: "El problema",
    built: "Qué construí",
    detail: "Un detalle",
    demo: "Probar la demo",
    code: "Ver el código",
    stack: "Tecnologías",
  },
  services: {
    title: "En qué te puedo ayudar",
    items: [
      { title: "Aplicaciones web a medida", text: "Paneles de gestión, sistemas de citas, plataformas internas. Con usuarios, permisos y los datos bien protegidos." },
      { title: "Tiendas online", text: "Catálogo, carrito, pagos e inventario, con un panel para que gestiones pedidos sin depender de nadie." },
      { title: "Sitios para negocios", text: "Páginas rápidas, bien posicionadas en Google y con un diseño propio, no una plantilla más." },
      { title: "Mejorar lo que ya tienes", text: "Revisión de seguridad, rendimiento y errores en apps existentes. Encuentro el problema y lo arreglo." },
    ],
  },
  process: {
    title: "Cómo trabajo",
    steps: [
      { title: "Entender el problema", text: "Antes de escribir código, hablamos de qué necesitas resolver y para quién." },
      { title: "Una demo temprano", text: "En pocos días ves algo funcionando y lo ajustamos juntos, en vez de esperar al final." },
      { title: "Entregas por partes", text: "Avanzo por funciones completas y probadas, publicadas donde puedes revisarlas." },
      { title: "Publicación y soporte", text: "Dejo el proyecto en producción, documentado y con pruebas para que crezca sin miedo." },
    ],
  },
  stack: {
    title: "Herramientas",
    groups: [
      { label: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui"] },
      { label: "Backend y datos", items: ["Supabase", "Postgres", "Neon", "Drizzle ORM", "Zod"] },
      { label: "Producción", items: ["Vercel", "Playwright", "Vitest", "GitHub"] },
    ],
  },
  contact: {
    title: "¿Tienes un proyecto en mente?",
    text: "Cuéntame qué necesitas y te respondo con una propuesta concreta.",
    copy: "Copiar email",
    copied: "Email copiado",
    write: "Escribir un email",
  },
  footer: "Diseñado y programado por Jose Torres.",
  projects: [
    {
      slug: "psydesk",
      name: "PsyDesk",
      color: COLORS.psydesk,
      kind: "Plataforma de gestión clínica",
      summary: "Agenda, expedientes, tests psicométricos y un asistente con IA para psicólogos, en un solo panel.",
      problem: "Un psicólogo lleva su agenda en un lugar, las notas de sesión en otro y los tests en papel. Preparar cada consulta toma tiempo que debería ir a los pacientes.",
      built: [
        "Agenda con estados de cita y sincronización con Google Calendar.",
        "Expedientes con historia clínica y notas de sesión en formato SOAP, con dictado por voz.",
        "Tests validados (PHQ-9, GAD-7…) con puntaje automático; el paciente los responde desde un enlace, sin cuenta.",
        "Asistente con IA que conoce la agenda y los pacientes del profesional.",
      ],
      detail: {
        title: "Seguridad en datos sensibles",
        text: "Audité la app y encontré que los envíos de tests podían leerse sin iniciar sesión. Cerré el acceso anónimo en la base de datos y moví el cuestionario a una ruta del servidor que valida el token, calcula el puntaje y acepta un solo envío.",
      },
      stack: ["Next.js", "Supabase", "Row Level Security", "Gemini", "Google Calendar API", "Resend"],
      stats: [{ value: "13k+", label: "líneas de TypeScript" }, { value: "9", label: "tests psicométricos" }, { value: "1 clic", label: "para entrar a la demo" }],
      demo: "https://psydesk.vercel.app/login?demo=1",
      code: "https://github.com/xTorres97/psydesk",
      images: [
        { src: "/proyectos/psydesk-dashboard.webp", alt: "Panel de PsyDesk con el resumen del día" },
        { src: "/proyectos/psydesk-expediente.webp", alt: "Expediente con notas de sesión" },
        { src: "/proyectos/psydesk-asistente.webp", alt: "Asistente con IA respondiendo sobre la agenda" },
      ],
    },
    {
      slug: "tienda",
      name: "Sombra de Bucare",
      color: COLORS.tienda,
      kind: "Tienda online",
      summary: "Tienda de café de especialidad venezolano con carrito, pagos, inventario y panel de administración.",
      problem: "Una tienda pequeña necesita vender sin sobrevender: si quedan dos bolsas y llegan tres compras a la vez, alguien se queda sin su pedido. Y el cobro tiene que ser confiable.",
      built: [
        "Catálogo con filtros por región, tueste y proceso, y búsqueda por notas de cata.",
        "Checkout que recalcula los precios en el servidor y reserva el stock por 15 minutos.",
        "Pasarela de pago de prueba con verificación del banco, confirmada por un webhook firmado.",
        "Panel con ventas, pedidos, cambios de estado e inventario.",
      ],
      detail: {
        title: "Cero sobreventa",
        text: "El stock se descuenta con una sola operación condicional dentro de una transacción. Dos compras simultáneas no pueden llevarse la última unidad, y lo comprueba un test que lanza las dos a la vez.",
      },
      stack: ["Next.js", "Neon", "Drizzle ORM", "Server Actions", "Zod", "Playwright"],
      stats: [{ value: "35", label: "pruebas automáticas" }, { value: "5", label: "tarjetas de prueba" }, { value: "0", label: "unidades vendidas de más" }],
      demo: "https://sombradebucare.vercel.app",
      code: "https://github.com/xTorres97/tienda-cafe",
      images: [
        { src: "/proyectos/tienda-inicio.webp", alt: "Inicio de la tienda Sombra de Bucare" },
        { src: "/proyectos/tienda-pasarela.webp", alt: "Pasarela de pago de prueba" },
        { src: "/proyectos/tienda-panel.webp", alt: "Panel de pedidos de la tienda" },
      ],
    },
    {
      slug: "calendario",
      name: "Calendario",
      color: COLORS.calendario,
      kind: "Aplicación interactiva",
      summary: "Calendario con vistas de mes, semana y día, donde todo se hace arrastrando.",
      problem: "Los calendarios parecen simples hasta que hay que moverlos con el mouse: eventos que se solapan, series que se repiten, horas que deben encajar. Es la parte del frontend donde más se nota el detalle.",
      built: [
        "Arrastrar eventos entre horas y días, con ajuste a bloques de 15 minutos.",
        "Estirar el borde para cambiar la duración y arrastrar en vacío para crear.",
        "Eventos recurrentes, categorías, búsqueda y atajos de teclado.",
        "Español e inglés, modo oscuro y versión móvil.",
      ],
      detail: {
        title: "La columna del cielo",
        text: "En la vista semanal, la columna de horas cambia de color como el cielo a lo largo del día. Es un detalle chico que hace que el calendario se reconozca a primera vista.",
      },
      stack: ["Next.js", "React 19", "dnd-kit", "Zustand", "date-fns", "Vitest"],
      stats: [{ value: "30", label: "pruebas automáticas" }, { value: "3", label: "vistas" }, { value: "2", label: "idiomas" }],
      demo: "https://calendario-jtorres.vercel.app",
      code: "https://github.com/xTorres97/calendario",
      images: [
        { src: "/proyectos/calendario-semana.webp", alt: "Vista semanal del calendario" },
        { src: "/proyectos/calendario-mes.webp", alt: "Vista mensual" },
        { src: "/proyectos/calendario-oscuro.webp", alt: "Calendario en modo oscuro" },
      ],
    },
  ],
};

const en: Dict = {
  meta: {
    title: "Jose Torres · Full-stack web developer",
    description: "Freelance full-stack web developer and designer based in Venezuela. Complete web applications with Next.js, TypeScript and Postgres, from the interface to the database.",
  },
  nav: { work: "Work", services: "Services", process: "Process", contact: "Contact" },
  hero: {
    available: "Available for freelance work",
    title: "I design and build complete web applications.",
    lead: "I'm Jose Torres, a full-stack developer and designer. I take care of the whole product: the interface your customers use, the logic behind it and the database underneath. Below are three projects you can try right now.",
    ctaWork: "See my work",
    ctaContact: "Get in touch",
    location: "Venezuela · working remotely",
  },
  work: {
    title: "Work",
    intro: "All three have a public demo and open source code. Try them, then read how they're built.",
    problem: "The problem",
    built: "What I built",
    detail: "A closer look",
    demo: "Try the demo",
    code: "View the code",
    stack: "Built with",
  },
  services: {
    title: "How I can help",
    items: [
      { title: "Custom web apps", text: "Dashboards, booking systems, internal tools. With users, permissions and properly protected data." },
      { title: "Online stores", text: "Catalog, cart, payments and inventory, plus an admin panel so you can run orders yourself." },
      { title: "Business websites", text: "Fast pages that rank well on Google, with a design of their own instead of another template." },
      { title: "Improving what you have", text: "Security, performance and bug reviews for existing apps. I find the problem and fix it." },
    ],
  },
  process: {
    title: "How I work",
    steps: [
      { title: "Understand the problem", text: "Before writing code, we talk about what you need to solve and for whom." },
      { title: "An early demo", text: "Within days you see something working and we shape it together, instead of waiting until the end." },
      { title: "Ship in pieces", text: "I deliver complete, tested features, deployed somewhere you can review them." },
      { title: "Launch and support", text: "The project goes live documented and tested, so it can keep growing safely." },
    ],
  },
  stack: {
    title: "Tools",
    groups: [
      { label: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui"] },
      { label: "Backend & data", items: ["Supabase", "Postgres", "Neon", "Drizzle ORM", "Zod"] },
      { label: "Shipping", items: ["Vercel", "Playwright", "Vitest", "GitHub"] },
    ],
  },
  contact: {
    title: "Have a project in mind?",
    text: "Tell me what you need and I'll reply with a concrete proposal.",
    copy: "Copy email",
    copied: "Email copied",
    write: "Send an email",
  },
  footer: "Designed and built by Jose Torres.",
  projects: [
    {
      slug: "psydesk",
      name: "PsyDesk",
      color: COLORS.psydesk,
      kind: "Practice management platform",
      summary: "Scheduling, clinical records, psychometric tests and an AI assistant for psychologists, in one dashboard.",
      problem: "A psychologist keeps their schedule in one place, session notes in another and tests on paper. Preparing for each appointment takes time that should go to patients.",
      built: [
        "Scheduling with appointment statuses and Google Calendar sync.",
        "Clinical records with SOAP session notes and voice dictation.",
        "Validated tests (PHQ-9, GAD-7…) with automatic scoring, answered by patients through a link, no account needed.",
        "An AI assistant that knows the clinician's schedule and patients.",
      ],
      detail: {
        title: "Protecting sensitive data",
        text: "Auditing the app, I found that test submissions could be read without signing in. I closed anonymous access at the database level and moved the questionnaire to a server route that validates the token, scores the answers and accepts a single submission.",
      },
      stack: ["Next.js", "Supabase", "Row Level Security", "Gemini", "Google Calendar API", "Resend"],
      stats: [{ value: "13k+", label: "lines of TypeScript" }, { value: "9", label: "psychometric tests" }, { value: "1 click", label: "to enter the demo" }],
      demo: "https://psydesk.vercel.app/login?demo=1",
      code: "https://github.com/xTorres97/psydesk",
      images: [
        { src: "/proyectos/psydesk-dashboard.webp", alt: "PsyDesk dashboard with the day's summary" },
        { src: "/proyectos/psydesk-expediente.webp", alt: "Clinical record with session notes" },
        { src: "/proyectos/psydesk-asistente.webp", alt: "AI assistant answering about the schedule" },
      ],
    },
    {
      slug: "tienda",
      name: "Sombra de Bucare",
      color: COLORS.tienda,
      kind: "Online store",
      summary: "A Venezuelan specialty coffee shop with cart, payments, inventory and an admin dashboard.",
      problem: "A small shop needs to sell without overselling: with two bags left and three orders arriving at once, someone ends up without theirs. And payments have to be reliable.",
      built: [
        "Catalog filtered by region, roast and process, with search by tasting notes.",
        "A checkout that recomputes prices on the server and holds stock for 15 minutes.",
        "A test payment gateway with bank verification, confirmed by a signed webhook.",
        "An admin dashboard for sales, orders, status changes and inventory.",
      ],
      detail: {
        title: "Zero overselling",
        text: "Stock is decremented with a single conditional update inside a transaction. Two simultaneous checkouts can't both take the last unit, and a test that fires both at once proves it.",
      },
      stack: ["Next.js", "Neon", "Drizzle ORM", "Server Actions", "Zod", "Playwright"],
      stats: [{ value: "35", label: "automated tests" }, { value: "5", label: "test cards" }, { value: "0", label: "units oversold" }],
      demo: "https://sombradebucare.vercel.app",
      code: "https://github.com/xTorres97/tienda-cafe",
      images: [
        { src: "/proyectos/tienda-inicio.webp", alt: "Sombra de Bucare store home page" },
        { src: "/proyectos/tienda-pasarela.webp", alt: "Test payment gateway" },
        { src: "/proyectos/tienda-panel.webp", alt: "Store orders dashboard" },
      ],
    },
    {
      slug: "calendario",
      name: "Calendario",
      color: COLORS.calendario,
      kind: "Interactive app",
      summary: "A month, week and day calendar where everything happens by dragging.",
      problem: "Calendars look simple until you have to move things with the mouse: overlapping events, repeating series, times that have to snap into place. It's where frontend detail shows the most.",
      built: [
        "Drag events across hours and days, snapping to 15-minute blocks.",
        "Pull the bottom edge to resize, and drag on empty space to create.",
        "Recurring events, categories, search and keyboard shortcuts.",
        "Spanish and English, dark mode and a mobile layout.",
      ],
      detail: {
        title: "The sky column",
        text: "In week view, the hour column changes color like the sky throughout the day. A small touch that makes the calendar recognizable at a glance.",
      },
      stack: ["Next.js", "React 19", "dnd-kit", "Zustand", "date-fns", "Vitest"],
      stats: [{ value: "30", label: "automated tests" }, { value: "3", label: "views" }, { value: "2", label: "languages" }],
      demo: "https://calendario-jtorres.vercel.app",
      code: "https://github.com/xTorres97/calendario",
      images: [
        { src: "/proyectos/calendario-semana.webp", alt: "Calendar week view" },
        { src: "/proyectos/calendario-mes.webp", alt: "Month view" },
        { src: "/proyectos/calendario-oscuro.webp", alt: "Calendar in dark mode" },
      ],
    },
  ],
};

export const DICTS: Record<Locale, Dict> = { es, en };
export const isLocale = (v: string): v is Locale => (LOCALES as readonly string[]).includes(v);
