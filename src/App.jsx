import { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  CloudCog,
  Code2,
  Cpu,
  Database,
  FileText,
  GraduationCap,
  HelpCircle,
  Layers3,
  Mail,
  Menu,
  Minus,
  Newspaper,
  Phone,
  Plus,
  Search,
  Server,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Store,
  Users,
  X,
  Zap,
} from "lucide-react";
import logoLight from "./assets/logo-2-light-background.png";
import logoIcon from "./assets/logo-3-icon-tile.png";
import socialBanner from "./assets/cover-1-social-banner.png";

const CONTACT_EMAIL = "hello@enash.co.za";
const SITE_URL = "https://www.enash.co.za";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Developers", href: "#developers" },
  { label: "Shop", href: "#shop" },
  { label: "Courses", href: "#courses" },
  { label: "Articles", href: "#articles" },
  { label: "Contact", href: "#contact" },
];

const serviceGroups = [
  {
    id: "microsoft",
    title: "Microsoft services",
    eyebrow: "For businesses and individuals",
    icon: CloudCog,
    description:
      "Setup, support and optimisation for Microsoft 365, Azure, Teams, SharePoint, Outlook, security and business automation.",
    services: [
      {
        title: "Microsoft 365 setup",
        price: "From R1,500",
        summary: "Business email, domains, Outlook, Teams, OneDrive and user accounts configured properly.",
        bullets: ["Email and domain setup", "User accounts and licences", "Teams and OneDrive basics"],
      },
      {
        title: "Azure cloud setup",
        price: "From R3,500",
        summary: "Azure hosting, databases, backups, App Service, Static Web Apps and cost controls.",
        bullets: ["Hosting and deployment", "Database connection", "Budget alerts and monitoring"],
      },
      {
        title: "Power Platform automation",
        price: "From R2,500",
        summary: "Automate repeated admin work with Power Automate, Forms, Excel, SharePoint and email flows.",
        bullets: ["Workflow mapping", "One working automation", "Training handover"],
      },
      {
        title: "Security and backup check",
        price: "From R1,200",
        summary: "MFA, device basics, email security, permission review and backup checks for small teams.",
        bullets: ["MFA review", "Backup plan", "Risk report"],
      },
    ],
  },
  {
    id: "developers",
    title: "Developer services",
    eyebrow: "Build and improve digital systems",
    icon: Code2,
    description:
      "Websites, web apps, dashboards, APIs, databases and business systems built for real business workflows.",
    services: [
      {
        title: "Business website build",
        price: "From R4,500",
        summary: "Fast modern websites for brands, services, portfolios, shops and landing pages.",
        bullets: ["React frontend", "Responsive design", "SEO-ready pages"],
      },
      {
        title: "Web app development",
        price: "From R8,500",
        summary: "Dashboards, client portals, booking systems, quote systems and internal tools.",
        bullets: ["Auth-ready structure", "Admin views", "API integration"],
      },
      {
        title: "Database and backend setup",
        price: "From R5,500",
        summary: "Connect signup, login, orders and dashboards to a secure backend and database.",
        bullets: ["Azure SQL or Firebase", "REST API", "User data flows"],
      },
      {
        title: "Maintenance and support",
        price: "From R950 / month",
        summary: "Monthly updates, fixes, content changes, backups and performance checks.",
        bullets: ["Priority fixes", "Monthly report", "Small content edits"],
      },
    ],
  },
  {
    id: "growth",
    title: "Business growth extras",
    eyebrow: "Extra income streams on the site",
    icon: Store,
    description:
      "Shop, courses, articles, newsletters and productised services so Enash can generate leads and sell online.",
    services: [
      {
        title: "Online shop setup",
        price: "From R3,500",
        summary: "Sell digital products, templates, service packages, devices and business resources.",
        bullets: ["Cart frontend", "Checkout-ready flow", "Product catalogue"],
      },
      {
        title: "Free course library",
        price: "Included",
        summary: "Free learning content to attract visitors and convert them into service leads.",
        bullets: ["Course cards", "Enroll form", "Progress-ready structure"],
      },
      {
        title: "Articles and news hub",
        price: "Included",
        summary: "Publish Microsoft tips, tech news, business guides and Enash updates.",
        bullets: ["Category filters", "Featured articles", "Newsletter capture"],
      },
      {
        title: "Lead generation system",
        price: "Included",
        summary: "Quote builder and contact forms that prepare enquiries for email or backend integration.",
        bullets: ["Quote summary", "Validation", "Backend-ready data"],
      },
    ],
  },
];

