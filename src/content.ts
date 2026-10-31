export const LOCALES = ["es", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const EMAIL = "jsetorres1997@gmail.com";
export const GITHUB = "https://github.com/xTorres97";
export const WHATSAPP_NUMBER = "584120473374";
export const whatsappLink = (text: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

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
  nav: { about: string; work: string; services: string; process: string; contact: string };
  hero: { available: string; title: string; lead: string; ctaWork: string; ctaContact: string; location: string };
  about: { title: string; paragraphs: string[]; facts: { value: string; label: string }[] };
  work: { title: string; intro: string; problem: string; built: string; detail: string; demo: string; code: string; stack: string };
  services: { title: string; items: { title: string; text: string }[] };
  process: { title: string; steps: { title: string; text: string }[] };
  stack: { title: string; groups: { label: string; items: string[] }[] };
  contact: { title: string; text: string; copy: string; copied: string; write: string; whatsapp: string; whatsappMessage: string };
  assistant: {
    open: string; title: string; subtitle: string; placeholder: string; send: string; close: string;
    suggestions: string[]; thinking: string; error: string; limit: string; disclaimer: string; talkToMe: string;
  };
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
    description: "Desarrollador web full-stack y diseñador freelance con 4 años de experiencia. Aplicaciones web completas con Next.js, TypeScript, Postgres e inteligencia artificial.",
  },
  nav: { about: "Sobre mí", work: "Proyectos", services: "Servicios", process: "Cómo trabajo", contact: "Contacto" },
  hero: {
    available: "Disponible para proyectos freelance",
    title: "Diseño y construyo aplicaciones web completas.",
    lead: "Hola, soy Jose. Llevo 4 años creando productos web de principio a fin: lo que ve tu cliente, la lógica que lo hace funcionar y, cada vez más, la inteligencia artificial que lo vuelve útil. Abajo tienes tres proyectos míos que puedes probar ahora mismo.",
    ctaWork: "Ver proyectos",
    ctaContact: "Escríbeme",
    location: "Venezuela · trabajo en remoto",
  },
  about: {
    title: "Sobre mí",
    paragraphs: [
      "Soy desarrollador full-stack y diseñador. Trabajo de forma independiente desde Venezuela, con clientes que necesitan algo más que una página bonita: herramientas que su equipo use todos los días y que no se rompan.",
      "Me gusta entender el negocio antes de escribir código. Diseño la interfaz, construyo el backend y me ocupo de lo que casi nadie ve: la seguridad de los datos, las pruebas y que todo cargue rápido.",
      "Uso la inteligencia artificial en dos frentes: la integro en los productos, con asistentes que responden con los datos reales de cada negocio, y la uso en mi forma de trabajar para entregar más rápido sin bajar la calidad.",
    ],
    facts: [
      { value: "4 años", label: "construyendo productos web" },
      { value: "De punta a punta", label: "diseño, frontend, backend y datos" },
      { value: "IA aplicada", label: "asistentes conectados a tus datos" },
    ],
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
      { title: "Tiendas y sitios para negocios", text: "Tiendas con pagos e inventario, o sitios rápidos y bien posicionados en Google. Siempre con un diseño propio, no una plantilla más." },
      { title: "Inteligencia artificial en tu producto", text: "Asistentes que responden con la información real de tu negocio, resúmenes automáticos, clasificación de textos y tareas repetitivas que dejan de hacerse a mano." },
      { title: "Mejorar lo que ya tienes", text: "Reviso apps existentes en seguridad, rendimiento y errores. Encuentro el problema, te explico qué pasa y lo arreglo." },
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
      { label: "Inteligencia artificial", items: ["Gemini API", "Claude API", "Asistentes con datos propios", "Automatización"] },
      { label: "Producción", items: ["Vercel", "Playwright", "Vitest", "GitHub"] },
    ],
  },
  contact: {
    title: "¿Hablamos de tu proyecto?",
    text: "Cuéntame qué tienes en mente, aunque todavía sea solo una idea. Te respondo personalmente con preguntas concretas y una propuesta clara.",
    copy: "Copiar email",
    copied: "Email copiado",
    write: "Escribir un email",
    whatsapp: "WhatsApp",
    whatsappMessage: "Hola Jose, vi tu portafolio y me gustaría hablar sobre un proyecto.",
  },
  assistant: {
    open: "Pregúntale a mi portafolio",
    title: "Asistente del portafolio",
    subtitle: "Responde con información de mis proyectos y servicios. Funciona con IA (Gemini).",
    placeholder: "Escribe tu pregunta…",
    send: "Enviar",
    close: "Cerrar",
    suggestions: ["¿Qué servicios ofreces?", "¿Cómo integras IA en un producto?", "Cuéntame sobre la tienda", "¿Cómo trabajas con un cliente?"],
    thinking: "Pensando…",
    error: "No pude responder ahora. Escríbeme directamente por WhatsApp o email.",
    limit: "Llegaste al límite de preguntas de esta conversación. Si quieres seguir, escríbeme directamente.",
    disclaimer: "Las respuestas las genera una IA y pueden tener errores.",
    talkToMe: "Hablar con Jose",
  },
  footer: "Diseñado y programado por mí, Jose Torres.",
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
    description: "Freelance full-stack web developer and designer with 4 years of experience. Complete web applications with Next.js, TypeScript, Postgres and AI.",
  },
  nav: { about: "About", work: "Work", services: "Services", process: "Process", contact: "Contact" },
  hero: {
    available: "Available for freelance work",
    title: "I design and build complete web applications.",
    lead: "Hi, I'm Jose. For 4 years I've been building web products end to end: what your customers see, the logic that makes it work and, more and more, the AI that makes it genuinely useful. Below are three of my projects you can try right now.",
    ctaWork: "See my work",
    ctaContact: "Get in touch",
    location: "Venezuela · working remotely",
  },
  about: {
    title: "About me",
    paragraphs: [
      "I'm a full-stack developer and designer working independently from Venezuela, with clients who need more than a pretty page: tools their team uses every day and that don't break.",
      "I like to understand the business before writing code. I design the interface, build the backend and take care of what almost nobody sees: data security, tests and fast load times.",
      "I work with AI on two fronts: I build it into products, with assistants that answer using each business's real data, and I use it in my own workflow to ship faster without lowering the bar.",
    ],
    facts: [
      { value: "4 years", label: "building web products" },
      { value: "End to end", label: "design, frontend, backend and data" },
      { value: "Applied AI", label: "assistants connected to your data" },
    ],
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
      { title: "Stores and business websites", text: "Stores with payments and inventory, or fast sites that rank well on Google. Always with a design of their own, never another template." },
      { title: "AI in your product", text: "Assistants that answer with your business's real information, automatic summaries, text classification and repetitive tasks that stop being done by hand." },
      { title: "Improving what you have", text: "I review existing apps for security, performance and bugs. I find the problem, explain what's going on and fix it." },
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
      { label: "AI", items: ["Gemini API", "Claude API", "Assistants on your data", "Automation"] },
      { label: "Shipping", items: ["Vercel", "Playwright", "Vitest", "GitHub"] },
    ],
  },
  contact: {
    title: "Shall we talk about your project?",
    text: "Tell me what you have in mind, even if it's just an idea for now. I'll reply personally with specific questions and a clear proposal.",
    copy: "Copy email",
    copied: "Email copied",
    write: "Send an email",
    whatsapp: "WhatsApp",
    whatsappMessage: "Hi Jose, I saw your portfolio and I'd like to talk about a project.",
  },
  assistant: {
    open: "Ask my portfolio",
    title: "Portfolio assistant",
    subtitle: "Answers using information about my projects and services. Powered by AI (Gemini).",
    placeholder: "Type your question…",
    send: "Send",
    close: "Close",
    suggestions: ["What services do you offer?", "How do you add AI to a product?", "Tell me about the store", "How do you work with clients?"],
    thinking: "Thinking…",
    error: "I couldn't answer right now. Reach me directly on WhatsApp or by email.",
    limit: "You've reached the question limit for this chat. To keep going, contact me directly.",
    disclaimer: "Answers are AI-generated and may contain mistakes.",
    talkToMe: "Talk to Jose",
  },
  footer: "Designed and built by me, Jose Torres.",
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
