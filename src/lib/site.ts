/**
 * Single source of truth for identity, links, navigation, experience, and skills.
 * Prose write-ups live in /content as MDX; structured facts live here so the
 * layout components stay dumb.
 */

export const siteConfig = {
  name: 'Gaurav Sinha',
  role: 'Backend Engineer',
  // The positioning line. It should read on every page.
  tagline: 'Backend engineer who ships GenAI features in production.',
  description:
    'Backend engineer with 3.5+ years building distributed systems in Java, Go, and Python for U.S. banking and insurance clients — Kafka pipelines, microservices, zero-downtime Kubernetes deploys — plus production LLM work: RAG pipelines, LLM automation, and QLoRA fine-tuning.',
  location: 'Navi Mumbai, India',
  // Where I'll work: remote or these hubs.
  openTo: ['Remote', 'Bengaluru', 'Pune', 'Hyderabad', 'Gurugram', 'Mumbai'],
  // Set this to your deployed origin before generating the sitemap / OG tags.
  url: 'https://gauravsinha.vercel.app',
  email: 'gauravsinha6261@gmail.com',
  // Résumé hosted on Google Drive. Opens the Drive viewer (view + download).
  resumePath: 'https://drive.google.com/file/d/1wBUhTCyel-csjUbLq11r35-aBOVABH_n/view',
} as const;

export const socials = {
  github: 'https://github.com/gauravsinha12',
  linkedin: 'https://www.linkedin.com/in/gaurav-sinha31/',
  email: `mailto:${siteConfig.email}`,
} as const;

export const nav: { href: string; label: string }[] = [
  { href: '/projects', label: 'Projects' },
  { href: '/benchmarks', label: 'Benchmarks' },
  { href: '/experience', label: 'Experience' },
  { href: '/skills', label: 'Skills' },
];

/** A short line for the home page: what I'm building and studying right now. */
export const currently = {
  building:
    'CodeArena — a real-time 1v1 competitive coding platform, focused on the Go match engine and its WebSocket concurrency.',
  studying:
    'MS in Computer Science through Georgia Tech (OMSCS), expected 2028.',
} as const;

export type Client = {
  name: string;
  period: string;
  bullets: string[];
};

export type Role = {
  company: string;
  title: string;
  location: string;
  period: string;
  summary: string;
  clients: Client[];
};

export const experience: Role[] = [
  {
    company: 'Accenture',
    title: 'Advance App Engineering Analyst',
    location: 'Navi Mumbai, India',
    period: 'Dec 2022 – Present',
    summary:
      'Backend engineering across two long-running client engagements. Client work is under NDA, so client names are kept generic.',
    clients: [
      {
        name: 'Leading U.S. Insurance Provider',
        period: 'Feb 2025 – Present',
        bullets: [
          'Technical lead for backend feature delivery — broke product requirements into tasks, provided estimates, and drove agile delivery across backend and frontend teams.',
          'Built Spring Boot microservices with Kafka and RabbitMQ event-driven workflows, applying SOLID principles and design patterns — improved API efficiency by 45% and reduced response payload by 30%.',
          'Integrated MongoDB document storage with Redis distributed caching — cut DB response time by 35% for high-frequency reads.',
          'Shipped LLM-powered Python microservices with prompt-engineered pipelines embedded into product workflows; managed Jenkins CI/CD on AWS.',
        ],
      },
      {
        name: 'Top U.S. Investment Bank',
        period: 'Dec 2022 – Feb 2025',
        bullets: [
          'Architected UnitMate, an AI-assisted test automation platform (Spring Boot + Python on AWS) using LLM-based test generation — reduced manual QA effort by 30% and increased platform throughput by 40%.',
          'Implemented Kafka producers and consumers with multi-threaded concurrent processing on high-volume trading data pipelines; applied resiliency patterns — circuit breakers, retries, dead-letter queues.',
          'Led Blue-Green deployment strategy on Kubernetes with Jenkins CI/CD — zero-downtime releases and a 60% RTO improvement.',
          'Maintained 90%+ unit test coverage using JUnit and Mockito.',
        ],
      },
    ],
  },
];

export const education = [
  {
    school: 'Georgia Institute of Technology',
    degree: 'M.S. Computer Science (OMSCS)',
    period: 'Expected 2028',
    detail: 'Online Master of Science in Computer Science.',
  },
  {
    school: 'Lakshmi Narain College of Technology',
    degree: 'B.Tech, Computer Science',
    period: '2022',
    detail: 'CGPA 8.0.',
  },
];