const packages = [
  {
    name: "Launch",
    fit: "For individuals and new businesses",
    price: "From R2,500",
    icon: Sparkles,
    features: ["Business email setup", "One-page website guidance", "Microsoft 365 basics", "Security checklist"],
  },
  {
    name: "Business Cloud",
    fit: "For teams that need Microsoft support",
    price: "From R6,500",
    icon: Server,
    featured: true,
    features: ["Microsoft 365 tenant setup", "Teams and SharePoint structure", "Azure hosting advice", "Admin handover"],
  },
  {
    name: "Build System",
    fit: "For companies that need custom software",
    price: "From R12,500",
    icon: Layers3,
    features: ["React web app", "Dashboard screens", "Database/API plan", "Deployment to Azure"],
  },
];

const products = [
  {
    id: "prod-m365-audit",
    name: "Microsoft 365 Health Check",
    category: "Microsoft",
    price: 1200,
    type: "Service",
    rating: 4.9,
    description: "A practical review of accounts, licences, security, Teams, OneDrive and Outlook setup.",
  },
  {
    id: "prod-web-care",
    name: "Website Care Plan",
    category: "Developer",
    price: 950,
    type: "Monthly",
    rating: 4.8,
    description: "Monthly updates, fixes, uptime checks, backup checks and light content changes.",
  },
  {
    id: "prod-cloud-backup",
    name: "Cloud Backup Setup",
    category: "Microsoft",
    price: 1800,
    type: "Service",
    rating: 4.8,
    description: "Backup strategy, basic restore testing and cloud storage setup for small businesses.",
  },
  {
    id: "prod-react-template",
    name: "React Business Template",
    category: "Digital",
    price: 450,
    type: "Digital product",
    rating: 4.7,
    description: "A clean landing page starter template for service businesses and freelancers.",
  },
  {
    id: "prod-dashboard",
    name: "Sales Dashboard Starter",
    category: "Digital",
    price: 650,
    type: "Digital product",
    rating: 4.7,
    description: "Spreadsheet-friendly dashboard layout for tracking sales, leads and tasks.",
  },
  {
    id: "prod-support-hour",
    name: "Remote Tech Support Hour",
    category: "Support",
    price: 350,
    type: "Service",
    rating: 4.9,
    description: "One remote support session for Microsoft, website, email or device troubleshooting.",
  },
];

const courses = [
  {
    id: "course-m365",
    title: "Microsoft 365 Basics for Small Business",
    level: "Beginner",
    duration: "55 min",
    lessons: 8,
    category: "Microsoft",
    description: "Learn Outlook, Teams, OneDrive and safe account setup for a small business.",
  },
  {
    id: "course-azure",
    title: "Azure Starter for Founders",
    level: "Beginner",
    duration: "1h 20m",
    lessons: 10,
    category: "Azure",
    description: "Understand App Service, Static Web Apps, databases, budgets and safe deployment basics.",
  },
  {
    id: "course-react",
    title: "Build a Landing Page with React",
    level: "Beginner",
    duration: "2h",
    lessons: 12,
    category: "Development",
    description: "Create a fast responsive landing page with reusable components and clean CSS.",
  },
  {
    id: "course-cyber",
    title: "Cybersecurity Basics for Teams",
    level: "Beginner",
    duration: "45 min",
    lessons: 6,
    category: "Security",
    description: "Passwords, MFA, phishing, backups and safe sharing explained in plain English.",
  },
];

