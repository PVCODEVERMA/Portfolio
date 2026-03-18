import { Icons } from "@/components/icons";
import { HomeIcon } from "lucide-react";

export const DATA = {
  name: "Pankaj Verma",
  initials: "PV",
  url: "https://pvcode.com",
  location: "Noida, Sector 15, Uttar Pradesh, India",
  locationLink: "https://maps.app.goo.gl/dFLbinrTMVHjkjcHA",
  role: "Developer • AI Architect • Tech Creator",
  subtitle: "Building the future with AI & Code",
  description: "I share my journey of building AI tools and software development with my audience. Helping websites rank better on search engines using technical SEO, performance optimization, and content strategy.",
  summary:
    "Founding Engineer & AI Architect building scalable AI-powered applications. I document my journey as a developer and AI builder—sharing AI experiments, startup ideas, and developer life insights across YouTube, Instagram, and X.",
  stats: [
    { label: "10+ Systems Architected", icon: "Users" },
    { label: "25+ Projects Delivered", icon: "Briefcase" },
    { label: "15+ Technologies Used", icon: "Cpu" }
  ],
  avatarUrl: "/me.png",
  nowBuilding: [
    { title: "AI Automation Tools", icon: "Cpu", description: "Testing and sharing new AI coding and productivity tools." },
    { title: "System Architecture", icon: "Layout", description: "Designing scalable, high-performance web systems & AI workflows." },
    { title: "SEO Optimization", icon: "Globe", description: "Technical SEO & performance optimization for businesses." },
    { title: "Developer Content", icon: "Video", description: "Coding tutorials and tech insights on YouTube & Socials." }
  ],
  githubActivity: {
    username: "PVCODEVERMA",
    stats: [
      { label: "Total Commits", value: "850+" },
      { label: "Stars Earned", value: "120+" },
      { label: "Pull Requests", value: "45+" }
    ]
  },
  blogPosts: [
    {
      title: "Building Scalable AI Agents with LangGraph",
      publishedAt: "March 2026",
      summary: "A deep dive into orchestration patterns for multi-agent systems.",
      url: "#"
    },
    {
      title: "The Future of MERN: Next.js 15 & Beyond",
      publishedAt: "Feb 2026",
      summary: "Exploring the next evolution of full-stack web development.",
      url: "#"
    }
  ],
  community: [
    {
      platform: "Instagram",
      handle: "@pv_code421",
      followers: "10K+",
      link: "https://www.instagram.com/pv_code421",
      description: "Sharing daily coding tips and AI insights."
    },
    {
      platform: "X (Twitter)",
      handle: "@pv_code421",
      followers: "1.2K+",
      link: "https://x.com/pv_code421",
      description: "Active in the AI & Web Architecture community."
    }
  ],
  timeline: [
    { year: "2023", title: "Started Coding Journey", description: "Mastered HTML/CSS and basic Javascript.", icon: "CheckCircle2" },
    { year: "2024", title: "MERN Stack Era", description: "Built 10+ full-stack projects using React, Node, and MongoDB.", icon: "Briefcase" },
    { year: "2025", title: "Full Stack Developer", description: "Professional experience building scalable production apps.", icon: "CheckCircle2" },
    { year: "2026", title: "AI Product Builder", description: "Architecting LLM-based solutions & AI agents.", icon: "Sparkles" }
  ],
  skills: {
    "AI / ML": {
      icon: "Cpu",
      description: "Advanced AI Orchestration & LLM Engineering",
      list: [
        { name: "RAG Stack (Pinecone, FAISS)", level: "Advanced", years: "2+ yrs", projects: "8+ projects", trend: "High", progress: 95 },
        { name: "LLM Advanced (Function Calling, structured output)", level: "Advanced", years: "2+ yrs", projects: "6+ projects", trend: "High", progress: 92 },
        { name: "AI Agents (LangGraph, CrewAI)", level: "Advanced", years: "1+ yrs", projects: "4+ projects", trend: "High", progress: 88 },
        { name: "Prompt Engineering & Chaining", level: "Advanced", years: "2+ yrs", projects: "10+ projects", trend: "High", progress: 95 },
        { name: "LlamaIndex / LangChain", level: "Advanced", years: "2+ yrs", projects: "5+ projects", trend: "High", progress: 90 },
        { name: "Vector Search & Embeddings", level: "Advanced", years: "1+ yrs", projects: "4+ projects", trend: "High", progress: 85 },
        { name: "OpenAI / Gemini API", level: "Advanced", years: "2+ yrs", projects: "10+ projects", trend: "Stable", progress: 92 },
      ]
    },
    "Frontend": {
      icon: "Layout",
      description: "Scalable UI Architecture & Performance",
      list: [
        { name: "Next.js 14/15", level: "Advanced", years: "2+ yrs", projects: "15+ projects", trend: "High", progress: 98 },
        { name: "React (Context, Hooks)", level: "Advanced", years: "3+ yrs", projects: "20+ projects", trend: "Stable", progress: 95 },
        { name: "State (Redux, Zustand, React Query)", level: "Advanced", years: "2+ yrs", projects: "10+ projects", trend: "Growing", progress: 92 },
        { name: "Tailwind CSS", level: "Advanced", years: "3+ yrs", projects: "25+ projects", trend: "Stable", progress: 100 },
        { name: "Performance (Lazy Loading, Code Splitting)", level: "Advanced", years: "1+ yrs", projects: "8+ projects", trend: "High", progress: 88 },
        { name: "TypeScript", level: "Advanced", years: "2+ yrs", projects: "12+ projects", trend: "High", progress: 90 },
      ]
    },
    "Backend & Architecture": {
      icon: "Server",
      description: "Scalable Systems & API Design",
      list: [
        { name: "Node.js / Express.js", level: "Advanced", years: "2+ yrs", projects: "12+ projects", trend: "High", progress: 92 },
        { name: "REST API Design & Documentation", level: "Advanced", years: "2+ yrs", projects: "15+ projects", trend: "High", progress: 95 },
        { name: "API Auth (JWT, OAuth)", level: "Advanced", years: "2+ yrs", projects: "10+ projects", trend: "High", progress: 94 },
        { name: "Microservices & System Design", level: "Medium", years: "1+ yrs", projects: "4+ projects", trend: "Growing", progress: 75 },
        { name: "Rate Limiting & Security (CORS, XSS)", level: "Advanced", years: "1+ yrs", projects: "6+ projects", trend: "High", progress: 85 },
        { name: "Postman / Swagger", level: "Advanced", years: "3+ yrs", projects: "All", trend: "Standard", progress: 98 },
      ]
    },
    "DevOps & Security": {
      icon: "Cloud",
      description: "CI/CD, Deployment & Infrastructure",
      list: [
        { name: "Docker & Docker Compose", level: "Medium", years: "1+ yrs", projects: "5+ projects", trend: "Essential", progress: 78 },
        { name: "CI/CD Pipelines (GitHub Actions)", level: "Advanced", years: "2+ yrs", projects: "10+ projects", trend: "High", progress: 92 },
        { name: "Nginx & Server Management", level: "Medium", years: "1+ yrs", projects: "4+ projects", trend: "Stable", progress: 70 },
        { name: "Vercel / VPS Deployment", level: "Advanced", years: "3+ yrs", projects: "20+ projects", trend: "Stable", progress: 98 },
        { name: "Web Security (CSRF, Protection)", level: "Medium", years: "1+ yrs", projects: "5+ projects", trend: "Essential", progress: 75 },
      ]
    },
    "Databases": {
      icon: "Database",
      description: "Data Storage & Search Optimization",
      list: [
        { name: "MongoDB (Mongoose)", level: "Advanced", years: "3+ yrs", projects: "15+ projects", trend: "High", progress: 95 },
        { name: "PostgreSQL / Redis", level: "Medium", years: "1+ yrs", projects: "5+ projects", trend: "Growing", progress: 75 },
        { name: "Vector Databases (Pinecone, Chroma)", level: "Advanced", years: "2+ yrs", projects: "8+ projects", trend: "High", progress: 92 },
      ]
    },
    "Testing & Tools": {
      icon: "Wrench",
      description: "Quality Assurance & Development Tools",
      list: [
        { name: "Testing (Jest, Mocha, Cypress)", level: "Medium", years: "1+ yrs", projects: "6+ projects", trend: "Growing", progress: 70 },
        { name: "Git / GitHub (Version Control)", level: "Advanced", years: "3+ yrs", projects: "All", trend: "Essential", progress: 100 },
        { name: "VS Code / Prettier", level: "Advanced", years: "4+ yrs", projects: "All", trend: "Stable", progress: 98 },
      ]
    },
    "Soft Skills": {
      icon: "Users",
      description: "Collaboration & Professional Excellence",
      list: [
        { name: "Problem Solving", level: "Advanced", years: "4+ yrs", projects: "Continuous", trend: "High", progress: 95 },
        { name: "Technical Documentation", level: "Advanced", years: "2+ yrs", projects: "All", trend: "Essential", progress: 90 },
        { name: "Team Collaboration", level: "Advanced", years: "3+ yrs", projects: "Collaborative", trend: "Stable", progress: 92 },
        { name: "System Thinking", level: "Medium", years: "1+ yrs", projects: "Design", trend: "Growing", progress: 80 },
      ]
    }
  },
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
  ],
  contact: {
    email: "Pankaj912978@gmail.com",
    tel: "+91 9129787343",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/PVCODEVERMA",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/pankaj-verma-8a99a723a/",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/pv_code421",
        icon: Icons.x,

        navbar: true,
      },
      Youtube: {
        name: "Youtube",
        url: "https://www.youtube.com/channel/UCAHuQt0idElWoQ35KOqO15A",
        icon: Icons.youtube,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [

    {
      company: "Quality Concept Pvt. Ltd.",
      href: "https://qualityconcept.in/",
      badges: ["Full-time"],
      location: "Greater Noida",
      title: "Full Stack Developer",
      logoUrl: "/Qc_logo.png",
      start: "10 Dec 2026",
      end: "Present",
      description:
        "Leading the development of the official company website and AI-powered chatbot using n8n automation. Architecting and building a scalable multi-role CRM system with React.js, Node.js, Express, and MongoDB. Implementing secure REST APIs, JWT-based authentication, and role-based access control. Optimizing performance, SEO, and accessibility (Lighthouse best practices) to deliver a fully responsive, production-ready application aligned with business requirements.",

    },
    {
      company: "Websbaba Technologies Pvt. Ltd.",
      href: "https://websbaba.in/",
      badges: ["Full-time"],
      location: "Lucknow, India (Hybrid)",
      title: "Full Stack Developer",
      logoUrl: "/webs_baba_logo.png",
      start: "10 Jun 2025",
      end: "Dec 2025",
      description:
        "Developing the official company website with an admin panel and modern UI using React and Tailwind CSS. Improving website performance, SEO, and accessibility while delivering a responsive, production-ready application.",
    },
    {
      company: "Marv Softwares India Pvt Ltd",
      href: "https://www.marvsoftwares.com/",
      badges: ["Full-time"],
      location: "Lucknow, India (Hybrid)",
      title: "Frontend Developer",
      logoUrl: "/waterloo.jpg",
      start: "Jan 2025",
      end: "May 2025",
      description:
        "Working as a Frontend Developer building responsive user interfaces using React and Tailwind CSS. Integrating APIs, improving UI/UX, and collaborating with backend teams to deliver scalable features.",
    },
    {
      company: "Z.N. Infotech Pvt. Ltd.",
      href: "https://zninfotech.com/",
      badges: ["Training Institute"],
      location: "Lucknow, India",
      title: "Web Developer Intern",
      logoUrl: "/znlogo.png",
      start: "Jul 2023",
      end: "Nov 2023",
      description:
        "Completed a comprehensive MERN Stack Developer course and contributed to live projects, focusing on building end-to-end web applications with MongoDB, Express.js, React, and Node.js.",
    },
  ],
  aiProjects: [
    {
      title: "Agentic Workflow Orchestrator",
      href: "#",
      dates: "Jan 2026 - Present",
      active: true,
      description: "A specialized framework for building and debugging multi-agent LLM workflows with state management.",
      technologies: ["Next.js", "Python", "LangGraph", "OpenAI", "Tailwind CSS"],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "RAG Knowledge Base",
      href: "#",
      dates: "Dec 2025",
      active: true,
      description: "Enterprise-grade RAG system with multi-modal support and hybrid search capabilities.",
      technologies: ["Pinecone", "LangChain", "Node.js", "Gemini Pro"],
      links: [],
      image: "",
      video: "",
    }
  ],

  education: [
    {
      school: "B.N. College of Engineering and Technology",
      href: "https://bncet.ac.in/",
      degree: "Bachelor of Technology in Computer Science & Engineering",
      logoUrl: "/bncet.jpg",
      start: "2021",
      end: "2025",
      grade: "CGPA: 7.05/10.0",
      coursework: [
        "Data Structures & Algorithms",
        "Database Management Systems",
        "Web Technologies",
        "Software Engineering",
        "Computer Networks",
        "Object-Oriented Programming",
        "Operating Systems",
        "Artificial Intelligence"
      ]
    },
    {
      school: "St. United Avadh Inter College",
      href: "https://uaic.in/",
      degree: "Intermediate (12th) - Science (PCM)",
      logoUrl: "/mmb.jpg",
      start: "2019",
      end: "2021",
      grade: "Percentage: 71%"
    },
    {
      school: "St. Shri Saryu Prasad Inter College",
      href: "#",
      degree: "High School (10th)",
      logoUrl: "/mmb.jpg",
      start: "2017",
      end: "2019",
      grade: "Percentage: 66%"
    }
  ],
  projects: [
    {
      title: "Healthcare Portal – Hospital Appointment System",
      href: "https://hummarichikitsa.vercel.app/",
      dates: "Jan 2024 - Mar 2024",
      active: true,
      description:
        "A full-stack MERN-based healthcare portal for booking doctor appointments online. Features include JWT-based authentication, role-based access control (Patient/Doctor/Admin), appointment scheduling with time slots, and an admin dashboard for managing users, appointments, and hospital data.",
      technologies: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "JWT",
        "Tailwind CSS",
        "Redux Toolkit",
        "Mongoose"
      ],
      links: [
        {
          type: "Live Demo",
          href: "https://hummarichikitsa.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "GitHub",
          href: "https://github.com/pankaj912978/healthcare-portal",
          icon: <Icons.github className="size-3" />,
        }
      ],
      image: "",
      video: "/videos/healthcare-demo.mp4",
    },
    {
      title: "Websbaba Technologies Official Website",
      href: "https://velvety-biscuit-70ee75.netlify.app/",
      dates: "Jun 2024 - Jul 2024",
      active: true,
      description:
        "Designed and developed the official corporate website for Websbaba Technologies with a modern, responsive UI and SEO optimization. Built with a custom admin panel for content management, dynamic service listings, and contact form integration.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "SEO",
        "Vercel",
        "Admin Panel"
      ],
      links: [
        {
          type: "Live Website",
          href: "https://websbaba.netlify.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "GitHub",
          href: "https://github.com/PVCODEVERMA/websbaba-technologies-pvt.ltd",
          icon: <Icons.github className="size-3" />,
        }
      ],
      image: "",
      video: "/videos/websbaba-demo.mp4",
    },
    {
      title: "Design Beautiful Albums Online",
      href: "https://album-design-platform.vercel.app/",
      dates: "",
      active: true,
      description:
        "A full-stack album design application developed with MongoDB, Express.js, React.js, and Node.js. It supports user authentication, image management, dynamic UI rendering, and scalable backend APIs for seamless album creation and management",
      technologies: [
        "React.js",
        "Javascript",
        "Tailwind CSS",
        "Framer Motion",

      ],
      links: [
        {
          type: "Live Website",
          href: "https://album-design-platform.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Live Website",
          href: "https://app.albumdraft.com/albums/KcDOfv_Yjrq0HoVt#page=1",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "GitHub",
          href: "https://github.com/PVCODEVERMA/ALBUM-DESIGN-PLATFORM",
          icon: <Icons.github className="size-3" />,
        }
      ],
      image: "",
      video: "/videos/album-design-demo.mp4",
    },

  ],
  certifications: [
    {
      title: "Data Science Fundamentals",
      issuer: "PW Skills",
      date: "2025",
      credentialId: "DS-PW-2025",
      url: "#",
      description: "Currently learning data science fundamentals including statistics, data analysis, machine learning concepts, and Python programming for data applications.",
      skills: [
        "Python", "Statistics", "Data Analysis", "Machine Learning",
        "Pandas", "NumPy", "Data Visualization", "EDA"
      ],
      status: "ongoing",
      type: "professional",
      duration: "Ongoing",
      progress: 60,
      verified: false,
      badgeColor: "bg-yellow-500/10 border-yellow-500/20"
    },
    {
      title: "Full Stack Web Development 2.0",
      issuer: "Physics Wallah (PW Skills)",
      date: "August 2024",
      credentialId: "25e3858b-4824-4093-8f6e-063c4fe5b517",
      url: "https://drive.google.com/file/d/1cI--xq4WYC2Z7oSkOxLMk19bMcd7AVIa/view?usp=sharing",
      description: "Successfully completed comprehensive full-stack web development program covering modern web technologies including MERN stack, REST APIs, authentication, and deployment strategies.",
      skills: [
        "React.js", "Node.js", "Express.js", "MongoDB", "REST APIs",
        "JWT Authentication", "Redux", "Tailwind CSS", "Git & GitHub",
        "Deployment", "CI/CD Concepts"
      ],
      status: "completed",
      type: "professional",
      duration: "3+ months",
      verified: true,
      badgeColor: "bg-orange-500/10 border-orange-500/20"
    },


    {
      title: "C, C++ & Data Structures and Algorithms",
      issuer: "iNeuron Intelligence Pvt. Ltd.",
      date: "2022",
      credentialId: "DSA-iN-2022",
      url: "#",
      description: "Comprehensive program covering programming fundamentals, advanced data structures, algorithms, and competitive programming concepts.",
      skills: [
        "C Programming", "C++", "Data Structures", "Algorithms",
        "Time Complexity", "Space Complexity", "Problem Solving",
        "Competitive Programming"
      ],
      status: "completed",
      type: "professional",
      duration: "4+ months",
      verified: true,
      badgeColor: "bg-orange-500/10 border-orange-500/20"
    },
    
    {
      title: "Full Stack Development Webinar",
      issuer: "Shri Balaji Infotech",
      date: "January 2023",
      credentialId: "WS/5022/45",
      url: "https://drive.google.com/file/d/1vNzkzF4tby5ixDrfRpkg-UUyildg7Bq-/view?usp=sharing",
      description: "Participated in industry webinar exploring full-stack development trends, tools, and career opportunities in web development.",
      skills: [
        "Industry Trends", "Development Tools", "Career Guidance",
        "Technology Stack Overview"
      ],
      status: "completed",
      type: "webinar",
      duration: "1 day",
      verified: true,
      badgeColor: "bg-orange-500/10 border-orange-500/20",
      image: "/CertificateAll/Certificate_webinar.png"
    },
    {
      title: "Java Software Development Workshop",
      issuer: "Analyze Infotech",
      date: "December 2022",
      credentialId: "WS-Java-Dec2022",
      url: "https://drive.google.com/file/d/1WrQAxxx6piENkv6qz9ZVc1qGLJX5ZrZ9/view?usp=sharing",
      description: "Completed 5-day intensive hands-on workshop focused on Java programming fundamentals, object-oriented concepts, and practical software development exercises.",
      skills: [
        "Java", "Object-Oriented Programming", "Software Development Lifecycle",
        "Debugging", "Problem Solving", "Basic Algorithms"
      ],
      status: "completed",
      type: "workshop",
      duration: "5 days",
      verified: true,
      badgeColor: "bg-green-500/10 border-green-500/20",
      image: "/CertificateAll/Certificate_Workshop.png"
    },
    {
      title: "MERN Stack Certification",
      issuer: "PW Skills",
      date: "2024",
      description: "Advanced certification in MERN Stack development, covering MongoDB, Express, React, and Node.js.",
      status: "completed",
      image: "/CertificateAll/PW-certification-MERN.png"
    }
  ],
} as const;
