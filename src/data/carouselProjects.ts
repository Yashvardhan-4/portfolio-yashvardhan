export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  src: string;
  alt: string;
  image?: string;
  description: string;
  metrics: string[];
  stack: string[];
  highlights: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const carouselPlaceholderProjects: ProjectItem[] = [
  {
    id: "turboidm",
    title: "TurboIDM",
    subtitle: "Fast, Parallel Download Manager",
    category: "Desktop App & Chrome Extension",
    src: "/projects/turboidm.png",
    alt: "TurboIDM Download Accelerator preview",
    description:
      "A fast download manager and browser extension that speeds up large downloads up to 8x by downloading file parts simultaneously and saving directly to disk without slow merge times.",
    metrics: [
      "Up to 8x Faster Downloads",
      "Instant File Completion",
      "32 Parallel Streams",
    ],
    stack: [
      "Node.js",
      "Electron",
      "React 19",
      "Chrome MV3 Extension",
      "TypeScript",
    ],
    highlights: [
      "Splits files into 32 simultaneous download streams with automatic speed balancing.",
      "Writes directly to disk without waiting for slow file merges after downloading.",
      "Works seamlessly with Google Chrome via a lightweight companion app.",
    ],
    liveUrl: "https://turbo-idm.vercel.app/",
    githubUrl: "https://github.com/Yashvardhan-4",
  },
  {
    id: "inkless",
    title: "Inkless",
    subtitle: "Distraction-Free Journal that Works Offline",
    category: "Web Application & Graphics",
    src: "/projects/inkless.png",
    alt: "Inkless Digital Diary preview",
    description:
      "A fast, distraction-free writing app that saves your notes instantly to your device so you never lose your work, even when you're completely offline.",
    metrics: [
      "< 5ms Instant Local Save",
      "Zero Data Loss",
      "120 FPS Fluid Visuals",
    ],
    stack: [
      "Next.js",
      "React",
      "IndexedDB",
      "Supabase",
      "Three.js",
      "GLSL Shaders",
    ],
    highlights: [
      "Local-first storage keeps your notes responsive and accessible without an internet connection.",
      "Automatic background sync updates your documents whenever your connection returns.",
      "Interactive 120 FPS fluid particle canvas that responds smoothly to your cursor.",
    ],
    liveUrl: "https://inkless-ashen.vercel.app/",
    githubUrl: "https://github.com/Yashvardhan-4/Inkless",
  },
  {
    id: "shivkush-consultancy",
    title: "Shivkush Nursery",
    subtitle: "Online Plant Store & Business Management",
    category: "Real-World Business Tool",
    src: "/projects/shivkush.png",
    alt: "Shivkush Nursery website preview",
    description:
      "A bilingual online plant store and inventory management system built for a commercial agriculture nursery, designed to load fast even on slow mobile networks.",
    metrics: [
      "Fast on 2G/3G Networks",
      "84% Smaller 3D Models",
      "Zero Stock Conflicts",
    ],
    stack: [
      "Next.js",
      "Three.js",
      "Google Draco",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    highlights: [
      "Loads quickly even on slow rural mobile connections with offline catalog caching.",
      "Interactive 3D plant previews compressed with Google Draco for instant loading.",
      "Real-time inventory and order management preventing duplicate or out-of-stock orders.",
    ],
    liveUrl: "https://shivkush-hi-tech-nursery.vercel.app/",
    githubUrl: "https://github.com/Yashvardhan-4",
  },
];
