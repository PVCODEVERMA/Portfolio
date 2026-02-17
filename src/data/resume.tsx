import { Icons } from "@/components/icons";
import { HomeIcon } from "lucide-react";

export const DATA = {
  name: "Pankaj Verma",
  initials: "PV",
  url: "https://pvcode.com",
  location: "Noida, Sector 15, Uttar Pradesh, India",
  locationLink: "https://maps.app.goo.gl/dFLbinrTMVHjkjcHA",
  description:
    "Software Developer with 1 years of experience building scalable, production-ready web applications using React, Node.js, and MongoDB. Very active on Twitter.",
  summary:
    "Software Developer building scalable web applications and sharing my learning journey on [YouTube](https://www.youtube.com/channel/UCAHuQt0idElWoQ35KOqO15A), [Instagram](https://www.instagram.com/pv_code421/+), and [X](https://x.com/pv_code421).",
  avatarUrl: "/me.png",
  skills: [
    "JavaScript",
    "Python",
    "C",
    "C++",
    "SQL",
    "React.js",
    "Next.js",
    "Redux Toolkit",
    "Tailwind CSS",
    "Material UI",
    "Node.js",
    "Express.js",
    "MongoDB",
    "REST APIs",
    "JWT Authentication",
    "Docker",
    "CI/CD",
    "Git",
    "GitHub",
    "Postman",
    "AI & Automation (Learning)",
    "LLMs",
    "RAG",
    "LangChain",
    "OpenAI API",
    "Data Science",
    "DSA"
  ],
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
        "Completed focused training in frontend development, working with HTML, CSS, JavaScript, and React fundamentals while contributing to live client projects.",
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
      logoUrl: "/school.png",
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
    {
      title: "Online Learning Platform (LMS)",
      href: "https://yrclasses.com/",
      dates: "Nov 2023 - Dec 2023",
      active: true,
      description:
        "A feature-rich Learning Management System with course uploads, video streaming, real-time chat, and role-based dashboards. Includes instructor panels for course management, student progress tracking, and interactive discussion forums.",
      technologies: [
        "React.js",
        "Node.js",
        "Socket.io",
        "MongoDB",
        "JWT",
        "Tailwind CSS",
        "Express.js",
        "React Player"
      ],
      links: [
        {
          type: "Live Demo",
          href: "https://lms-platform-demo.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "GitHub",
          href: "https://github.com/pankaj912978/lms-platform",
          icon: <Icons.github className="size-3" />,
        }
      ],
      image: "/projects/lms-platform.png",
      video: "",
    },

    {
      title: "AI-Powered Resume Builder",
      href: "https://ai-resume-builder.vercel.app",
      dates: "Aug 2024 - Sep 2024",
      active: true,
      description:
        "An intelligent resume builder that uses OpenAI GPT to generate professional resume content based on user input. Features include multiple templates, ATS optimization, PDF export, and AI-powered suggestions for improving resume impact.",
      technologies: [
        "Next.js",
        "OpenAI API",
        "Tailwind CSS",
        "Shadcn UI",
        "React PDF",
        "Prisma",
        "PostgreSQL"
      ],
      links: [
        {
          type: "Demo",
          href: "https://ai-resume-builder.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "GitHub",
          href: "https://github.com/pankaj912978/ai-resume-builder",
          icon: <Icons.github className="size-3" />,
        }
      ],
      image: "/projects/ai-resume-builder.png",
      video: "",
    },

    // {
    //   title: "Real-time Chat Application",
    //   href: "https://chat-app-demo-pv.vercel.app",
    //   dates: "Apr 2024 - May 2024",
    //   active: true,
    //   description:
    //     "A real-time chat application with user authentication, online status, typing indicators, and file sharing. Supports group chats, private messaging, and message history with a clean, responsive UI.",
    //   technologies: [
    //     "React.js",
    //     "Socket.io",
    //     "Node.js",
    //     "MongoDB",
    //     "JWT",
    //     "Tailwind CSS",
    //     "Cloudinary"
    //   ],
    //   links: [
    //     {
    //       type: "Demo",
    //       href: "https://chat-app-demo-pv.vercel.app",
    //       icon: <Icons.globe className="size-3" />,
    //     },
    //     {
    //       type: "GitHub",
    //       href: "https://github.com/pankaj912978/chat-application",
    //       icon: <Icons.github className="size-3" />,
    //     }
    //   ],
    //   image: "/projects/chat-app.png",
    //   video: "",
    // }
  ],
  certifications: [
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
      title: "Data Science Fundamentals",
      issuer: "PW Skills",
      date: "2024",
      credentialId: "DS-PW-2024",
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
      badgeColor: "bg-orange-500/10 border-orange-500/20"
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
      badgeColor: "bg-green-500/10 border-green-500/20"
    },
  ],
} as const;