const articles = [
  {
    title: "How small businesses should start with Microsoft 365",
    category: "Guide",
    date: "2026-06-20",
    read: "5 min read",
    summary: "A simple path for email, Teams, file sharing and account security before adding complex tools.",
  },
  {
    title: "Azure budgets: protect your startup credits",
    category: "Azure",
    date: "2026-06-18",
    read: "4 min read",
    summary: "The first cost controls every founder should configure before deploying apps and databases.",
  },
  {
    title: "When a business needs a custom dashboard",
    category: "Development",
    date: "2026-06-14",
    read: "6 min read",
    summary: "Signs that spreadsheets are no longer enough and what to build before overcomplicating your system.",
  },
  {
    title: "Enash update: building a services, shop and learning hub",
    category: "News",
    date: "2026-06-10",
    read: "3 min read",
    summary: "The direction of the Enash website and how the platform will support businesses and individuals.",
  },
];

const faqs = [
  {
    question: "Can Enash work with both businesses and individuals?",
    answer:
      "Yes. The site is structured for business services, individual support, online products, free courses and article-led lead generation.",
  },
  {
    question: "Is the shop fully ready for real payments?",
    answer:
      "The frontend cart is functional. To take real payments, connect PayFast, Stripe, Yoco, Peach Payments or another payment provider through a backend.",
  },
  {
    question: "Can the forms save to a database?",
    answer:
      "The forms are validation-ready and email-ready. The next step is connecting them to Azure Functions, App Service, Firebase or another backend.",
  },
  {
    question: "Can courses become paid later?",
    answer:
      "Yes. The course cards and enrolment flow are separated from the data, so you can add prices, user accounts and progress tracking later.",
  },
];

const serviceOptions = serviceGroups.flatMap((group) =>
  group.services.map((service) => `${group.title}: ${service.title}`)
);

function formatCurrency(value) {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
  }).format(value);
}

