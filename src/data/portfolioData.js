import { Code, Terminal, Globe, Server, Zap, Database, Cpu } from 'lucide-react';

export const projects = [
  {
    title: "Fixify - Service Platform",
    desc: "Full-stack service booking platform with user authentication and real-time features",
    gradient: "from-violet-600 via-purple-600 to-indigo-600",
    icon: Code,
    tech: ["React", "Node.js", "MongoDB", "Express"],
    category: "Full Stack",
    liveLink: "https://fixify-kt9k.onrender.com/",
    githubLink: "https://github.com/UtkarshD04/Fixify"
  },
  {
    title: "LedgerLite - Finance Tracker",
    desc: "Personal finance management app with expense tracking and budget analysis",
    gradient: "from-cyan-500 via-blue-600 to-indigo-700",
    icon: Terminal,
    tech: ["React", "Node.js", "MongoDB", "Chart.js"],
    category: "Finance App",
    liveLink: "https://ledgerlite-et-k88d.onrender.com/",
    githubLink: "https://github.com/UtkarshD04/ledger.lite"
  },
  {
    title: "ADS Restaurant & Cafe",
    desc: "Modern restaurant website with menu display and online reservation system",
    gradient: "from-emerald-500 via-green-600 to-teal-600",
    icon: Globe,
    tech: ["React", "Tailwind", "JavaScript", "CSS3"],
    category: "Restaurant App",
    liveLink: "upcoming",
    githubLink: "https://github.com/UtkarshD04/ads-restaurant"
  }
];

export const expertise = [
  { name: "HTML & CSS", value: 85, color: "from-violet-500 to-purple-600", icon: Code },
  { name: "JavaScript", value: 80, color: "from-cyan-500 to-blue-600", icon: Server },
  { name: "React.js", value: 75, color: "from-emerald-500 to-green-600", icon: Cpu },
  { name: "Responsive Design", value: 78, color: "from-orange-500 to-red-600", icon: Database },
  { name: "Git & GitHub", value: 70, color: "from-pink-500 to-rose-600", icon: Code },
  { name: "Problem Solving", value: 82, color: "from-red-500 to-orange-600", icon: Zap }
];

export const techStack = [
  { name: "HTML5", level: 85, category: "Frontend" },
  { name: "CSS3", level: 80, category: "Frontend" },
  { name: "JavaScript", level: 75, category: "Language" },
  { name: "React", level: 70, category: "Framework" },
  { name: "Git", level: 65, category: "Tools" },
  { name: "Bootstrap", level: 75, category: "CSS" },
  { name: "Tailwind", level: 68, category: "CSS" },
  { name: "Figma", level: 60, category: "Design" }
];

export const achievements = [
  { number: "React", label: "Frontend Expert", icon: Code },
  { number: "MERN", label: "Stack Developer", icon: Server },
  { number: "API", label: "Integration Pro", icon: Globe },
  { number: "UI/UX", label: "Design Focused", icon: Zap }
];
