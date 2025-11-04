import { ContentData } from '@/types/content';

export const contentData: ContentData = {
  apps: [
    {
      id: "devcontext-workspace",
      title: "DevContext: AI-Powered Developer Workspace",
      shortDescription: "Unified developer workspace with AI-powered semantic grouping that eliminates context-switching across GitHub, Jira, and Slack, saving 30+ minutes daily.",
      tech: ["React", "TypeScript", "Node.js", "PostgreSQL", "OpenAI", "Redis", "Fastify"],
      role: "Full-Stack Developer",
      dateRange: "2024",
      thumbnail: "/images/apps/devcontext.svg",
      repoUrl: "",
      liveUrl: "",
      status: "Live",
      featured: true,
      tags: ["AI", "Full-Stack", "Productivity"],
      problem: "Developers lose 23-42% of productive time to tool fragmentation, switching between 14+ tools daily with related work scattered across platforms.",
      solution: "Unified workspace with AI-powered semantic grouping that aggregates GitHub, Jira, and Slack into a single dashboard with intelligent context clustering.",
      myContribution: "Built full-stack application from architecture to deployment, implementing AI embeddings for semantic grouping, real-time sync system, and command palette interface.",
      features: [
        "AI-powered context grouping using OpenAI embeddings",
        "Unified dashboard for commits, PRs, issues, and discussions",
        "Natural language semantic search (<200ms)",
        "Smart auto-sync with intelligent caching",
        "VS Code-style command palette (Cmd+K)",
        "Real-time updates via WebSockets"
      ],
      screenshots: [],
      metrics: { 
        contextSwitchingReduction: 70, 
        searchSpeed: 200, 
        cognitiveLoadReduction: 85,
        documentsProcessed: 10000,
        accuracyRate: 85
      },
      learned: [
        "AI embeddings and vector similarity",
        "Real-time system architecture",
        "OAuth 2.0 integration patterns",
        "Performance optimization at scale",
        "Semantic clustering algorithms"
      ]
    },
    {
      id: "fitnotes-fitness-app",
      title: "FitNotes: AI-Powered Notes-Based Fitness App",
      shortDescription: "Notes-based fitness app that lets users journal workouts and habits in plain text, while an LLM-powered analysis engine extracts structured insights like performance trends, muscle group focus, and recovery gaps.",
      tech: ["React", "Node.js", "TypeScript", "OpenAI API", "PostgreSQL", "TailwindCSS"],
      role: "Solo Project",
      dateRange: "2024 – Present",
      thumbnail: "/images/apps/insurance-rag.svg",
      repoUrl: "",
      liveUrl: "",
      status: "Live",
      featured: true,
      tags: ["AI", "Productivity", "NLP", "HealthTech", "React"],
      problem: "Traditional fitness tracking apps are rigid and data-heavy — users spend more time entering metrics than reflecting on progress. There was no intuitive way to log workouts naturally and gain meaningful AI insights from those notes.",
      solution: "Built FitNotes, a notes-based fitness app that lets users journal workouts and habits in plain text, while an LLM-powered analysis engine extracts structured insights like performance trends, muscle group focus, and recovery gaps.",
      myContribution: "Built full-stack fitness tracking application with natural language processing, LLM-powered analysis, and intelligent insights dashboard.",
      features: [
        "Natural language workout logging — users write freeform notes that are parsed into structured data",
        "LLM-powered summarization to track weekly progress, workout diversity, and performance consistency",
        "Smart insights dashboard with visual summaries of strength, cardio, and recovery balance",
        "Custom reminders & goal tracking generated from user patterns and missed sessions",
        "Private, secure journaling — all data stored locally or securely synced via backend API"
      ],
      metrics: { 
        loggingSpeedIncrease: 80, 
        userEngagementIncrease: 65,
        dailyActiveUsers: 0
      },
      learned: ["Natural language processing", "LLM integration", "Fitness tech", "User experience design", "Data visualization"]
    },
    {
      id: "compliance-ai-system",
      title: "AI Compliance Detection System",
      shortDescription: "Multi-agent AI pipeline automating regulatory analysis workflow — from document ingestion to compliance verification — cutting review time from 40 hours to under 2 hours.",
      tech: ["Python", "LangGraph", "AWS", "Multi-Agent AI", "FastAPI", "Docker"],
      role: "AI Software Engineer",
      dateRange: "Mar 2025 – Present",
      thumbnail: "/images/apps/compliance-ai.svg",
      previewVideo: "/video/compliance-ai.mp4",
      repoUrl: "",
      liveUrl: "",
      status: "Live",
      featured: true,
      tags: ["AI Agents", "LangGraph", "AWS", "Automation"],
      problem: "Manual regulatory reviews consumed 40+ hours per product cycle, creating major bottlenecks in compliance validation and reducing enforcement throughput.",
      solution: "Designed and deployed a multi-agent AI pipeline that automates the entire regulatory analysis workflow — from document ingestion to compliance verification — cutting review time from 40 hours to under 2 hours.",
      myContribution: "Architected and deployed entire system from research to production on AWS, implementing multi-agent orchestration, automated compliance reasoning, and end-to-end monitoring.",
      features: [
        "Multi-agent orchestration using LangGraph for dynamic task allocation and agent collaboration",
        "Automated compliance reasoning via custom fine-tuned LLMs and rule-based validation agents",
        "CI/CD automation for retraining, deployment, and continuous integration of compliance models",
        "End-to-end monitoring with AWS CloudWatch and custom analytics for agent performance tracking"
      ],
      screenshots: [
        "/images/apps/compliance-1.svg",
        "/images/apps/compliance-2.svg"
      ],
      metrics: { 
        reviewTimeReduction: 95, 
        traceability: 100, 
        manualIntervention: 0,
        reviewTimeHours: 2
      },
      learned: ["Multi-agent coordination", "Production AI deployment", "Regulatory compliance automation", "LangGraph orchestration", "AWS CloudWatch monitoring"]
    },
    {
      id: "mistral-support-system",
      title: "Fine-tuned LLM Support System",
      shortDescription: "Engineered custom fine-tuned LLM system based on Mistral-7B, optimized using QLoRA and chain-of-thought reasoning techniques to deliver GPT-4–level responses in real time at a fraction of the cost.",
      tech: ["Mistral-7B", "QLoRA", "Python", "FastAPI", "Hugging Face Transformers"],
      role: "AI Software Engineer",
      dateRange: "Jan 2025 – Mar 2025",
      thumbnail: "/images/apps/mistral-support.svg",
      repoUrl: "",
      liveUrl: "",
      status: "Live",
      tags: ["LLM Fine-tuning", "NLP", "Mistral-7B"],
      problem: "Customer support operations were slow and costly, with each query taking up to 2 hours to resolve manually — limiting scalability and driving high overhead.",
      solution: "Engineered a custom fine-tuned LLM system based on Mistral-7B, optimized using QLoRA and chain-of-thought reasoning techniques to deliver GPT-4–level responses in real time at a fraction of the cost.",
      myContribution: "Architected and deployed custom LLM system using parameter-efficient fine-tuning (QLoRA), chain-of-thought reasoning, and optimized inference pipelines for real-time customer support.",
      features: [
        "Custom fine-tuning pipeline using domain-specific datasets for accuracy and contextual relevance",
        "Integrated chain-of-thought reasoning for complex multi-turn query resolution",
        "Optimized inference cost through parameter-efficient fine-tuning and caching",
        "Low-latency real-time responses supporting 10,000+ daily customer interactions"
      ],
      metrics: { 
        costReduction: 85, 
        queryResolutionSpeed: 100, 
        dailyUsers: 10000,
        responseTimeMinutes: 1
      },
      learned: ["LLM fine-tuning", "Model optimization", "Cost-effective AI deployment", "QLoRA techniques", "Chain-of-thought reasoning", "Real-time inference optimization"]
    },
    {
      id: "av-hubert-research",
      title: "AV-HuBERT Video-to-Speech",
      shortDescription: "Published research on converting audioless video to speech using self-supervised learning.",
      tech: ["PyTorch", "AV-HuBERT", "Computer Vision", "NLP"],
      role: "Researcher",
      dateRange: "May 2024",
      thumbnail: "/images/apps/av-hubert.svg",
      repoUrl: "",
      liveUrl: "",
      status: "Live",
      tags: ["Research", "ML", "Computer Vision"],
      problem: "Converting silent video to meaningful speech remains challenging in multimodal AI.",
      solution: "Novel approach using AV-HuBERT algorithm for audioless video to speech conversion.",
      myContribution: "Research, implementation, and publication at ICIACS conference.",
      features: ["Self-supervised learning", "Multimodal AI", "Video processing", "Speech synthesis"],
      metrics: { publicationsCount: 1, citationsCount: 0 },
      learned: ["Research methodology", "Multimodal learning", "Academic publishing"]
    }
  ],
  education: [
    {
      id: "northeastern-ms-ai",
      institution: "Northeastern University",
      program: "Artificial Intelligence",
      degreeLevel: "M.S.",
      period: "Sep 2022 - Dec 2024",
      thumbnail: "/images/edu/northeastern.svg",
      tags: ["AI", "Machine Learning", "Deep Learning"],
      courses: ["Deep Learning", "Natural Language Processing", "Computer Vision", "Machine Learning"],
      projects: ["AV-HuBERT Research", "Multi-Agent Systems"],
      honors: [],
      gpa: undefined,
      proof: []
    }
  ],
  experience: [
    {
      id: "customstacks-ai-engineer",
      company: "CustomStacks",
      role: "AI Software Engineer",
      period: "Mar 2025 - Present",
      thumbnail: "/images/exp/customstacks.svg",
      tags: ["AI", "Compliance", "Full-stack"],
      responsibilities: [
        "Designed and shipped a multi-agent AI system with browser automation + LangChain to orchestrate end-to-end web data workflows.",  
        "Built the full‑stack platform (React, Node.js/Flask, PostgreSQL/MySQL) with production telemetry (Prometheus/Grafana) and centralized logging (ELK).",
        "Implemented asynchronous workers with Celery and RabbitMQ to reliably process high‑volume jobs.",
        "Containerized all services with Docker and enabled horizontal scaling for background processors.",
        "Established comprehensive tests (pytest + Selenium)—unit, integration, performance—with >99% reliability.",
        "Deployed and operated on AWS EC2, optimizing cost/performance and enabling zero‑downtime releases for multiple clients."
      ],
      impact: { complianceViolationsPrevented: 150, processingSpeed: 50, enterpriseClientsServed: 12 },
      stack: ["Python", "AWS", "Multi-Agent AI", "CI/CD", "React", "Node.js", "PostgreSQL", "MySQL", "Celery", "RabbitMQ", "Prometheus", "Grafana", "ELK Stack", "Docker", "pytest", "Selenium"],
      links: []
    },
    {
      id: "factoryspace-ai-engineer",
      company: "Factoryspace.ai",
      role: "AI Software Engineer",
      period: "Jan 2025 – Mar 2025",
      thumbnail: "/images/exp/factoryspace.svg",
      tags: ["LLM Fine-tuning", "Customer Support", "Mistral-7B", "QLoRA", "Python"],
      responsibilities: [
        "Engineered enterprise-grade AI-powered customer support system built on fine-tuned Mistral-7B language model, automating over 10,000 daily support interactions with GPT-4–level accuracy at a fraction of operational cost.",
        "Fine-tuned & deployed Mistral-7B model using QLoRA, cutting inference cost by 85% while maintaining near GPT-4 quality.",
        "Developed custom training pipelines for domain-specific adaptation, integrating advanced ML techniques like parameter-efficient fine-tuning and retrieval-augmented context injection.",
        "Built scalable backend APIs in Python to handle real-time natural language queries from 10,000+ users daily.",
        "Designed monitoring & analytics layer to track model performance, latency, and feedback loops for continuous retraining."
      ],
      impact: { 
        costSavingsPercent: 85, 
        avgResponseTime: 30, 
        dailyActiveUsers: 10000,
        supportBacklogReduction: 100
      },
      stack: ["Mistral-7B", "QLoRA", "Python", "FastAPI", "Vector Databases", "LangChain", "Hugging Face Transformers"],
      links: []
    },
    {
      id: "american-fidelity-intern",
      company: "American Fidelity",
      role: "Data Science Intern",
      period: "Jul 2023 – Jan 2024",
      thumbnail: "/images/exp/american-fidelity.svg",
      tags: ["RAG", "Machine Learning", "Full-Stack", "Data Engineering"],
      responsibilities: [
        "Designed and deployed an AI-powered RAG chatbot for insurance enterprise, combining large language models with semantic search and real-time document retrieval. Built end-to-end systems from data ingestion to model inference, delivering scalable and intelligent automation for customer operations.",
        "Developed full-stack RAG chatbot, implementing both the frontend and FastAPI backend for seamless customer interaction.",
        "Engineered RAG pipeline integrating semantic search and vector embeddings, enabling contextual responses across 50,000+ insurance documents.",
        "Automated data pipelines for document ingestion, preprocessing, and indexing using cloud-based workflows.",
        "Built & evaluated ML models on the SBA Disaster Loan dataset to predict loan eligibility and amounts, improving forecast accuracy.",
        "Optimized GPT-4 and XGBoost model integration on Azure infrastructure for scalable production deployment."
      ],
      impact: { 
        ticketReduction: 45, 
        accuracyRate: 90, 
        documentsProcessed: 50000
      },
      stack: ["GPT-4", "Azure", "FastAPI", "React", "Vector Databases", "XGBoost", "LangChain", "Python"],
      links: []
    },
    {
      id: "cgi-software-engineer",
      company: "CGI Inc.",
      role: "Software Engineer",
      period: "Mar 2021 – Aug 2022",
      thumbnail: "/images/exp/cgi.svg",
      tags: ["MLOps", "NLP", "Recommender Systems", "Full-Stack"],
      responsibilities: [
        "Developed and deployed AI-powered case resolution recommender system for HR department, designed to suggest solutions for new employee cases based on historical resolutions. Delivered the project end-to-end from frontend and backend architecture to CI/CD and model automation.",
        "Built recommendation engine using NLP to suggest HR case resolutions based on prior support tickets and outcomes.",
        "Developed full-stack application with Angular frontend and Node.js backend, integrating with internal HR systems.",
        "Designed REST APIs for the recommender model and connected it with internal data store for efficient retrieval and updates.",
        "Maintained and optimized database operations for scalability and consistency across multiple HR systems.",
        "Implemented automated model retraining loop, improving accuracy with new data over time.",
        "Engineered CI/CD pipelines, writing unit and integration tests, containerizing the system with Docker, and orchestrating it using Kubernetes and Airflow."
      ],
      impact: { 
        processingTimeReduction: 50, 
        accuracyRate: 98, 
        systemsAutomated: 5,
        documentsProcessed: 10000
      },
      stack: ["Python", "Angular", "Node.js", "Airflow", "Docker", "Kubernetes", "PostgreSQL", "NLP"],
      links: []
    }
  ],
  about: {
    headline: "AI renegade building intelligent systems",
    bio: "AI engineer who's built systems that outsmart regulators, slashed costs like a budget ninja, and turned chatbots into customer-whispering geniuses—ready to unleash hell on your next big project.",
    photo: "/images/me.svg",
    skills: {
      "Languages": ["Python", "SQL", "JavaScript", "TypeScript"],
      "ML/AI Frameworks": ["PyTorch", "TensorFlow", "Scikit-learn", "XGBoost", "Hugging Face"],
      "LLMs & NLP": ["GPT-4", "Mistral", "Fine-tuning", "RAG", "Prompt Engineering", "spaCy"],
      "Agent Frameworks": ["LangChain", "LangGraph", "Multi-Agent Orchestration"],
      "Cloud & Infra": ["AWS", "Azure", "Docker", "Kubernetes"],
      "MLOps": ["Airflow", "MLflow", "CI/CD", "Model Monitoring"]
    },
    contact: {
      email: "uharishraj@gmail.com",
      github: "https://github.com/hatish2001",
      linkedin: "https://linkedin.com/in/uharishraj",
      phone: "339-216-7090"
    },
    resumeUrl: "/files/Harishraj_resume.pdf"
  }
};
