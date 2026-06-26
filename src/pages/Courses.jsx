import React, { useMemo, useState } from "react";
import "./Courses.css";

const courses = [
  {
    id: "ai-work-productivity",
    title: "AI for Work, Business & Productivity",
    category: "AI & Digital",
    level: "Beginner to Intermediate",
    duration: "8 weeks",
    price: 2499,
    format: "Online + practical projects",
    badge: "High demand",
    summary:
      "A practical AI course for students, employees, entrepreneurs, administrators and small businesses — not just coders.",
    outcomes: [
      "Use AI tools safely and professionally",
      "Create documents, proposals, reports and business plans faster",
      "Automate repetitive admin tasks",
      "Build AI-assisted workflows for real business operations",
      "Understand AI risks, privacy, bias and responsible usage"
    ],
    modules: [
      "AI basics: what AI can and cannot do",
      "Prompt writing for business, school and work",
      "Using AI for research without copying blindly",
      "AI for emails, proposals, CVs and reports",
      "AI for spreadsheets, summaries and presentations",
      "AI for customer service and sales scripts",
      "AI for small business operations",
      "AI image, content and brand generation",
      "Responsible AI, privacy and data protection",
      "Final project: build your own AI-powered workflow"
    ],
    projects: [
      "Create a business proposal using AI",
      "Build a weekly productivity system",
      "Create a customer service response library"
    ],
    careers: [
      "Admin Assistant",
      "Business Assistant",
      "Virtual Assistant",
      "Entrepreneur",
      "Content Creator",
      "Office Support"
    ]
  },
  {
    id: "data-analysis-bi",
    title: "Data Analysis, Excel, SQL & Power BI",
    category: "Data & Finance",
    level: "Beginner to Job-ready",
    duration: "12 weeks",
    price: 3999,
    format: "Online + dashboard portfolio",
    badge: "Career path",
    summary:
      "A complete data course for people who want to work with business reports, finance dashboards, operations data and decision-making.",
    outcomes: [
      "Clean and organise messy data",
      "Use Excel formulas, pivot tables and dashboards",
      "Write SQL queries",
      "Create Power BI dashboards",
      "Present data insights professionally"
    ],
    modules: [
      "Data thinking and business questions",
      "Excel foundations and shortcuts",
      "Formulas, lookups and data cleaning",
      "Pivot tables and business reporting",
      "Introduction to databases",
      "SQL SELECT, WHERE, JOIN and GROUP BY",
      "Data cleaning and data quality",
      "Power BI basics",
      "Power BI relationships and DAX basics",
      "Dashboard design and storytelling",
      "Business case studies: sales, stock and finance",
      "Final project: full business intelligence dashboard"
    ],
    projects: [
      "Sales dashboard",
      "Inventory report",
      "Customer analysis dashboard",
      "Finance tracking workbook"
    ],
    careers: [
      "Data Analyst",
      "BI Assistant",
      "Reporting Analyst",
      "Operations Analyst",
      "Finance Assistant"
    ]
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing, Social Media & E-commerce",
    category: "Business & Marketing",
    level: "Beginner to Intermediate",
    duration: "10 weeks",
    price: 2999,
    format: "Online + campaign portfolio",
    badge: "Business ready",
    summary:
      "For entrepreneurs, creators and businesses that need real online visibility, sales funnels and content that converts.",
    outcomes: [
      "Create a digital marketing strategy",
      "Run social media campaigns",
      "Understand SEO and Google visibility",
      "Build product pages and sales funnels",
      "Track marketing results using analytics"
    ],
    modules: [
      "Digital marketing strategy",
      "Customer personas and positioning",
      "Brand voice and content planning",
      "Facebook, Instagram, TikTok and LinkedIn marketing",
      "Short-form video planning",
      "Copywriting for ads and product pages",
      "SEO basics and Google Business Profile",
      "Email and WhatsApp marketing flows",
      "E-commerce product listing strategy",
      "Marketing analytics and campaign reporting",
      "Budgeting and campaign optimisation",
      "Final project: launch-ready campaign"
    ],
    projects: [
      "30-day content calendar",
      "Product launch campaign",
      "Social media ad plan",
      "Marketing performance report"
    ],
    careers: [
      "Digital Marketer",
      "Social Media Manager",
      "Content Strategist",
      "E-commerce Assistant",
      "Small Business Owner"
    ]
  },
  {
    id: "project-management",
    title: "Project Management, Agile & Business Operations",
    category: "Management",
    level: "Beginner to Professional",
    duration: "10 weeks",
    price: 3499,
    format: "Online + templates",
    badge: "Leadership",
    summary:
      "A practical project management course for office teams, entrepreneurs, NGOs, construction admin, IT teams and operations staff.",
    outcomes: [
      "Plan and manage projects from start to finish",
      "Create project scopes, timelines and budgets",
      "Manage risks and stakeholders",
      "Use Agile and Kanban boards",
      "Run professional meetings and status reports"
    ],
    modules: [
      "Project management fundamentals",
      "Defining scope and deliverables",
      "Work breakdown structures",
      "Scheduling and timelines",
      "Budgeting and resource planning",
      "Risk management",
      "Stakeholder communication",
      "Agile, Scrum and Kanban basics",
      "Project documentation",
      "Quality control and handover",
      "Project reporting",
      "Final project: full project plan"
    ],
    projects: [
      "Project charter",
      "Gantt-style timeline",
      "Risk register",
      "Stakeholder report"
    ],
    careers: [
      "Project Coordinator",
      "Operations Assistant",
      "Team Leader",
      "Business Administrator",
      "Junior Project Manager"
    ]
  },
  {
    id: "bookkeeping-payroll",
    title: "Bookkeeping, Payroll & Small Business Finance",
    category: "Data & Finance",
    level: "Beginner",
    duration: "12 weeks",
    price: 3799,
    format: "Online + finance workbook",
    badge: "SME essential",
    summary:
      "A practical finance course for people who want to manage small business money, invoices, payroll and records properly.",
    outcomes: [
      "Understand income, expenses, assets and liabilities",
      "Create invoices and receipts",
      "Track cash flow",
      "Prepare payroll basics",
      "Read financial reports"
    ],
    modules: [
      "Business finance basics",
      "Bookkeeping principles",
      "Chart of accounts",
      "Invoices, receipts and statements",
      "Expense tracking",
      "Bank reconciliation",
      "Payroll basics",
      "VAT and tax awareness",
      "Cash-flow planning",
      "Profit and loss reports",
      "Basic balance sheet understanding",
      "Final project: small business finance pack"
    ],
    projects: [
      "Invoice system",
      "Monthly expense tracker",
      "Payroll sample sheet",
      "Cash-flow forecast"
    ],
    careers: [
      "Bookkeeping Assistant",
      "Payroll Assistant",
      "Finance Administrator",
      "Small Business Owner"
    ]
  },
  {
    id: "supply-chain-logistics",
    title: "Supply Chain, Procurement & Logistics",
    category: "Operations",
    level: "Beginner to Intermediate",
    duration: "10 weeks",
    price: 3499,
    format: "Online + case studies",
    badge: "In demand",
    summary:
      "For learners interested in stock control, warehousing, procurement, transport, delivery and operations management.",
    outcomes: [
      "Understand procurement and supplier management",
      "Manage stock and warehouse processes",
      "Track deliveries and logistics costs",
      "Prepare purchase orders",
      "Improve operational efficiency"
    ],
    modules: [
      "Supply chain fundamentals",
      "Procurement process",
      "Supplier selection and evaluation",
      "Purchase orders and documentation",
      "Inventory management",
      "Warehouse operations",
      "Transport and delivery planning",
      "Cost control in logistics",
      "Risk and compliance",
      "Customer fulfilment",
      "KPIs and reporting",
      "Final project: logistics improvement plan"
    ],
    projects: [
      "Supplier comparison sheet",
      "Stock control template",
      "Delivery planning dashboard",
      "Procurement policy draft"
    ],
    careers: [
      "Procurement Assistant",
      "Warehouse Controller",
      "Logistics Coordinator",
      "Operations Assistant",
      "Fleet Assistant"
    ]
  },
  {
    id: "solar-green-skills",
    title: "Solar PV, Energy Efficiency & Green Business Basics",
    category: "Green Skills",
    level: "Beginner",
    duration: "8 weeks",
    price: 3299,
    format: "Online + practical planning",
    badge: "Green economy",
    summary:
      "A non-engineering introduction to solar, backup power, energy audits and green business opportunities.",
    outcomes: [
      "Understand solar PV system components",
      "Calculate basic power needs",
      "Compare backup power options",
      "Understand safety and maintenance basics",
      "Create a simple energy-efficiency plan"
    ],
    modules: [
      "Energy basics",
      "Solar PV components",
      "Inverters, batteries and panels",
      "Load calculations",
      "Backup power planning",
      "Energy efficiency at home and business",
      "Safety basics and compliance awareness",
      "Maintenance and troubleshooting awareness",
      "Green business opportunities",
      "Final project: energy plan for a home or small business"
    ],
    projects: [
      "Basic load calculation",
      "Energy-saving checklist",
      "Backup power recommendation report"
    ],
    careers: [
      "Solar Sales Assistant",
      "Energy Advisor",
      "Facilities Assistant",
      "Green Business Assistant"
    ]
  },
  {
    id: "healthcare-admin",
    title: "Healthcare Administration & Medical Office Support",
    category: "Healthcare",
    level: "Beginner",
    duration: "10 weeks",
    price: 2999,
    format: "Online + admin templates",
    badge: "Non-clinical",
    summary:
      "For people who want to work in clinics, practices, pharmacies or healthcare offices without becoming doctors or nurses.",
    outcomes: [
      "Understand healthcare office workflow",
      "Manage appointments and patient records professionally",
      "Communicate with patients respectfully",
      "Understand confidentiality basics",
      "Prepare basic healthcare admin reports"
    ],
    modules: [
      "Healthcare workplace basics",
      "Patient service and communication",
      "Appointments and front-desk operations",
      "Medical records administration",
      "Confidentiality and privacy",
      "Basic medical terminology",
      "Stock and supplies tracking",
      "Claims and billing awareness",
      "Healthcare reporting",
      "Final project: clinic admin system"
    ],
    projects: [
      "Appointment workflow",
      "Patient communication templates",
      "Clinic stock tracker",
      "Admin report pack"
    ],
    careers: [
      "Medical Receptionist",
      "Clinic Administrator",
      "Healthcare Admin Assistant",
      "Pharmacy Assistant Support"
    ]
  },
  {
    id: "cybersecurity-governance",
    title: "Cybersecurity Awareness, Governance & Online Safety",
    category: "AI & Digital",
    level: "Beginner to Intermediate",
    duration: "8 weeks",
    price: 2999,
    format: "Online + security checklist",
    badge: "Business protection",
    summary:
      "A practical cybersecurity course for employees, small businesses, schools and non-technical teams.",
    outcomes: [
      "Recognise scams, phishing and social engineering",
      "Secure accounts and devices",
      "Create business security policies",
      "Understand backups and incident response",
      "Protect customer and company data"
    ],
    modules: [
      "Cybersecurity basics",
      "Passwords and multi-factor authentication",
      "Phishing and scam detection",
      "Device and Wi-Fi security",
      "Data protection basics",
      "Backups and recovery",
      "Security policies for small teams",
      "Incident response basics",
      "Online safety for children and schools",
      "Final project: security improvement plan"
    ],
    projects: [
      "Security checklist",
      "Phishing awareness poster",
      "Small business incident response plan"
    ],
    careers: [
      "Cybersecurity Assistant",
      "IT Support Assistant",
      "Compliance Assistant",
      "Office Administrator"
    ]
  },
  {
    id: "computer-hardware-support",
    title: "Computer Hardware, Networking & Technical Support",
    category: "Technical Support",
    level: "Beginner to Job-ready",
    duration: "12 weeks",
    price: 4299,
    format: "Online + practical labs",
    badge: "Hands-on",
    summary:
      "For learners who want to repair, upgrade and support computers, printers, routers and office technology.",
    outcomes: [
      "Identify computer parts and faults",
      "Upgrade RAM and storage",
      "Install operating systems and drivers",
      "Set up small office networks",
      "Troubleshoot printers and basic hardware issues"
    ],
    modules: [
      "Computer components",
      "Tools and safety",
      "Storage, RAM and performance upgrades",
      "Operating system installation",
      "Drivers and updates",
      "Basic networking",
      "Routers, Wi-Fi and IP basics",
      "Printer setup and troubleshooting",
      "Backup and recovery",
      "Customer support process",
      "Quoting and repair documentation",
      "Final project: full support case"
    ],
    projects: [
      "PC upgrade plan",
      "Network setup checklist",
      "Printer troubleshooting guide",
      "Customer repair report"
    ],
    careers: [
      "IT Support Technician",
      "Computer Repair Assistant",
      "Helpdesk Support",
      "Printer Support Assistant"
    ]
  },
  {
    id: "entrepreneurship-ecommerce",
    title: "Entrepreneurship, Online Selling & Business Launch",
    category: "Business & Marketing",
    level: "Beginner",
    duration: "10 weeks",
    price: 2999,
    format: "Online + launch plan",
    badge: "Start a business",
    summary:
      "A complete beginner course for turning an idea into a real business with pricing, branding, sales and operations.",
    outcomes: [
      "Validate a business idea",
      "Create offers and pricing",
      "Build a simple sales process",
      "Plan operations and delivery",
      "Launch with a realistic action plan"
    ],
    modules: [
      "Business idea validation",
      "Customer problem and solution fit",
      "Offer design",
      "Pricing and profit basics",
      "Brand identity basics",
      "Sales channels",
      "Online store planning",
      "Customer service and fulfilment",
      "Simple business compliance awareness",
      "Cash flow and reinvestment",
      "Launch campaign",
      "Final project: business launch pack"
    ],
    projects: [
      "Business model canvas",
      "Pricing calculator",
      "Launch checklist",
      "Sales script pack"
    ],
    careers: [
      "Entrepreneur",
      "Online Seller",
      "Business Assistant",
      "Sales Representative"
    ]
  },
  {
    id: "graphic-design-content",
    title: "Graphic Design, Branding & Content Creation",
    category: "Creative",
    level: "Beginner to Intermediate",
    duration: "10 weeks",
    price: 3299,
    format: "Online + portfolio",
    badge: "Creative skill",
    summary:
      "For learners who want to design posters, social content, brand kits, product graphics and marketing material.",
    outcomes: [
      "Create professional brand visuals",
      "Design social media posts and posters",
      "Understand typography and layout",
      "Build simple brand guidelines",
      "Prepare a design portfolio"
    ],
    modules: [
      "Design principles",
      "Colour, typography and layout",
      "Brand identity basics",
      "Canva and beginner-friendly design tools",
      "Social media design",
      "Poster and flyer design",
      "Product mockups",
      "Content planning",
      "Design for print",
      "Portfolio presentation",
      "Client briefing and revisions",
      "Final project: brand and content pack"
    ],
    projects: [
      "Brand kit",
      "Social media content pack",
      "Poster design",
      "Portfolio page"
    ],
    careers: [
      "Junior Designer",
      "Content Creator",
      "Social Media Assistant",
      "Brand Assistant"
    ]
  }
];