function buildMailto(subject, body) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeServiceGroup, setActiveServiceGroup] = useState(serviceGroups[0].id);
  const [productSearch, setProductSearch] = useState("");
  const [productCategory, setProductCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [courseEmail, setCourseEmail] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [openFaq, setOpenFaq] = useState(0);
  const [quote, setQuote] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    budget: "R2,500 - R7,500",
    timeline: "This month",
    message: "",
    selected: [serviceOptions[0], serviceOptions[4]],
  });
  const [quoteStatus, setQuoteStatus] = useState("idle");

  const activeGroup = serviceGroups.find((group) => group.id === activeServiceGroup) || serviceGroups[0];
  const productCategories = ["All", ...Array.from(new Set(products.map((product) => product.category)))];

  const filteredProducts = useMemo(() => {
    const query = productSearch.toLowerCase().trim();
    return products.filter((product) => {
      const matchesCategory = productCategory === "All" || product.category === productCategory;
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [productSearch, productCategory]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.quantity * item.price, 0);

  function scrollToSection(event, href) {
    event.preventDefault();
    setMenuOpen(false);
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function addToCart(product) {
    setCartOpen(true);
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...current, { ...product, quantity: 1 }];
    });
  }

  function updateCartQuantity(id, change) {
    setCart((current) =>
      current
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + change } : item))
        .filter((item) => item.quantity > 0)
    );
  }

  function toggleQuoteService(label) {
    setQuote((current) => {
      const exists = current.selected.includes(label);
      return {
        ...current,
        selected: exists ? current.selected.filter((item) => item !== label) : [...current.selected, label],
      };
    });
  }

  function addServiceToQuote(title) {
    setQuote((current) => ({
      ...current,
      selected: current.selected.includes(title) ? current.selected : [...current.selected, title],
    }));
    const element = document.querySelector("#quote");
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleQuoteSubmit(event) {
    event.preventDefault();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(quote.email.trim());
    if (!quote.name.trim() || !validEmail || quote.selected.length === 0) {
      setQuoteStatus("error");
      return;
    }
    setQuoteStatus("ready");
  }

  function handleNewsletter(event) {
    event.preventDefault();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail.trim());
    setNewsletterMessage(validEmail ? "You are on the Enash updates list." : "Enter a valid email first.");
  }

  function enrollCourse(courseId) {
    if (!courseEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(courseEmail.trim())) {
      setCourseEmail("");
      return;
    }
    setEnrolledCourses((current) => (current.includes(courseId) ? current : [...current, courseId]));
  }

  const quoteBody = [
    `Name: ${quote.name}`,
    `Email: ${quote.email}`,
    `Phone: ${quote.phone || "Not provided"}`,
    `Company: ${quote.company || "Not provided"}`,
    `Budget: ${quote.budget}`,
    `Timeline: ${quote.timeline}`,
    "",
    "Selected services:",
    ...quote.selected.map((item) => `- ${item}`),
    "",
    "Message:",
    quote.message || "No extra message.",
  ].join("\n");

  const checkoutBody = [
    "Hi Enash, I want to order these items:",
    "",
    ...cart.map((item) => `- ${item.name} x${item.quantity} = ${formatCurrency(item.price * item.quantity)}`),
    "",
    `Total: ${formatCurrency(cartTotal)}`,
    "",
    "Please send me the payment and delivery/onboarding details.",
  ].join("\n");

  return (
    <div className="site-shell">
      <header className="header">
        <a className="brand" href="#top" onClick={(event) => scrollToSection(event, "#top")} aria-label="Enash home">
          <img src={logoLight} alt="Enash" />
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={(event) => scrollToSection(event, link.href)}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button className="cart-button" type="button" onClick={() => setCartOpen(true)} aria-label="Open cart">
            <ShoppingBag size={18} />
            <span>{cartCount}</span>
          </button>
          <a className="button button-small button-primary" href="#quote" onClick={(event) => scrollToSection(event, "#quote")}>
            Get quote
          </a>
          <button className="menu-button" type="button" onClick={() => setMenuOpen((value) => !value)} aria-label="Open menu">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={(event) => scrollToSection(event, link.href)}>
              {link.label}
            </a>
          ))}
        </div>
      )}

      <main id="top">
        <section className="hero section-pad">
          <div className="hero-copy">
            <div className="eyebrow"><BadgeCheck size={16} /> Microsoft services, development, courses and shop</div>
            <h1>Enash helps businesses move, build and grow with modern technology.</h1>
            <p>
              Offer Microsoft cloud services, developer services, support packages, digital products, free courses,
              articles and business technology guidance from one clean website.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#services" onClick={(event) => scrollToSection(event, "#services")}>
                Explore services <ArrowRight size={18} />
              </a>
              <a className="button button-ghost" href="#shop" onClick={(event) => scrollToSection(event, "#shop")}>
                Visit shop
              </a>
            </div>
            <div className="hero-trust">
              <span><CheckCircle2 size={17} /> Microsoft-first delivery</span>
              <span><CheckCircle2 size={17} /> Azure-ready web apps</span>
              <span><CheckCircle2 size={17} /> South Africa focused</span>
            </div>
          </div>

          <div className="hero-panel" aria-label="Enash website features preview">
            <img className="hero-banner" src={socialBanner} alt="Enash brand banner" />
            <div className="hero-grid">
              <div className="mini-card">
                <CloudCog size={24} />
                <strong>Microsoft</strong>
                <span>365, Azure, Teams, SharePoint, security</span>
              </div>
              <div className="mini-card">
                <Code2 size={24} />
                <strong>Developers</strong>
                <span>Websites, apps, APIs, databases</span>
              </div>
              <div className="mini-card">
                <Store size={24} />
                <strong>Sell online</strong>
                <span>Products, service packages, support hours</span>
              </div>
              <div className="mini-card">
                <GraduationCap size={24} />
                <strong>Free courses</strong>
                <span>Learn and convert visitors into leads</span>
              </div>
            </div>
          </div>
        </section>

        <section className="stats-strip" aria-label="Business highlights">
          <div><strong>3</strong><span>Main income streams</span></div>
          <div><strong>12+</strong><span>Service offers ready</span></div>
          <div><strong>4</strong><span>Free starter courses</span></div>
          <div><strong>1</strong><span>Quote and cart system</span></div>
        </section>

        <section id="services" className="section-pad services-section">
          <div className="section-heading wide">
            <span className="eyebrow"><BriefcaseBusiness size={16} /> What Enash can sell</span>
            <h2>One site for Microsoft services, development work and growth products.</h2>
            <p>
              These sections are already structured as real offers. You can connect the buttons to payments,
              a CRM, WhatsApp or an Azure backend later.
            </p>
          </div>

          <div className="service-tabs" role="tablist" aria-label="Service categories">
            {serviceGroups.map((group) => {
              const Icon = group.icon;
              return (
                <button
                  key={group.id}
                  type="button"
                  className={activeServiceGroup === group.id ? "active" : ""}
                  onClick={() => setActiveServiceGroup(group.id)}
                >
                  <Icon size={18} /> {group.title}
                </button>
              );
            })}
          </div>

          <div className="service-layout">
            <article className="service-intro-card">
              <span>{activeGroup.eyebrow}</span>
              <h3>{activeGroup.title}</h3>
              <p>{activeGroup.description}</p>
              <a className="text-link" href="#quote" onClick={(event) => scrollToSection(event, "#quote")}>
                Build a quote <ArrowRight size={16} />
              </a>
            </article>

            <div className="service-cards">
              {activeGroup.services.map((service) => (
                <article className="service-card" key={service.title}>
                  <div className="card-topline">
                    <span>{service.price}</span>
                    <Zap size={18} />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>
                  <ul>
                    {service.bullets.map((bullet) => (
                      <li key={bullet}><CheckCircle2 size={16} /> {bullet}</li>
                    ))}
                  </ul>
                  <button className="button button-ghost full" type="button" onClick={() => addServiceToQuote(`${activeGroup.title}: ${service.title}`)}>
                    Add to quote
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="developers" className="section-pad split-section">
          <div className="section-heading align-left">
            <span className="eyebrow"><Cpu size={16} /> Developer services</span>
            <h2>Build websites, portals and backend systems for clients.</h2>
            <p>
              The website positions Enash as both a Microsoft service provider and a development partner.
              That means you can sell once-off builds plus monthly maintenance.
            </p>
            <div className="feature-list">
              <span><Database size={18} /> Database-ready app architecture</span>
              <span><ShieldCheck size={18} /> Auth, roles and admin flows planned</span>
              <span><Server size={18} /> Azure App Service and Static Web Apps friendly</span>
            </div>
          </div>
          <div className="workflow-card">
            <h3>Client delivery flow</h3>
            <ol>
              <li><strong>Discover</strong><span>Collect business process, users, pages and data needs.</span></li>
              <li><strong>Design</strong><span>Build screens, data model and customer journey.</span></li>
              <li><strong>Develop</strong><span>Create frontend, backend, database and deployment pipeline.</span></li>
              <li><strong>Support</strong><span>Keep improving the system with monthly support.</span></li>
            </ol>
          </div>
        </section>

        <section className="section-pad packages-section">
          <div className="section-heading">
            <span className="eyebrow"><Star size={16} /> Productised packages</span>
            <h2>Make buying easier with clear starter packages.</h2>
          </div>
          <div className="package-grid">
            {packages.map((plan) => {
              const Icon = plan.icon;
              return (
                <article className={`package-card ${plan.featured ? "featured" : ""}`} key={plan.name}>
                  <Icon size={28} />
                  <span>{plan.fit}</span>
                  <h3>{plan.name}</h3>
                  <strong>{plan.price}</strong>
                  <ul>
                    {plan.features.map((feature) => (
                      <li key={feature}><CheckCircle2 size={16} /> {feature}</li>
                    ))}
                  </ul>
                  <button className="button button-primary full" type="button" onClick={() => addServiceToQuote(`Package: ${plan.name}`)}>
                    Request this package
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        <section id="shop" className="section-pad shop-section">
          <div className="section-heading wide">
            <span className="eyebrow"><ShoppingBag size={16} /> Shop and service products</span>
            <h2>Sell services, digital products and support packages directly on the site.</h2>
            <p>The cart works now on the frontend. Real payment processing is the next backend integration.</p>
          </div>

          <div className="shop-toolbar">
            <label className="search-box">
              <Search size={18} />
              <input
                value={productSearch}
                onChange={(event) => setProductSearch(event.target.value)}
                placeholder="Search products or services"
              />
            </label>
            <div className="filter-pills">
              {productCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={productCategory === category ? "active" : ""}
                  onClick={() => setProductCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-icon"><Store size={24} /></div>
                <div className="product-meta"><span>{product.category}</span><span>{product.type}</span></div>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="product-footer">
                  <strong>{formatCurrency(product.price)}</strong>
                  <span><Star size={15} /> {product.rating}</span>
                </div>
                <button className="button button-primary full" type="button" onClick={() => addToCart(product)}>
                  Add to cart
                </button>
              </article>
            ))}
          </div>
        </section>

        <section id="courses" className="section-pad courses-section">
          <div className="section-heading wide">
            <span className="eyebrow"><GraduationCap size={16} /> Free courses</span>
            <h2>Use free learning to attract people and turn them into service leads.</h2>
            <p>
              Visitors can enroll with email now. Later, connect this to accounts, course progress and paid learning.
            </p>
          </div>
          <div className="course-email-box">
            <Mail size={18} />
            <input
              value={courseEmail}
              onChange={(event) => setCourseEmail(event.target.value)}
              placeholder="Enter your email to enroll in free courses"
            />
          </div>
          <div className="course-grid">
            {courses.map((course) => {
              const enrolled = enrolledCourses.includes(course.id);
              return (
                <article className="course-card" key={course.id}>
                  <div className="course-topline"><BookOpen size={20} /><span>{course.category}</span></div>
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <div className="course-details">
                    <span>{course.level}</span>
                    <span>{course.duration}</span>
                    <span>{course.lessons} lessons</span>
                  </div>
                  <button
                    className={`button full ${enrolled ? "button-success" : "button-ghost"}`}
                    type="button"
                    onClick={() => enrollCourse(course.id)}
                  >
                    {enrolled ? "Enrolled" : "Enroll free"}
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        <section id="articles" className="section-pad articles-section">
          <div className="section-heading wide">
            <span className="eyebrow"><Newspaper size={16} /> Articles and news</span>
            <h2>Publish useful content that brings traffic and builds trust.</h2>
            <p>Use this area for Microsoft tips, Enash updates, technology news and business guides.</p>
          </div>
          <div className="article-grid">
            {articles.map((article) => (
              <article className="article-card" key={article.title}>
                <div className="article-tag"><FileText size={16} /> {article.category}</div>
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
                <div className="article-footer"><span>{article.date}</span><span>{article.read}</span></div>
              </article>
            ))}
          </div>
          <form className="newsletter" onSubmit={handleNewsletter}>
            <div>
              <strong>Get Enash updates</strong>
              <span>Microsoft tips, new courses, product drops and business technology news.</span>
            </div>
            <label>
              <Mail size={18} />
              <input
                value={newsletterEmail}
                onChange={(event) => setNewsletterEmail(event.target.value)}
                placeholder="Email address"
              />
            </label>
            <button className="button button-primary" type="submit">Subscribe</button>
            {newsletterMessage && <p>{newsletterMessage}</p>}
          </form>
        </section>

        <section id="quote" className="section-pad quote-section">
          <div className="quote-card">
            <div className="quote-copy">
              <span className="eyebrow"><Mail size={16} /> Quote builder</span>
              <h2>Let visitors build a request without calling first.</h2>
              <p>
                This form validates the request and creates an email-ready quote summary. Later, connect the same data to your backend.
              </p>
              <div className="quote-summary-box">
                <strong>Selected services</strong>
                {quote.selected.length === 0 ? <span>No services selected yet.</span> : quote.selected.map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>

            <form className="quote-form" onSubmit={handleQuoteSubmit}>
              <div className="form-grid">
                <label>Name<input value={quote.name} onChange={(event) => setQuote({ ...quote, name: event.target.value })} placeholder="Your name" /></label>
                <label>Email<input value={quote.email} onChange={(event) => setQuote({ ...quote, email: event.target.value })} placeholder="name@example.com" /></label>
                <label>Phone<input value={quote.phone} onChange={(event) => setQuote({ ...quote, phone: event.target.value })} placeholder="Optional" /></label>
                <label>Company<input value={quote.company} onChange={(event) => setQuote({ ...quote, company: event.target.value })} placeholder="Optional" /></label>
              </div>

              <div className="form-grid">
                <label>Budget
                  <select value={quote.budget} onChange={(event) => setQuote({ ...quote, budget: event.target.value })}>
                    <option>Under R2,500</option>
                    <option>R2,500 - R7,500</option>
                    <option>R7,500 - R15,000</option>
                    <option>R15,000+</option>
                  </select>
                </label>
                <label>Timeline
                  <select value={quote.timeline} onChange={(event) => setQuote({ ...quote, timeline: event.target.value })}>
                    <option>This week</option>
                    <option>This month</option>
                    <option>Next 2-3 months</option>
                    <option>Just researching</option>
                  </select>
                </label>
              </div>

              <fieldset className="checkbox-grid">
                <legend>Choose services</legend>
                {serviceOptions.map((label) => (
                  <button
                    type="button"
                    className={quote.selected.includes(label) ? "active" : ""}
                    key={label}
                    onClick={() => toggleQuoteService(label)}
                  >
                    <CheckCircle2 size={15} /> {label}
                  </button>
                ))}
              </fieldset>

              <label>Extra message
                <textarea
                  value={quote.message}
                  onChange={(event) => setQuote({ ...quote, message: event.target.value })}
                  placeholder="Tell us what you want to build, fix or sell."
                />
              </label>

              <button className="button button-primary full" type="submit">Prepare quote request</button>
              {quoteStatus === "error" && <p className="form-error">Add your name, a valid email and at least one selected service.</p>}
              {quoteStatus === "ready" && (
                <a className="button button-success full" href={buildMailto("Enash quote request", quoteBody)}>
                  Send request to Enash
                </a>
              )}
            </form>
          </div>
        </section>

        <section className="section-pad faq-section">
          <div className="section-heading">
            <span className="eyebrow"><HelpCircle size={16} /> FAQ</span>
            <h2>What is already working?</h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <article className="faq-item" key={faq.question}>
                <button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                  <span>{faq.question}</span>
                  <ChevronDown className={openFaq === index ? "rotate" : ""} size={20} />
                </button>
                {openFaq === index && <p>{faq.answer}</p>}
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section-pad contact-section">
          <div className="contact-card">
            <img src={logoIcon} alt="Enash icon" />
            <div>
              <span className="eyebrow"><Users size={16} /> Start with Enash</span>
              <h2>Ready to launch the full Enash platform?</h2>
              <p>
                Use this as the public website now, then connect payments, database, user accounts, admin dashboard and content management.
              </p>
            </div>
            <div className="contact-actions">
              <a className="button button-primary" href={`mailto:${CONTACT_EMAIL}`}>Email Enash</a>
              <a className="button button-ghost" href={SITE_URL}>Visit site</a>
              <span><Phone size={16} /> Add WhatsApp number later</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <img src={logoLight} alt="Enash" />
        <p>Microsoft services, developer services, online shop, free courses, articles and business technology support.</p>
        <span>© {new Date().getFullYear()} Enash. Built for www.enash.co.za.</span>
      </footer>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        total={cartTotal}
        updateQuantity={updateCartQuantity}
        checkoutHref={buildMailto("Enash shop order", checkoutBody)}
      />
    </div>
  );
}

function CartDrawer({ open, onClose, cart, total, updateQuantity, checkoutHref }) {
  return (
    <aside className={`cart-drawer ${open ? "open" : ""}`} aria-hidden={!open}>
      <div className="cart-head">
        <div>
          <span>Enash cart</span>
          <strong>{cart.length} item types</strong>
        </div>
        <button type="button" onClick={onClose} aria-label="Close cart"><X size={22} /></button>
      </div>

      <div className="cart-body">
        {cart.length === 0 ? (
          <div className="empty-cart">
            <ShoppingBag size={38} />
            <h3>Your cart is empty</h3>
            <p>Add service products, digital products or support packages from the shop.</p>
          </div>
        ) : (
          cart.map((item) => (
            <article className="cart-item" key={item.id}>
              <div>
                <strong>{item.name}</strong>
                <span>{formatCurrency(item.price)} each</span>
              </div>
              <div className="quantity-controls">
                <button type="button" onClick={() => updateQuantity(item.id, -1)}><Minus size={16} /></button>
                <span>{item.quantity}</span>
                <button type="button" onClick={() => updateQuantity(item.id, 1)}><Plus size={16} /></button>
              </div>
            </article>
          ))
        )}
      </div>

      <div className="cart-footer">
        <div><span>Total</span><strong>{formatCurrency(total)}</strong></div>
        {cart.length > 0 && <a className="button button-primary full" href={checkoutHref}>Request checkout</a>}
      </div>
    </aside>
  );
}

export default App;
