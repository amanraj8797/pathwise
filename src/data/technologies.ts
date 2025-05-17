
import { LucideIcon } from "lucide-react";

export interface Technology {
  id: string;
  title: string;
  description: string;
  icon: 'ml' | 'react' | 'java' | 'python' | 'js' | 'cloud' | 'mobile' | 'blockchain' | 'ai' | 'devops';
  color: string;
  students: number;
  lessons: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export const technologies: Technology[] = [
  {
    id: "react",
    title: "React Development",
    description: "Learn modern React with hooks, context API, and advanced patterns",
    icon: "react",
    color: "bg-blue-100 text-blue-700",
    students: 12500,
    lessons: 48,
    difficulty: "Intermediate"
  },
  {
    id: "python",
    title: "Python Fundamentals",
    description: "Master Python for data science, automation, and backend development",
    icon: "python",
    color: "bg-yellow-100 text-yellow-700",
    students: 18900,
    lessons: 56,
    difficulty: "Beginner"
  },
  {
    id: "javascript",
    title: "JavaScript Mastery",
    description: "Dive deep into JavaScript from fundamentals to advanced concepts",
    icon: "js",
    color: "bg-yellow-100 text-yellow-700",
    students: 15200,
    lessons: 42,
    difficulty: "Beginner"
  },
  {
    id: "java",
    title: "Java Programming",
    description: "Build enterprise-grade applications with Java and Spring Boot",
    icon: "java",
    color: "bg-orange-100 text-orange-700",
    students: 9800,
    lessons: 52,
    difficulty: "Intermediate"
  },
  {
    id: "machine-learning",
    title: "Machine Learning",
    description: "Understand ML algorithms and implement practical models",
    icon: "ml",
    color: "bg-green-100 text-green-700",
    students: 7500,
    lessons: 38,
    difficulty: "Advanced"
  },
  {
    id: "cloud-computing",
    title: "Cloud Computing",
    description: "Learn AWS, Azure, and GCP fundamentals for modern infrastructure",
    icon: "cloud",
    color: "bg-sky-100 text-sky-700",
    students: 8200,
    lessons: 44,
    difficulty: "Intermediate"
  },
  {
    id: "mobile-development",
    title: "Mobile App Development",
    description: "Build cross-platform mobile apps with React Native and Flutter",
    icon: "mobile",
    color: "bg-indigo-100 text-indigo-700",
    students: 11300,
    lessons: 50,
    difficulty: "Intermediate"
  },
  {
    id: "blockchain",
    title: "Blockchain Development",
    description: "Understand blockchain technology and smart contract development",
    icon: "blockchain",
    color: "bg-purple-100 text-purple-700",
    students: 5600,
    lessons: 34,
    difficulty: "Advanced"
  },
  {
    id: "artificial-intelligence",
    title: "Artificial Intelligence",
    description: "Explore AI concepts, neural networks, and practical applications",
    icon: "ai",
    color: "bg-red-100 text-red-700",
    students: 6800,
    lessons: 40,
    difficulty: "Advanced"
  },
  {
    id: "devops",
    title: "DevOps Engineering",
    description: "Master CI/CD pipelines, containerization, and infrastructure as code",
    icon: "devops",
    color: "bg-emerald-100 text-emerald-700",
    students: 7900,
    lessons: 46,
    difficulty: "Intermediate"
  }
];