function money(value) {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0
  }).format(value);
}

function Courses() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [activeCourse, setActiveCourse] = useState(courses[0]);
  const [enrolment, setEnrolment] = useState({
    name: "",
    email: "",
    phone: "",
    course: courses[0].title,
    studyGoal: "",
    support: "Self-paced"
  });
  const [submitted, setSubmitted] = useState(null);

  const categories = useMemo(() => {
    return ["All", ...new Set(courses.map((course) => course.category))];
  }, []);

  const filteredCourses = useMemo(() => {
    const term = search.toLowerCase();

    return courses.filter((course) => {
      const matchesCategory =
        selectedCategory === "All" || course.category === selectedCategory;

      const matchesSearch =
        course.title.toLowerCase().includes(term) ||
        course.summary.toLowerCase().includes(term) ||
        course.careers.join(" ").toLowerCase().includes(term) ||
        course.modules.join(" ").toLowerCase().includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, search]);

  function handleSelectCourse(course) {
    setActiveCourse(course);
    setEnrolment((current) => ({
      ...current,
      course: course.title
    }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleEnrolmentChange(event) {
    const { name, value } = event.target;
    setEnrolment((current) => ({
      ...current,
      [name]: value
    }));
  }

  function submitEnrolment(event) {
    event.preventDefault();

    const reference = `ENASH-COURSE-${Date.now().toString().slice(-6)}`;
    const saved = {
      ...enrolment,
      reference,
      createdAt: new Date().toISOString()
    };

    const existing = JSON.parse(localStorage.getItem("enashCourseEnrolments") || "[]");
    localStorage.setItem(
      "enashCourseEnrolments",
      JSON.stringify([saved, ...existing])
    );

    setSubmitted(saved);
    setEnrolment({
      name: "",
      email: "",
      phone: "",
      course: activeCourse.title,
      studyGoal: "",
      support: "Self-paced"
    });
  }

  return (
    <main className="courses-page">
      <section className="courses-hero">
        <div>
          <p className="eyebrow">Enash Academy</p>
          <h1>Job-focused courses for real skills, not random short lessons.</h1>
          <p>
            Learn practical skills across AI, business, finance, healthcare,
            logistics, green energy, design and technical support. Each course
            includes modules, projects, outcomes and a portfolio-style final
            submission.
          </p>
          <div className="hero-actions">
            <a href="#course-catalogue" className="primary-btn">
              Explore courses
            </a>
            <a href="#enrol" className="secondary-btn">
              Enrol online
            </a>
          </div>
        </div>

        <div className="course-highlight-card">
          <span>{activeCourse.badge}</span>
          <h2>{activeCourse.title}</h2>
          <p>{activeCourse.summary}</p>
          <div className="highlight-grid">
            <div>
              <strong>{activeCourse.duration}</strong>
              <small>Duration</small>
            </div>
            <div>
              <strong>{activeCourse.level}</strong>
              <small>Level</small>
            </div>
            <div>
              <strong>{money(activeCourse.price)}</strong>
              <small>Course fee</small>
            </div>
          </div>
        </div>
      </section>

      <section className="course-detail-panel">
        <div className="course-detail-header">
          <div>
            <p className="eyebrow">{activeCourse.category}</p>
            <h2>{activeCourse.title}</h2>
            <p>{activeCourse.summary}</p>
          </div>
          <button
            type="button"
            className="primary-btn"
            onClick={() => {
              setEnrolment((current) => ({
                ...current,
                course: activeCourse.title
              }));
              document.getElementById("enrol")?.scrollIntoView({
                behavior: "smooth"
              });
            }}
          >
            Start enrolment
          </button>
        </div>

        <div className="course-detail-grid">
          <div>
            <h3>What you will be able to do</h3>
            <ul>
              {activeCourse.outcomes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Portfolio projects</h3>
            <ul>
              {activeCourse.projects.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Career paths</h3>
            <div className="pill-list">
              {activeCourse.careers.map((career) => (
                <span key={career}>{career}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="modules-box">
          <h3>Full course structure</h3>
          <div className="modules-grid">
            {activeCourse.modules.map((module, index) => (
              <article key={module}>
                <span>Module {index + 1}</span>
                <p>{module}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="catalogue-controls" id="course-catalogue">
        <div>
          <p className="eyebrow">Course catalogue</p>
          <h2>Choose a course path</h2>
        </div>

        <div className="filters">
          <input
            type="search"
            placeholder="Search course, skill or career..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            {categories.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="course-grid">
        {filteredCourses.map((course) => (
          <article className="course-card" key={course.id}>
            <div className="card-top">
              <span>{course.category}</span>
              <strong>{course.badge}</strong>
            </div>

            <h3>{course.title}</h3>
            <p>{course.summary}</p>

            <div className="course-meta">
              <span>{course.duration}</span>
              <span>{course.level}</span>
              <span>{money(course.price)}</span>
            </div>

            <div className="pill-list">
              {course.careers.slice(0, 3).map((career) => (
                <span key={career}>{career}</span>
              ))}
            </div>

            <button type="button" onClick={() => handleSelectCourse(course)}>
              View full course
            </button>
          </article>
        ))}
      </section>

      <section className="enrol-section" id="enrol">
        <div>
          <p className="eyebrow">Online enrolment</p>
          <h2>Enrol without calling anyone.</h2>
          <p>
            Learners can choose a course, submit details and receive a reference
            number immediately. For production, connect this form to your
            backend, CRM or payment provider.
          </p>

          {submitted && (
            <div className="success-box">
              <strong>Enrolment captured.</strong>
              <p>
                Reference: <b>{submitted.reference}</b>
              </p>
            </div>
          )}
        </div>

        <form className="enrol-form" onSubmit={submitEnrolment}>
          <label>
            Full name
            <input
              required
              name="name"
              value={enrolment.name}
              onChange={handleEnrolmentChange}
              placeholder="Your full name"
            />
          </label>

          <label>
            Email address
            <input
              required
              type="email"
              name="email"
              value={enrolment.email}
              onChange={handleEnrolmentChange}
              placeholder="you@example.com"
            />
          </label>

          <label>
            Phone number
            <input
              required
              name="phone"
              value={enrolment.phone}
              onChange={handleEnrolmentChange}
              placeholder="+27..."
            />
          </label>

          <label>
            Course
            <select
              name="course"
              value={enrolment.course}
              onChange={handleEnrolmentChange}
            >
              {courses.map((course) => (
                <option value={course.title} key={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </label>

          <label>
            Study support
            <select
              name="support"
              value={enrolment.support}
              onChange={handleEnrolmentChange}
            >
              <option>Self-paced</option>
              <option>Guided weekly support</option>
              <option>Private mentor support</option>
            </select>
          </label>

          <label className="full-field">
            What do you want to achieve?
            <textarea
              required
              name="studyGoal"
              value={enrolment.studyGoal}
              onChange={handleEnrolmentChange}
              placeholder="Example: I want to become a data analyst, improve my business, get a support job..."
            />
          </label>

          <button type="submit" className="primary-btn">
            Submit enrolment
          </button>
        </form>
      </section>
    </main>
  );
}

export default Courses;