export type SkillGroup = {
  title: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    items: ['Java', 'Python', 'Go', 'SQL', 'JavaScript'],
  },
  {
    title: 'Backend & Systems',
    items: [
      'Spring Boot',
      'Apache Kafka',
      'RabbitMQ',
      'Microservices',
      'REST APIs',
      'Event-Driven Architecture',
      'Concurrency & Multithreading',
      'HLD / LLD',
    ],
  },
  {
    title: 'AI / ML',
    items: [
      'RAG (LangChain, LangGraph)',
      'LLM Fine-tuning (QLoRA)',
      'Hugging Face (Transformers, PEFT, TRL)',
      'Vector DBs (ChromaDB, Qdrant)',
      'Prompt Engineering',
      'Agentic AI',
    ],
  },
  {
    title: 'Cloud & DevOps',
    items: [
      'AWS (EC2, S3, ECS)',
      'Docker',
      'Kubernetes',
      'Jenkins CI/CD',
      'Blue-Green Deployments',
    ],
  },
  {
    title: 'Databases',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL'],
  },
];

export type MoreProject = {
  name: string;
  description: string;
  stack: string[];
  github: string;
};

/**
 * Additional GitHub projects shown as a lighter grid below the three featured
 * write-ups. These link straight to the repo — they aren't full write-ups, so
 * they stay factual and short (no invented metrics, no engineering-decision
 * essays). Ordered roughly by how much they show, not by recency.
 */
export const moreProjects: MoreProject[] = [
  {
    name: 'ML_Trader',
    description:
      'Algorithmic trading system for Nifty 100 stocks, structured as a real pipeline — separate feed, aggregator, alpha, and execution modules — backed by a LightGBM multiclass model on five-minute bars.',
    stack: ['Python', 'LightGBM', 'Pandas'],
    github: 'https://github.com/gauravsinha12/ML_Trader',
  },
  {
    name: 'Corrective-Rag',
    description:
      'A standalone corrective RAG pipeline in LangChain and LangGraph: it grades each retrieved chunk, rewrites the query when retrieval is weak, and falls back to live web search before generating — orchestrated as a conditional state graph, with Chroma for vector storage.',
    stack: ['Python', 'LangChain', 'LangGraph', 'ChromaDB'],
    github: 'https://github.com/gauravsinha12/Corrective-Rag',
  },
  {
    name: 'AI-Fresher-Software-Engineer',
    description:
      'An autonomous coding agent that takes a fresher-level task, writes and runs Python through a built-in compiler, detects and fixes its own errors, and searches the web for solutions. Ships with a demo video of the full loop.',
    stack: ['Python', 'LLM Agents'],
    github: 'https://github.com/gauravsinha12/AI-Fresher-Software-Engineer',
  },
  {
    name: 'AI-Financial-Analyst',
    description:
      "Pulls a company's financials from the SimFin API and produces a structured analysis — balance sheet, cash flow, profitability, liquidity, solvency, and a Piotroski F-Score — with a backend swappable between the OpenAI API and a local Ollama (Llama 3.1) model.",
    stack: ['Python', 'OpenAI', 'Ollama'],
    github: 'https://github.com/gauravsinha12/AI-Financial-Analyst',
  },
  {
    name: 'EVA — Enhanced Virtual Assistant',
    description:
      'A multimodal voice assistant with a full record → transcribe → intent-route → respond → speak loop, plus calendar integration, webcam scene explanation, and screen and clipboard awareness — modularized across audio, vision, TTS, and calendar.',
    stack: ['Python', 'LLM', 'Speech', 'Vision'],
    github: 'https://github.com/gauravsinha12/EVA-Enchanced-Virtual-Assistant-',
  },
  {
    name: 'Rag-Talk-To-Any-Resume',
    description:
      'A from-scratch RAG pipeline with no framework: parses a PDF résumé with PyMuPDF, embeds chunks with sentence-transformers, retrieves the top matches by cosine similarity, and answers questions with Llama-3-70B on Groq.',
    stack: ['Python', 'PyMuPDF', 'sentence-transformers', 'Groq'],
    github: 'https://github.com/gauravsinha12/Rag-Talk-To-Any-Resume',
  },
  {
    name: 'AI-Sql-Engineer',
    description:
      'Turns natural-language questions into SQL run against a CSV, with a backend swappable between self-fine-tuned Mistral and Gemma models on Hugging Face and the Groq API.',
    stack: ['Python', 'Hugging Face', 'Groq'],
    github: 'https://github.com/gauravsinha12/AI-Sql-Engineer',
  },
  {
    name: 'Road-safety-Management-System',
    description:
      "A vehicle-detection system for traffic monitoring built on a pretrained SSD MobileNet V1 (COCO) via TensorFlow's Object Detection API, run against video input. Fully Dockerized.",
    stack: ['Python', 'TensorFlow', 'Docker'],
    github: 'https://github.com/gauravsinha12/Road-safety-Management-System',
  },
];
