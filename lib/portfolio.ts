export const locales = ["de", "en"] as const

export type Locale = (typeof locales)[number]

export const localePaths = {
  de: "/de/",
  en: "/en/",
} as const satisfies Record<Locale, `/${string}`>

export const sectionIds = [
  "intro",
  "experience",
  "projects",
  "skills",
  "education",
  "certificates",
  "publications",
  "languages",
  "contact",
] as const

export type SectionId = (typeof sectionIds)[number]

export const portfolioIds = {
  roles: ["cloudopserve", "noris", "antonov"],
  projects: ["servicenow-anonymizer", "now-assist-evaluator", "sparrow-ldap"],
  skills: [
    "python",
    "architecture",
    "sql",
    "devops",
    "aws",
    "terraform",
    "kubernetes-gitops",
    "automation",
    "go",
    "llm-fine-tuning",
    "react",
  ],
  education: ["computer-science", "studienkolleg"],
  certificates: ["lfca"],
  publications: ["wound-management-ai", "civil-military-ai"],
  conferences: ["gi-vrar-2025", "zech-innovation-2023"],
  languages: ["german", "english", "ukrainian", "russian"],
} as const

type RoleId = (typeof portfolioIds.roles)[number]
type ProjectId = (typeof portfolioIds.projects)[number]
type SkillId = (typeof portfolioIds.skills)[number]
type EducationId = (typeof portfolioIds.education)[number]
type CertificateId = (typeof portfolioIds.certificates)[number]
type ConferenceId = (typeof portfolioIds.conferences)[number]
type LanguageId = (typeof portfolioIds.languages)[number]

interface RoleFact {
  company: string
  start: string
  end: string | null
  location?: "coburg" | "nuremberg" | "leipzig"
  fixedTitle?: string
}

export const sharedPortfolio = {
  siteUrl: "https://gorobeyko.com",
  person: {
    firstName: "Borys",
    lastName: "Gorobeyko",
    email: "bgorobejko@gmail.com",
    city: "Coburg",
    currentRoleId: "cloudopserve" as RoleId,
    focus: ["Kubernetes", "GitOps", "AWS", "Terraform", "CI/CD", "Python"],
    socials: [
      { id: "github", name: "GitHub", url: "https://github.com/efedleikudl" },
      { id: "orcid", name: "ORCID", url: "https://orcid.org/0009-0006-6531-8767" },
      {
        id: "linkedin",
        name: "LinkedIn",
        url: "https://linkedin.com/in/borys-gorobeyko-b24ab7279",
      },
    ],
  },
  roles: {
    cloudopserve: {
      fixedTitle: "IT Cloud Engineer",
      company: "cloudopserve GmbH",
      start: "11/2025",
      end: null,
    },
    noris: {
      company: "Noris Network AG",
      start: "11/2024",
      end: "10/2025",
      location: "nuremberg",
    },
    antonov: {
      company: "Antonov Logistics SALIS GmbH",
      start: "09/2022",
      end: "02/2023",
      location: "leipzig",
    },
  } satisfies Record<RoleId, RoleFact>,
  projects: {
    "servicenow-anonymizer": {
      company: "Noris Network",
      github: "https://github.com/efedleikudl/sn_anonymizer",
      technologies: ["Python", "pandas", "NLP", "Multithreading", "CSV", "ServiceNow"],
    },
    "now-assist-evaluator": {
      company: "Noris Network",
      github: "https://github.com/efedleikudl/nowassist_evaluator",
      technologies: ["Requirements Analysis", "Python", "NowAssist", "NLI", "LLM", "Hugging Face"],
    },
    "sparrow-ldap": {
      company: "Antonov Logistics",
      technologies: ["C#", ".NET", "LDAP", "REST API", "CLI", "Linux"],
    },
  },
  education: {
    "computer-science": {
      start: "2020",
      end: "2025",
      institution: "Coburg University of Applied Sciences",
      location: "Coburg",
    },
    studienkolleg: {
      start: "2019",
      end: "2020",
      institution: "Studienkolleg Coburg",
      location: "Coburg",
    },
  },
  certificates: {
    lfca: {
      issuer: "The Linux Foundation",
      issued: "2026-01-24",
      credentialId: "LF-6645sqsb20",
      href: "/certificates/linux-foundation-certified-it-associate-lfca.pdf",
    },
  },
  publications: {
    "wound-management-ai": {
      authors:
        "Lurin, I., Gorobeiko, M., Sokol, Y., Usenko, O., Khoroshun, E., Makarov, V., Nehoduiko, V., Gumeniuk, K., Gorobeyko, B., & Dinets, A.",
      year: "2024",
      title: "A review of the artificial intelligence application as a guideline tool for the wound management",
      journal: "EMERGENCY MEDICINE, 20(5), 417–422",
      doi: "https://doi.org/10.22141/2224-0586.20.5.2024.1742",
    },
    "civil-military-ai": {
      authors: "Lurin I, Gorobeiko M, Lovin A, Gorobeyko B, Lovina N, Dinets A",
      year: "2024",
      title: "APPLICATION OF ARTIFICIAL INTELLIGENCE IN CIVIL AND MILITARY MEDICINE",
      journal: "Georgian Med News. 2024 Mar;(348):94-98",
      pmid: "38807400",
    },
  },
  conferences: {
    "gi-vrar-2025": {
      date: "09/2025",
      event: "GI VR/AR Workshop",
      location: "TU Chemnitz, Chemnitz",
      presentation:
        'Roman Kobets, Borys Gorobeyko and Jens Grubert: "Gazing into the Past: An Immersive Gallery of Historical Images via Camera-Guided Video Diffusion and Gaussian Splats"',
    },
    "zech-innovation-2023": {
      date: "2023",
      event: "Zech Sicherheitstechnik – Innovation Day",
      location: "Leipzig",
    },
  },
} as const

