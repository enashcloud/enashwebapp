export const servicePackages = [
  {
    id: "microsoft-business-start",
    tag: "Microsoft A",
    title: "Microsoft Business Setup",
    summary: "Set up Microsoft 365, Outlook, Teams, OneDrive, SharePoint, device basics, and secure sign-in for a small business.",
    priceFrom: 1850,
    timeline: "2-5 business days",
    bestFor: "New businesses, solo operators, small teams, NGOs, schools, and local services.",
    includes: [
      "Domain email planning and mailbox setup",
      "Microsoft 365 user, group, and permission structure",
      "Teams channels, OneDrive folders, and SharePoint starter workspace",
      "Security defaults, MFA guidance, and recovery details",
      "User handover guide written in plain language"
    ],
    steps: [
      "Tell us your domain, number of users, and email needs.",
      "Choose whether you already have Microsoft licenses or need license guidance.",
      "Upload or list current emails and users.",
      "Confirm workspace structure and admin contact.",
      "Submit the request and get a reference plus implementation checklist."
    ],
    questions: ["Number of users", "Do you already own a domain?", "Do you already have Microsoft 365?", "Current email provider", "Preferred go-live date"]
  },
  {
    id: "azure-web-launch",
    tag: "Microsoft B",
    title: "Azure Website Launch",
    summary: "Host a public business website on Azure Static Web Apps or App Service with custom domain, HTTPS, and deployment workflow.",
    priceFrom: 2900,
    timeline: "3-7 business days",
    bestFor: "Companies launching or moving a website to Azure.",
    includes: [
      "Azure resource plan for static or dynamic hosting",
      "Custom domain and HTTPS configuration guidance",
      "GitHub/Vite/React deployment pipeline",
      "Basic monitoring and cost alert setup",
      "Launch checklist and rollback plan"
    ],
    steps: [
      "Confirm site type: static site, React app, API app, or full dashboard.",
      "Add domain details and current hosting information.",
      "Choose region, deployment method, and launch window.",
      "Review cost estimate and risk notes.",
      "Submit to generate your project plan."
    ],
    questions: ["Current website URL", "Domain provider", "React/static/API", "Need database?", "Target launch date"]
  },
  {
    id: "developer-build",
    tag: "Dev A",
    title: "Website or App Development",
    summary: "Design and build landing pages, dashboards, portals, booking systems, e-commerce flows, internal tools, and APIs.",
    priceFrom: 4500,
    timeline: "1-6 weeks",
    bestFor: "Businesses that need a working product, not only a design mockup.",
    includes: [
      "Feature map and screen plan",
      "React frontend build",
      "API/database planning",
      "Responsive layout and accessibility basics",
      "Handover notes and deployment preparation"
    ],
    steps: [
      "Choose the type of system you want built.",
      "Select required features and pages.",
      "Describe your users and business workflow.",
      "Confirm integrations such as payments, email, or database.",
      "Submit and receive an implementation scope."
    ],
    questions: ["System type", "Required pages", "Login needed?", "Payment needed?", "Example websites"]
  },
  {
    id: "business-automation",
    tag: "AI A",
    title: "Business Automation Sprint",
    summary: "Automate repeated tasks using forms, dashboards, scripts, AI assistance, email flows, and database-backed workflows.",
    priceFrom: 3800,
    timeline: "5-15 business days",
    bestFor: "Teams spending hours on repetitive admin, manual reports, spreadsheet cleanup, or customer follow-ups.",
    includes: [
      "Workflow mapping",
      "One automation built end-to-end",
      "Data validation and error handling",
      "Documentation for staff",
      "30-day improvement window"
    ],
    steps: [
      "Describe the repeated task.",
      "Upload or explain the current spreadsheet/form/system.",
      "Choose the trigger and output.",
      "Pick success rules and exception handling.",
      "Submit for automation scope."
    ],
    questions: ["Current manual task", "Trigger", "Output", "Tools currently used", "Approximate weekly hours wasted"]
  },
  {
    id: "managed-cloud-support",
    tag: "Care A",
    title: "Managed Cloud & IT Support",
    summary: "Ongoing monitoring, backups, updates, device guidance, cloud checks, and support for Microsoft/Azure systems.",
    priceFrom: 1500,
    timeline: "Monthly",
    bestFor: "Businesses that need stable systems without calling a technician for every small issue.",
    includes: [
      "Monthly health checks",
      "Backup and recovery review",
      "Security patching plan",
      "User and access review",
      "Support requests through a structured queue"
    ],
    steps: [
      "Tell us what systems you run.",
      "Choose support level and response expectation.",
      "List users/devices/servers/apps.",
      "Select monthly reporting needs.",
      "Submit to generate your support onboarding checklist."
    ],
    questions: ["Number of users", "Number of devices", "Azure resources", "Critical apps", "Preferred support level"]
  },
  {
    id: "training-and-enablement",
    tag: "Learn A",
    title: "Team Training & Enablement",
    summary: "Practical training for Microsoft tools, cloud basics, cyber hygiene, developer basics, AI productivity, and online business systems.",
    priceFrom: 1200,
    timeline: "Half-day to 4 weeks",
    bestFor: "Teams and individuals who want to stop depending on someone else for every simple technology task.",
    includes: [
      "Training needs assessment",
      "Custom learning path",
      "Practical exercises",
      "Short quizzes and handouts",
      "Completion records"
    ],
    steps: [
      "Choose training topics.",
      "Select beginner, intermediate, or advanced level.",
      "Add number of learners.",
      "Choose self-paced, live remote, or onsite request.",
      "Submit and receive training plan."
    ],
    questions: ["Topic", "Learners", "Level", "Training format", "Preferred start date"]
  }
];

export const serviceFeatureGroups = [
  {
    title: "Microsoft services",
    items: ["Microsoft 365 setup", "Outlook and Teams", "SharePoint/OneDrive", "Azure hosting", "Azure SQL planning", "Security basics"]
  },
  {
    title: "Developer services",
    items: ["React websites", "Dashboards", "APIs", "Authentication planning", "Database integration", "Deployment fixes"]
  },
  {
    title: "Business systems",
    items: ["Quotes and invoices", "Booking forms", "Customer portals", "Automation", "Reports", "Internal tools"]
  },
  {
    title: "Learning and content",
    items: ["Free courses", "Business tutorials", "Tech guides", "News analysis", "Templates", "Checklists"]
  }
];
