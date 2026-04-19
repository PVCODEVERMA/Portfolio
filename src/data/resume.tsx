import { Icons } from "@/components/icons";
import { HomeIcon } from "lucide-react";

export const DATA = {
  name: "Pankaj",
  initials: "PV",
  url: "https://pvcode.netlify.app",
  location: "Noida, Sector 15, Uttar Pradesh, India",
  locationLink: "https://maps.app.goo.gl/dFLbinrTMVHjkjcHA",
  role: "Developer | Tech Creator",
  subtitle: "Building the future with Code",
  description: "I'm a web developer based in Delhi, India, blending aesthetics with problem-solving to craft seamless digital experiences.",
  summary:
    "### What I’m About\n\nHey there, I’m Pankaj, a web developer passionate about building seamless and scalable digital experiences. My journey into the internet world started with curiosity and problem-solving, which eventually led me deep into web development, backend systems, and modern JavaScript frameworks.\n\nOver time, I’ve explored different areas of tech—from frontend design to backend logic—constantly learning and refining my skills to turn ideas into real, working products.\n\nBeyond coding, I enjoy exploring new technologies, improving my problem-solving skills through DSA, and sharing my learning journey. I’m always excited to build, experiment, and push my limits.\n\nScroll down to explore some of my work—I’d love to connect and collaborate on something meaningful.\n\nFeel free to reach out. Let’s build something amazing together. 🚀",


  avatarUrl: "/me.png",
  nowBuilding: [
    { title: "SaaS Starter Kits", icon: "Cpu", description: "Building and sharing optimized boilerplates for full-stack apps." },
    { title: "System Architecture", icon: "Layout", description: "Designing scalable, high-performance web systems & serverless workflows." },
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

  community: [
    {
      platform: "Instagram",
      handle: "@pvcode1u.ai",
      followers: "10K+",
      link: "https://www.instagram.com/pvcode1u.ai/",
      description: "Sharing daily coding tips and tech insights."
    },
    {
      platform: "X (Twitter)",
      handle: "@PankajK77053572",
      followers: "",
      link: "https://x.com/PankajK77053572",
      description: "Active in the Web Architecture and Dev community."
    },
    {
      platform: "YouTube",
      handle: "PV CODE",
      followers: "551",
      link: "https://www.youtube.com/channel/UCAHuQt0idElWoQ35KOqO15A",
      description: "Coding tutorials and tech insights on modern web development."
    }
  ],
  timeline: [
    { year: "2023", title: "Started Coding Journey", description: "Mastered HTML/CSS and basic Javascript.", icon: "CheckCircle2" },
    { year: "2024", title: "MERN Stack Era", description: "Built 10+ full-stack projects using React, Node, and MongoDB.", icon: "Briefcase" },
    { year: "2025", title: "Full Stack Developer", description: "Professional experience building scalable production apps.", icon: "CheckCircle2" },
    { year: "2026", title: "Product Engineer", description: "Architecting high-performance cloud solutions.", icon: "Sparkles" }
  ],
  skills: {
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
        { name: "CI/CD Pipelines (GitHub Actions)", level: "Medium", years: "2+ yrs", projects: "10+ projects", trend: "High", progress: 92 },
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
        { name: "Distributed Databases (Redis, Cassandra)", level: "Medium", years: "1+ yrs", projects: "3+ projects", trend: "High", progress: 80 },
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
        url: "https://x.com/PankajK77053572",
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
      company: "Daakit Technologies Pvt Ltd",
      href: "https://daakit.com/",
      badges: ["Full-time"],
      location: "Delhi",
      title: "Software Engineer",
      logoUrl: "/image.png",
      start: "April 2026",
      end: "Present",
      description: "Optimizing logistics platform efficiency and architecting scalable backend solutions. Focused on streamlining supply chain workflows, improving data processing pipelines, and delivering high-performance features for logistics operations.",
    },
    {
      company: "Quality Concept Welding Solutions Pvt. Ltd.",
      href: "https://qualityconcept.in/",
      badges: ["Full-time"],
      location: "Greater Noida",
      title: "Full Stack Developer (CRM Platform)",
      logoUrl: "/Qc_logo.png",
      start: "Jan 2026",
      end: " 25 March 2026",
      description: "Independently developing and managing a multi-module CRM system using MERN stack. Built modules including Environmental Survey, Accounts, Admin & HR, Industrial Safety, Inventory Management, ISO Certifications, Marketing, NDT Services, PWHT Services. Developed scalable REST APIs, implemented RBAC, and optimized dashboards for performance.",
    },
    {
      company: "Websbaba Technologies Pvt. Ltd.",
      href: "https://websbaba.in/",
      badges: ["Full-time"],
      location: "Lucknow, India (Hybrid)",
      title: "Full Stack Developer (Real Estate Platform)",
      logoUrl: "/webs_baba_logo.png",
      start: "Oct 2025",
      end: "Dec 2025",
      description: "Developed MERN dashboards with role-based access. Integrated Razorpay payments, auto-invoicing, and lead distribution. Improved frontend UI/UX and backend API efficiency.",
    },
    {
      company: "Marv Softwares Pvt. Ltd.",
      href: "https://www.marvsoftwares.com/",
      badges: ["Intern"],
      location: "Lucknow, India (Hybrid)",
      title: "Full Stack Developer Intern",
      logoUrl: "/waterloo.jpg",
      start: "Dec 2024",
      end: "May 2025",
      description: "Developed MERN features and integrated REST APIs. Enhanced UI/UX performance and responsiveness. Implemented Stripe Connect payments and payout systems.",
    },
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
        "System Design"
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
      blueprint: "analytics_dashboard_architecture.svg"
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
      blueprint: "web_app_architecture.svg"
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
      blueprint: "api_gateway_architecture.svg"
    },
  ],
  certifications: [
    {
      title: "MERN Stack Certification",
      issuer: "PW Skills",
      date: "2024",
      description: "Advanced certification in MERN Stack development, covering MongoDB, Express, React, and Node.js.",
      status: "completed",
      image: "/CertificateAll/PW-certification-MERN.png"
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
    }
  ],


} as const;