interface LocalizedCopy {
  metadata: { title: string; description: string; ogDescription: string }
  nav: Record<SectionId, string>
  ui: {
    skipLink: string
    sectionNavigation: string
    mobileNavigation: string
    openMenu: string
    closeMenu: string
    externalLink: string
    technologies: string
  }
  common: { present: string }
  hero: {
    eyebrow: string
    professionalTitle: string
    description: string
    availability: string
    country: string
    currentPosition: string
    focus: string
    viewProjects: string
    contact: string
  }
  about: { title: string; content: string }
  sectionTitles: Record<Exclude<SectionId, "intro" | "contact">, string>
  roles: Record<
    RoleId,
    { title?: string; description?: string; achievements?: readonly string[] }
  >
  locations: Record<NonNullable<RoleFact["location"]>, string>
  projects: Record<
    ProjectId,
    { name: string; description: string; achievements: readonly string[] }
  >
  skills: Record<SkillId, { name: string; description: string }>
  education: Record<EducationId, { degree: string; thesis?: string }>
  certificates: Record<CertificateId, { name: string }>
  certificateLabels: {
    issuer: string
    issued: string
    credentialId: string
    view: string
    download: string
  }
  conferences: Record<ConferenceId, { participation: string }>
  languages: Record<LanguageId, { name: string; level: string }>
  publications: { heading: string; conferencesHeading: string; doi: string; pmid: string }
  contact: { title: string; description: string; elsewhere: string; emailLabel: string }
  footer: { rights: string; builtWith: string }
}

const localizedCopy = {
  de: {
    metadata: {
      title: "Borys Gorobeyko – Cloud- & DevOps-Engineer",
      description:
        "Portfolio von Borys Gorobeyko, Cloud- und DevOps-Engineer mit Fokus auf sichere, automatisierte Infrastruktur, Kubernetes, AWS, GitOps und KI-gestützte Lösungen.",
      ogDescription:
        "Cloud- und DevOps-Engineer mit Fokus auf sichere, automatisierte Infrastruktur, Kubernetes, AWS, GitOps und KI-gestützte Lösungen.",
    },
    nav: {
      intro: "Über mich",
      experience: "Erfahrung",
      projects: "Projekte",
      skills: "Kompetenzen",
      education: "Ausbildung",
      certificates: "Zertifikate",
      publications: "Publikationen",
      languages: "Sprachen",
      contact: "Kontakt",
    },
    ui: {
      skipLink: "Zum Inhalt springen",
      sectionNavigation: "Seitennavigation",
      mobileNavigation: "Mobile Seitennavigation",
      openMenu: "Menü öffnen",
      closeMenu: "Menü schließen",
      externalLink: "öffnet in einem neuen Tab",
      technologies: "Technologien",
    },
    common: { present: "heute" },
    hero: {
      eyebrow: "PORTFOLIO",
      professionalTitle: "Cloud- & DevOps-Engineer",
      description:
        "Ich entwickle, automatisiere und betreibe sichere Infrastrukturen für Banken und Brokerhäuser – mit Cloud, Kubernetes, GitOps und zuverlässiger Automatisierung für geschäftskritische Systeme.",
      availability: "Offen für Kooperationen",
      country: "Deutschland",
      currentPosition: "AKTUELLE STELLE",
      focus: "SCHWERPUNKT",
      viewProjects: "Projekte ansehen",
      contact: "Kontakt",
    },
    about: {
      title: "Über mich",
      content:
        "Ich bin Cloud- und DevOps-Engineer mit einem Hintergrund in Informatik. Ich konzipiere, automatisiere und betreibe Infrastruktur für Finanzinstitute, darunter Banken und Brokerhäuser. Mein Schwerpunkt umfasst AWS, Kubernetes, GitOps, Infrastructure as Code, CI/CD, Workload-Automatisierung und Linux-Betrieb. KI und Data Engineering setze ich dort ein, wo sie einen konkreten operativen Mehrwert schaffen.",
    },
    sectionTitles: {
      experience: "Berufserfahrung",
      projects: "Projekte",
      skills: "Kompetenzen",
      education: "Ausbildung",
      certificates: "Zertifikate",
      publications: "Publikationen & Konferenzen",
      languages: "Sprachkenntnisse",
    },
    roles: {
      cloudopserve: {
        description:
          "Konzeption, Automatisierung und Betrieb von Infrastruktur für Finanzinstitute, darunter Banken und Brokerhäuser.",
        achievements: [
          "Betreue und optimiere sichere, zuverlässige Infrastruktur in AWS-, Kubernetes- und Linux-Umgebungen.",
          "Automatisiere Bereitstellung und Deployments mit Terraform, Flux-basiertem GitOps und CI/CD-Pipelines.",
          "Betreibe und überwache geschäftskritische Workloads, analysiere Störungen und automatisiere wiederkehrende Abläufe mit JS7 JobScheduler und n8n.",
        ],
      },
      noris: {
        title: "Werkstudent IT Service Management",
        description: "Entwicklung von KI-gestützten Lösungen für IT-Service-Management.",
        achievements: [
          "Entwickelte eine DSGVO-konforme Pseudonymisierungspipeline für ServiceNow-CSV-Exporte mit deterministischer Seed-Initialisierung und Parallelisierung (Multiprocessing) und sicherte die tabellenübergreifende referenzielle Integrität.",
          "Entwickelte einen LLM-Evaluator mit Composite Quality Index (CQI) und NLI-Prüfungen zum Benchmarking der Now-Assist-Antworten.",
          "Konzipierte Prompts, Guardrails und Monitoring für Now Assist (GenAI) im ITSM.",
        ],
      },
      antonov: {
        title: "Praktikant Softwareentwicklung",
        description: "Entwicklung interner Authentifizierungssysteme.",
        achievements: [
          "Standardisierte die interne Authentifizierung durch den Ersatz von Drittanbieter-Tools mit einem eigenentwickelten LDAP-Client in C#.",
          "Stellte eine REST-/CLI-Schnittstelle für Service-Integrationen bereit.",
        ],
      },
    },
    locations: {
      coburg: "Coburg, Deutschland",
      nuremberg: "Nürnberg, Deutschland",
      leipzig: "Leipzig, Deutschland",
    },
    projects: {
      "servicenow-anonymizer": {
        name: "ServiceNow-Datenanonymisierungstool",
        description:
          "DSGVO-konforme Testdaten bereitgestellt, gemessen an fehlerfreien ServiceNow-Importen bei erhaltener referenzieller Integrität, durch einen modularen Python-Anonymisierer mit deterministischem Seeding und Multiprozess-Pipelines.",
        achievements: [
          "Volle PII-Abdeckung, messbar am präzisen Maskieren von Namen, E-Mails, Telefonnummern, Adressen und Firmen auch im Freitext, durch die Kombination aus Regex und NLP.",
          "Reproduzierbarkeit gesichert, gemessen an konsistenten Wiederholungsläufen und Validierungen, durch Seed-basierte Anonymisierung und robuste Export-Workflows.",
          "Ergebnis: DSGVO-konforme Testdatengenerierung für Entwicklungs- und Testumgebungen bei erhaltener referenzieller Integrität und Datenstruktur ermöglicht.",
        ],
      },
      "now-assist-evaluator": {
        name: "Evaluator für Now Assist",
        description:
          "KI-Antwortqualität standardisiert, gemessen über einen vertrauensgradbasierten Composite Quality Index, durch den Aufbau eines vierstufigen Evaluators auf semantischer, pragmatischer, lexikalischer und struktureller Ebene.",
        achievements: [
          "Analysefähigkeit erhöht, messbar an CSV-Exporten pro Stufe und am Gesamtscore, durch stabile Exportmodule.",
          "Durchsatz skaliert, gemessen an effizienter NLI-Verarbeitung und besserer GPU-Auslastung, durch die Integration von Transformers mit Batching und Lazy Loading.",
          "Ergebnis: Unternehmensspezifische KI-Integration beschleunigt, messbar an kürzeren Integrationszyklen und weniger Nacharbeit, durch aufgabengewichtete Scores, Prompts und Guardrails für Now Assist im ITSM.",
        ],
      },
      "sparrow-ldap": {
        name: "Sparrow LDAP Client",
        description:
          "Interne Authentifizierung standardisiert, gemessen an der vollständigen Ablösung von Drittanbieter-Tools, durch die Entwicklung eines eigenständigen LDAP-Clients in C# mit Bind/Search/Add/Modify/Delete und Desktop-GUI.",
        achievements: [
          "Onboarding-Aufwand reduziert, messbar an schnelleren Massenaktualisierungen, durch LDIF-/CSV-Import und -Export sowie eine visuelle GUI.",
          "Provisionierung automatisiert, gemessen an stabilen Service-Integrationen, durch bereitgestellte REST- und CLI-Schnittstellen.",
          "Ergebnis: LDAP-Zugriff über alle Teams standardisiert und die Abhängigkeit von Drittanbieter-Tools beseitigt.",
        ],
      },
    },
    skills: {
      python: { name: "Python", description: "Datenpipelines mit pandas, CLI-Tools, asynchrone Jobs, ML-/NLP-Workflows mit Hugging Face Transformers und PyTorch sowie NumPy." },
      architecture: { name: "Softwaremodellierung und -architektur", description: "UML-, Sequenz- und ER-Diagramme, Architekturstile, API-Design, modulare Services, Prototyping sowie Anforderungsanalyse und -zerlegung." },
      sql: { name: "SQL", description: "Schema-Design, Mehrtabellen-Joins, Fensterfunktionen, Indexierung und Grundlagen von Abfrageplänen mit PostgreSQL und MySQL." },
      devops: { name: "DevOps", description: "Sicherer Linux-Betrieb, GitHub und GitLab, Konzeption und Pflege von CI/CD-Pipelines, Docker, Monitoring, Incident Response, Release- und Deployment-Prozesse sowie Scripting." },
      aws: { name: "Amazon Web Services", description: "Bereitstellung und Betrieb von AWS-Infrastruktur mit Fokus auf IAM, Netzwerke, Compute und Storage, Monitoring sowie sichere, reproduzierbare Deployments." },
      terraform: { name: "Terraform", description: "Infrastructure as Code mit wiederverwendbaren Modulen, Remote State, Plan-/Apply-Workflows, Reviews und reproduzierbaren Umgebungen." },
      "kubernetes-gitops": { name: "Kubernetes & Flux GitOps", description: "Container-Orchestrierung, Deployments, Services, Ingress, Konfigurations- und Secret-Management, Helm sowie GitOps-Deployments und Reconciliation mit Flux." },
      automation: { name: "Automatisierung mit JS7 & n8n", description: "Planung, Orchestrierung und Überwachung von Jobs und Workflows mit JS7 JobScheduler sowie ereignisgesteuerte Integrationen und Prozessautomatisierung mit n8n." },
      go: { name: "Go (Golang)", description: "Entwicklung zuverlässiger CLI-Tools, Automatisierungsdienste, APIs und nebenläufiger Workloads mit Goroutines, Channels, Tests und Go Modules." },
      "llm-fine-tuning": { name: "LLM Fine-Tuning", description: "Datensatzkuratierung und -bereinigung, Instruction-Tuning mit Hugging Face Transformers und PEFT/LoRA/QLoRA, Prompt-Vorlagen und Tokenisierung sowie Trainings- und Validierungspipelines." },
      react: { name: "React (+ TypeScript)", description: "Vite-Apps, Komponentendesign, Tailwind CSS/shadcn/ui, responsive Layouts und API-Integration." },
    },
    education: {
      "computer-science": {
        degree: "B. Sc. Informatik",
        thesis: "Bachelorarbeit: Datenschutzkonforme ITSM-Prozessunterstützung durch generative und agentenbasierte KI auf Basis der ServiceNow-Plattform.",
      },
      studienkolleg: { degree: "Technische Hochschulzugangsberechtigung" },
    },
    certificates: {
      lfca: { name: "Linux Foundation Certified IT Associate (LFCA)" },
    },
    certificateLabels: {
      issuer: "Aussteller",
      issued: "Ausgestellt",
      credentialId: "Zertifikats-ID",
      view: "Zertifikat ansehen",
      download: "PDF herunterladen",
    },
    conferences: {
      "gi-vrar-2025": { participation: "Vortrag" },
      "zech-innovation-2023": { participation: "Teilnehmer" },
    },
    languages: {
      german: { name: "Deutsch", level: "C1" },
      english: { name: "Englisch", level: "C1" },
      ukrainian: { name: "Ukrainisch", level: "Muttersprache" },
      russian: { name: "Russisch", level: "Muttersprache" },
    },
    publications: { heading: "Veröffentlichungen", conferencesHeading: "Konferenzen", doi: "DOI", pmid: "PMID" },
    contact: {
      title: "Kontakt aufnehmen",
      description: "Ich bin immer an neuen Möglichkeiten, Kooperationen und Gesprächen über Technologie und Innovation interessiert.",
      elsewhere: "Oder finden Sie mich hier:",
      emailLabel: "E-Mail an Borys Gorobeyko",
    },
    footer: { rights: "Alle Rechte vorbehalten", builtWith: "Erstellt mit viel Kaffee" },
  },
  en: {
    metadata: {
      title: "Borys Gorobeyko – Cloud & DevOps Engineer",
      description:
        "Portfolio of Borys Gorobeyko, a Cloud and DevOps engineer focused on secure, automated infrastructure, Kubernetes, AWS, GitOps, and AI-powered solutions.",
      ogDescription:
        "Cloud and DevOps engineer focused on secure, automated infrastructure, Kubernetes, AWS, GitOps, and AI-powered solutions.",
    },
    nav: {
      intro: "About",
      experience: "Experience",
      projects: "Projects",
      skills: "Skills",
      education: "Education",
      certificates: "Certificates",
      publications: "Publications",
      languages: "Languages",
      contact: "Contact",
    },
    ui: {
      skipLink: "Skip to content",
      sectionNavigation: "Section navigation",
      mobileNavigation: "Mobile section navigation",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      externalLink: "opens in a new tab",
      technologies: "technologies",
    },
    common: { present: "present" },
    hero: {
      eyebrow: "PORTFOLIO",
      professionalTitle: "Cloud & DevOps Engineer",
      description:
        "I design, automate, and operate secure infrastructure for banks and brokerages—using cloud, Kubernetes, GitOps, and reliable automation to keep business-critical systems running.",
      availability: "Open to collaboration",
      country: "Germany",
      currentPosition: "CURRENT POSITION",
      focus: "FOCUS",
      viewProjects: "View projects",
      contact: "Contact",
    },
    about: {
      title: "About me",
      content:
        "I am a Cloud and DevOps engineer with a computer science background. I design, automate, and operate infrastructure for financial institutions, including banks and brokerages. My work spans AWS, Kubernetes, GitOps, Infrastructure as Code, CI/CD, workload automation, and Linux operations. I also apply AI and data engineering where they create practical operational value.",
    },
    sectionTitles: {
      experience: "Professional experience",
      projects: "Projects",
      skills: "Skills",
      education: "Education",
      certificates: "Certificates",
      publications: "Publications & conferences",
      languages: "Language skills",
    },
    roles: {
      cloudopserve: {
        description:
          "Designing, automating, and operating infrastructure for financial institutions, including banks and brokerages.",
        achievements: [
          "Manage and improve secure, reliable infrastructure across AWS, Kubernetes, and Linux environments.",
          "Automate provisioning and deployments with Terraform, Flux-based GitOps, and CI/CD pipelines.",
          "Operate and monitor business-critical workloads, troubleshoot incidents, and automate recurring workflows with JS7 JobScheduler and n8n.",
        ],
      },
      noris: {
        title: "Working Student, IT Service Management",
        description: "Development of AI-powered solutions for IT service management.",
        achievements: [
          "Developed a GDPR-compliant pseudonymization pipeline for ServiceNow CSV exports with deterministic seed initialization and parallelization (multiprocessing), while ensuring cross-table referential integrity.",
          "Developed an LLM evaluator with a Composite Quality Index (CQI) and NLI checks for benchmarking Now Assist responses.",
          "Designed prompts, guardrails, and monitoring for Now Assist (GenAI) in ITSM.",
        ],
      },
      antonov: {
        title: "Software Developer Intern",
        description: "Development of internal authentication systems.",
        achievements: [
          "Standardized internal authentication by replacing third-party tools with a custom LDAP client in C#.",
          "Provided a REST/CLI interface for service integrations.",
        ],
      },
    },
    locations: {
      coburg: "Coburg, Germany",
      nuremberg: "Nuremberg, Germany",
      leipzig: "Leipzig, Germany",
    },
    projects: {
      "servicenow-anonymizer": {
        name: "ServiceNow Data Anonymization Tool",
        description:
          "Provided GDPR-compliant test data, measured by error-free ServiceNow imports with preserved referential integrity, through a modular Python anonymizer with deterministic seeding and multiprocess pipelines.",
        achievements: [
          "Full PII coverage, measurable through precise masking of names, emails, phone numbers, addresses, and companies, including in free text, by combining regex and NLP.",
          "Ensured reproducibility, measured by consistent repeat runs and validations, through seed-based anonymization and robust export workflows.",
          "Result: Enabled GDPR-compliant test data generation for development and test environments while preserving referential integrity and data structure.",
        ],
      },
      "now-assist-evaluator": {
        name: "Now Assist Evaluator",
        description:
          "Standardized AI response quality, measured through a confidence-based Composite Quality Index, by building a four-stage evaluator across semantic, pragmatic, lexical, and structural levels.",
        achievements: [
          "Increased analysis capability, measurable through CSV exports per stage and an overall score, with stable export modules.",
          "Scaled throughput, measured by efficient NLI processing and improved GPU utilization, by integrating Transformers with batching and lazy loading.",
          "Result: Accelerated enterprise-specific AI integration, measurable through shorter integration cycles and less rework, using task-weighted scores, prompts, and guardrails for Now Assist in ITSM.",
        ],
      },
      "sparrow-ldap": {
        name: "Sparrow LDAP Client",
        description:
          "Standardized internal authentication, measured by the complete replacement of third-party tools, through a standalone LDAP client in C# with Bind/Search/Add/Modify/Delete and a desktop GUI.",
        achievements: [
          "Reduced onboarding effort, measurable through faster bulk updates, with LDIF/CSV import and export plus a visual GUI.",
          "Automated provisioning, measured by stable service integrations, through REST and CLI interfaces.",
          "Result: Standardized LDAP access across teams and eliminated the dependency on third-party tools.",
        ],
      },
    },
    skills: {
      python: { name: "Python", description: "Data pipelines with pandas, CLI tools, asynchronous jobs, ML/NLP workflows with Hugging Face Transformers and PyTorch, and NumPy." },
      architecture: { name: "Software Modeling and Architecture", description: "UML, sequence and ER diagrams, architecture styles, API design, modular services, prototyping, requirements analysis, and decomposition." },
      sql: { name: "SQL", description: "Schema design, multi-table joins, window functions, indexing, and query plan basics with PostgreSQL and MySQL." },
      devops: { name: "DevOps", description: "Secure Linux operations, GitHub and GitLab, CI/CD pipeline design and maintenance, Docker, monitoring, incident response, release and deployment processes, and scripting." },
      aws: { name: "Amazon Web Services", description: "Provisioning and operating AWS infrastructure with a focus on IAM, networking, compute and storage, monitoring, and secure, repeatable deployments." },
      terraform: { name: "Terraform", description: "Infrastructure as Code with reusable modules, remote state, plan/apply workflows, reviews, and reproducible environments." },
      "kubernetes-gitops": { name: "Kubernetes & Flux GitOps", description: "Container orchestration, deployments, services, ingress, configuration and secret management, Helm, and GitOps deployments and reconciliation with Flux." },
      automation: { name: "Automation with JS7 & n8n", description: "Scheduling, orchestrating, and monitoring jobs and workflows with JS7 JobScheduler, plus event-driven integrations and process automation with n8n." },
      go: { name: "Go (Golang)", description: "Building reliable CLI tools, automation services, APIs, and concurrent workloads with goroutines, channels, testing, and Go modules." },
      "llm-fine-tuning": { name: "LLM Fine-Tuning", description: "Dataset curation and cleaning, instruction tuning with Hugging Face Transformers and PEFT/LoRA/QLoRA, prompt templates and tokenization, and training/validation pipelines." },
      react: { name: "React (+ TypeScript)", description: "Vite apps, component design, Tailwind CSS/shadcn/ui, responsive layouts, and API integration." },
    },
    education: {
      "computer-science": {
        degree: "B. Sc. Computer Science",
        thesis: "Bachelor thesis: Privacy-compliant ITSM process support through generative and agent-based AI on the ServiceNow platform.",
      },
      studienkolleg: { degree: "Technical University Entrance Qualification" },
    },
    certificates: {
      lfca: { name: "Linux Foundation Certified IT Associate (LFCA)" },
    },
    certificateLabels: {
      issuer: "Issuer",
      issued: "Issued",
      credentialId: "Credential ID",
      view: "View certificate",
      download: "Download PDF",
    },
    conferences: {
      "gi-vrar-2025": { participation: "Presentation" },
      "zech-innovation-2023": { participation: "Participant" },
    },
    languages: {
      german: { name: "German", level: "C1" },
      english: { name: "English", level: "C1" },
      ukrainian: { name: "Ukrainian", level: "Native" },
      russian: { name: "Russian", level: "Native" },
    },
    publications: { heading: "Publications", conferencesHeading: "Conferences", doi: "DOI", pmid: "PMID" },
    contact: {
      title: "Get in touch",
      description: "I am always interested in new opportunities, collaborations, and conversations about technology and innovation.",
      elsewhere: "Or find me here:",
      emailLabel: "Email Borys Gorobeyko",
    },
    footer: { rights: "All rights reserved", builtWith: "Built with plenty of coffee" },
  },
} as const satisfies Record<Locale, LocalizedCopy>

function formatPeriod(start: string, end: string | null, present: string) {
  return `${start} – ${end ?? present}`
}

function formatCertificateDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`))
}

export function getPortfolioContent(locale: Locale) {
  const copy = localizedCopy[locale]
  const facts = sharedPortfolio
  const currentRoleFact: RoleFact = facts.roles[facts.person.currentRoleId]

  return {
    locale,
    path: localePaths[locale],
    metadata: copy.metadata,
    navigation: sectionIds.map((id) => ({ id, label: copy.nav[id] })),
    ui: copy.ui,
    person: {
      ...facts.person,
      fullName: `${facts.person.firstName} ${facts.person.lastName}`,
      professionalTitle: copy.hero.professionalTitle,
      location: `${facts.person.city}, ${copy.hero.country}`,
    },
    hero: {
      ...copy.hero,
      currentRole: {
        title: currentRoleFact.fixedTitle ?? "",
        company: currentRoleFact.company,
        period: formatPeriod(currentRoleFact.start, currentRoleFact.end, copy.common.present),
      },
    },
    about: copy.about,
    sectionTitles: copy.sectionTitles,
    experience: portfolioIds.roles.map((id) => {
      const fact: RoleFact = facts.roles[id]
      const localized: LocalizedCopy["roles"][RoleId] = copy.roles[id]
      return {
        id,
        title: fact.fixedTitle ?? localized.title ?? "",
        company: fact.company,
        period: formatPeriod(fact.start, fact.end, copy.common.present),
        location: fact.location ? copy.locations[fact.location] : undefined,
        description: localized.description,
        achievements: localized.achievements ?? [],
      }
    }),
    projects: portfolioIds.projects.map((id) => ({
      id,
      ...facts.projects[id],
      ...copy.projects[id],
    })),
    skills: portfolioIds.skills.map((id) => ({ id, ...copy.skills[id] })),
    education: portfolioIds.education.map((id) => {
      const fact = facts.education[id]
      return {
        id,
        ...fact,
        period: `${fact.start} – ${fact.end}`,
        ...copy.education[id],
      }
    }),
    certificates: portfolioIds.certificates.map((id) => ({
      id,
      ...facts.certificates[id],
      issuedLabel: formatCertificateDate(facts.certificates[id].issued, locale),
      ...copy.certificates[id],
    })),
    certificateLabels: copy.certificateLabels,
    publications: portfolioIds.publications.map((id) => ({
      id,
      ...facts.publications[id],
    })),
    conferences: portfolioIds.conferences.map((id) => ({
      id,
      ...facts.conferences[id],
      name: `${facts.conferences[id].event} — ${copy.conferences[id].participation}`,
    })),
    publicationLabels: copy.publications,
    languages: portfolioIds.languages.map((id) => ({ id, ...copy.languages[id] })),
    contact: { ...copy.contact, email: facts.person.email, socials: facts.person.socials },
    footer: { ...copy.footer, year: new Date().getUTCFullYear() },
  }
}

export type PortfolioContent = ReturnType<typeof getPortfolioContent>
