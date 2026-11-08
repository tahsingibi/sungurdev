import type { Project, Settings } from "@/types/settings";
import { themeColors } from "./theme.ts";
// Edit shared site content here. Views only select and render these records.
const name = "Tahsin Sungur";
const handle = "tahsingibi";

const routes = { home: "/", works: "/works", write: "/write", rss: "/rss.xml" };
const images = {
  idPhotos: { id: "id-photos", src: "/images/id-photos.webp", name: "A few versions of me" },
  sunset: { id: "sunset", src: "/images/izmir-sunset.webp", name: "An evening in İzmir" },
  profile: { id: "profile", src: "/images/profile.webp", name },
  drawing: { id: "drawing", src: "/images/illustration.webp", name: "An illustration on paper" },
  storm: { id: "storm", src: "/images/izmir-storm.webp", name: "Clouds gathering over the city" },
  sculpture: { id: "sculpture", src: "/images/sculpture.webp", name: "A portrait reimagined" }
};
// A project is defined once; experience, home, and search reuse the same record.
const projects: Record<string, Project> = {
  pratikargo: {
    id: "pratikargo",
    name: "Pratikargo - International Shipping Solutions",
    live: "https://pratikargo.vercel.app/",
    tech: "Next.js, Supabase",
    year: "2025"
  },
  "mallconomy-mint": {
    id: "mallconomy-mint",
    name: "Own a piece of Web3 Commerce's future",
    live: "https://mint.mallconomy.com/",
    tech: "Next.js, TypeScript",
    year: "2023"
  },
  mallconomy: {
    id: "mallconomy",
    name: "Malls of the Metaverse On Any Device",
    live: "https://mallconomy.com/",
    tech: "HTML, CSS, JavaScript",
    year: "2023"
  },
  mallstar: {
    id: "mallstar",
    name: "MallStar App - Mallconomy",
    live: "https://app.mallconomy.com/",
    tech: "Next.js",
    year: "2023"
  },
  "hype-and-buzz": {
    id: "hype-and-buzz",
    name: "Hype&Buzz - Web3 Growth Partner",
    live: "https://hypeand.buzz/",
    year: "2023",
    tech: "Next.js"
  },
  "admin-dashboard": {
    id: "admin-dashboard",
    name: "Admin Dashboard",
    live: "",
    icon: "dashboard-line",
    year: "2022",
    tech: "React, TypeScript"
  },
  hal: {
    id: "hal",
    name: "Hâl",
    explain: "A personal status board for macOS.",
    tech: "Swift, SwiftUI",
    icon: "sparkles",
    logo: { src: "/images/hal.svg", monochrome: true },
    live: "https://hal.sungur.dev/",
    repo: "https://github.com/tahsingibi/hal",
    year: 2026
  },
  ikra: {
    id: "ikra",
    name: "İKRA",
    explain: "An open-source Qur’an reading application.",
    tech: "Next.js, TypeScript",
    icon: "book-open",
    logo: { src: "/images/ikra.webp" },
    live: "https://ikra.sungur.dev/",
    repo: "https://github.com/tahsingibi/ikra",
    year: 2026
  },
  adbroom: {
    id: "adbroom",
    name: "ADBroom",
    explain: "Clean up your Android TV from your Mac.",
    tech: "Swift, SwiftUI, ADB",
    icon: "tv",
    logo: { src: "/images/adbroom.webp" },
    live: "https://adbroom.sungur.dev/",
    repo: "https://github.com/tahsingibi/adbroom",
    year: 2026
  },
  "kurye-35": {
    id: "kurye-35",
    name: "Kurye 35",
    explain: "A courier arcade game set on the streets of İzmir.",
    tech: "Next.js, TypeScript, Canvas API",
    icon: "gamepad",
    logo: { src: "/images/kurye35.webp" },
    live: "https://kurye35.sungur.dev/",
    repo: "https://github.com/tahsingibi/kurye35-game",
    year: 2026
  },
  orbitcast: {
    id: "orbitcast",
    name: "OrbitCast",
    explain: "A synchronised radio. Everyone hears the same moment.",
    tech: "Next.js, Upstash/Redis",
    icon: "radio",
    logo: { src: "/images/orbitcast.webp" },
    live: "https://orbitcast.sungur.dev/",
    repo: "https://github.com/tahsingibi/orbitcast",
    year: 2026
  },
  "sungur-dev": {
    id: "sungur-dev",
    name: "sungur.dev",
    explain: "My developer portfolio.",
    tech: "Next.js",
    icon: "code-s-slash-line",
    live: "https://sungur.dev",
    repo: "https://github.com/tahsingibi/sungurdev",
    year: 2024
  },
  mailsender: {
    id: "mailsender",
    icon: "code",
    name: "MailSender",
    explain: "A small utility for sending HTML emails with Node.js.",
    tech: "Node.js",
    repo: "https://github.com/tahsingibi/nodejs-mailsender",
    year: 2024
  },
  cryptos: {
    id: "cryptos",
    icon: "bit-coin-line",
    name: "Cryptos App.",
    explain: "Real-time cryptocurrency market tracker.",
    tech: "React, Websocket",
    repo: "https://github.com/tahsingibi/cryptos",
    live: "https://cryptos-view.vercel.app/",
    year: 2024
  },
  "company-crm": {
    id: "company-crm",
    icon: "dashboard-line",
    name: "CompanyCRM",
    explain: "React Antd-based admin panel design.",
    tech: "React, Antd",
    repo: "https://github.com/tahsingibi/companycrm",
    live: "https://companycrm.vercel.app/",
    year: 2024
  },
  bountyhub: {
    id: "bountyhub",
    icon: "bookmark-line",
    name: "Bountyhub",
    explain: "Storybook for Bountyhub application.",
    tech: "React, Storybook",
    live: "https://bountyhub-storybook.vercel.app/",
    year: 2023,
    repo: "https://github.com/tahsingibi/bountyhub"
  },
  tahsinbey: {
    id: "tahsinbey",
    icon: "quill-pen-line",
    name: "tahsinbey.com",
    explain: "My personal blog.",
    tech: "WordPress, TailwindCSS",
    live: "https://tahsinbey.com/",
    year: 2020
  },
  todo: {
    id: "todo",
    name: "ToDo App.",
    live: "https://todoapp-practicum.vercel.app/",
    tech: "React - TailwindCSS",
    year: 2022
  },
  weather: {
    id: "weather",
    name: "Weather App.",
    live: "https://weatherapptr.vercel.app/",
    tech: "React - TailwindCSS",
    year: 2022
  },
  "hexword-tr": {
    id: "hexword-tr",
    name: "HEXWORD-TR",
    live: "https://hexword-tr.vercel.app/",
    tech: "React - TailwindCSS",
    year: 2022
  },
  landify: {
    id: "landify",
    name: "Landify Landing Page",
    live: "https://tahsinbey.com/cv/landify/",
    tech: "TailwindCSS",
    year: 2022
  },
  brn: {
    id: "brn",
    name: "BRN Architecture & Engineering",
    live: "https://tahsinbey.com/cv/brn/",
    tech: "TailwindCSS",
    year: 2020
  },
  pena: {
    id: "pena",
    name: "Pena Weddings Web Page",
    live: "https://tahsinbey.com/cv/penaweddings/",
    tech: "Bootstrap",
    year: 2019
  }
};
const experience = [
  {
    id: 2,
    name: "Hypeople Studio",
    title: "Frontend Developer",
    year: "03/2024 - Present",
    path: `${routes.works}#Hypeople`,
    description: "<p>At Hypeople Studio, I develop end-to-end web applications tailored to the needs of both individual and corporate clients. Throughout this process, I specialize in delivering customer-focused projects with a strong emphasis on user experience, performance optimization, security, and scalability. Additionally, I integrate modern web technologies and advanced animations into these projects, providing innovative and impactful solutions.</p>",
    projects: [
      projects.pratikargo,
    ],
  },
  {
    id: 1,
    name: "Mallconomy",
    title: "Frontend Developer",
    year: "10/2022 - 01/2024",
    path: `${routes.works}#Mallconomy`,
    description: "<p>Mallconomy is building the metaverse's most fun shopping mall on Polygon specifically for the creators, brands and workers, with immersive dynamics, exclusive partnerships and the endless possibilities of a robust GameFi economy.</p><ul><li>I developed a product where users can log in with their social media accounts or web3 wallets, complete marketing tasks, earn points, and convert these points into rewards.</li><li>I transformed this bounty application, which had 1.2 million users and high traffic, into a SaaS model. Working on this project, I improved my skills in state management and architectural design.</li><li>Developed an admin panel to oversee user actions and tasks.</li><li>I developed a web application using React, Typescript, and Ethers.js where users can perform minting and claiming operations for MallCard NFTs within the Mallconomy Metaverse on the Polygon network. In this app, I enabled them to view their referral rewards and the Mallconomy points earned through their NFTs.</li><li>I have developed a sales application for our client's web3 token.</li></ul>",
    projects: [
      projects["mallconomy-mint"],
      projects.mallconomy,
      projects.mallstar,
      projects["hype-and-buzz"],
      projects["admin-dashboard"],
    ],
  },
  {
    id: 0,
    icon: "braces-line",
    name: "Freelance",
    title: "Frontend Developer",
    year: "2016 - 2022",
    path: `${routes.works}#Freelance`,
    description: "<p>Sometime around 2018 or a bit earlier, I started developing using HTML/CSS and WordPress, which I continued as a side job until 2022. Regardless of my main occupation, I persisted in constantly improving my coding skills. In 2022, I decided to make coding my primary occupation and began enhancing my expertise in React/Next.js. Before venturing into a freelance frontend developer career, I delivered numerous WordPress products and released a couple of WordPress themes. Some of the projects I worked on during my freelance period include:</p>",
    projects: [
      projects.hal,
      projects.ikra,
      projects.adbroom,
      projects["kurye-35"],
      projects.orbitcast,
      projects["sungur-dev"],
      projects.mailsender,
      projects.cryptos,
      projects["company-crm"],
      projects.bountyhub,
      projects.tahsinbey,
      projects.todo,
      projects.weather,
      projects["hexword-tr"],
      projects.landify,
      projects.brn,
      projects.pena,
    ],
  },
].map((job) => ({
  ...job,
  period: job.year.replace(/\b\d{2}\/(?=\d{4})/g, "").replaceAll(" - ", " — "),
}));
const settings: Settings = {
  name,
  slug: handle,
  title: "Frontend Developer",
  github: handle,
  keywords: [
    "tahsin",
    "sungur",
    "frontend",
    "developer",
    "izmir",
    "react"
  ],
  hiring: true,
  resume: "/doc/TahsinSUNGUR_10_2025.pdf",
  tagline: "a frontend developer's notebook and workshop.",
  location: "İzmir / TR",
  stack: [
    {
      id: 0,
      label: "Language",
      items: [
        "JavaScript",
        "TypeScript"
      ]
    },
    {
      id: 1,
      label: "Frontend",
      items: [
        "React.js",
        "Next.js",
        "Redux",
        "TailwindCSS",
        "Ant Design",
        "Material UI",
        "Bootstrap",
        "Storybook",
        "Lottie"
      ]
    },
    {
      id: 2,
      label: "Backend & Database",
      items: [
        "Node.js",
        "Supabase",
        "Cloudflare Workers",
        "REST API & WebSocket",
        "Web3",
        "Ethers.js"
      ]
    },
    {
      id: 3,
      label: "Workflow & AI",
      items: [
        "Git",
        "GitHub",
        "Bitbucket",
        "Jira",
        "Agile & Scrum",
        "Claude Code",
        "Codex",
        "Gemini"
      ]
    },
    {
      id: 4,
      label: "Design",
      items: [
        "Figma",
        "Adobe XD",
        "Illustrator & Photoshop",
        "Premiere Pro"
      ]
    }
  ],
  pages: {
    write: {
      heading: "blog",
      description: "some codes, snippets, hooks, etc.",
      error: "...but posts are not found.",
      path: routes.write
    },
    works: {
      heading: "experiences",
      description: "summary of my background as a frontend developer.",
      path: routes.works
    },
    projects: {
      heading: "projects",
      description: "a few things i've built on the side.",
      path: routes.works
    },
    stack: {
      heading: "stack",
      description: "languages, tools and technologies i work with.",
      path: routes.works
    }
  },
  seo: {
    description: "Tahsin Sungur's personal site and writing on frontend development, Next.js, and web technologies.",
    locale: "en-US",
    ogLocale: "en_US",
    themeColor: themeColors.light.background,
    googleSiteVerification: process.env.GOOGLE_SITE_VERIFICATION,
    ahrefsSiteVerification: process.env.AHREFS_SITE_VERIFICATION
  },
  analytics: { googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID, webVitalsEndpoint: process.env.NEXT_PUBLIC_WEB_VITALS_ENDPOINT },
  blog: {
    contentDirectory: "content/blogs",
    repository: projects["sungur-dev"].repo!,
    repositoryBranch: "main"
  },
  url: process.env.STAGE === "production" ? "https://sungur.dev/" : "http://localhost:3000",
  routes,
  image: images.profile.src,
  currentCompany: experience[0].name,
  about: "I’m a frontend developer based in İzmir, building web and mobile experiences.",
  nav: [
    {
      id: 0,
      name: "Home",
      description: "A little about me",
      path: routes.home,
      icon: "home-line"
    },
    {
      id: 1,
      name: "Experience",
      description: "Where I’ve worked & what I’ve built",
      path: routes.works,
      icon: "code-s-slash-line"
    },
    {
      id: 2,
      name: "Blog",
      description: "Notes & things I’ve learned",
      path: routes.write,
      icon: "edit-line"
    }
  ],
  social: [
    {
      id: 0,
      name: "x",
      icon: "twitter-x",
      path: `https://x.com/${handle}`,
      label: "Twitter / X"
    },
    {
      id: 1,
      name: "github",
      icon: "github",
      path: `https://github.com/${handle}`,
      label: "GitHub"
    },
    {
      id: 2,
      icon: "linkedin",
      name: "linkedin",
      path: "https://www.linkedin.com/in/tahsin-sungur/",
      label: "LinkedIn"
    },
    {
      id: 3,
      name: "mail",
      icon: "mail",
      path: "mailto:mtahsinsungur+sungurdev@gmail.com",
      label: "Email"
    }
  ],
  projects,
  experience,
  work: [
    projects["hal"],
    projects["ikra"],
    projects["adbroom"],
    projects["kurye-35"],
    projects["orbitcast"],
    projects["sungur-dev"],
    projects["mailsender"],
    projects["cryptos"],
    projects["company-crm"],
    projects["bountyhub"],
    projects["tahsinbey"],
  ],
  gallery: [images.idPhotos, images.sunset, images.profile, images.drawing, images.storm, images.sculpture],
  home: {
    about: {
      heading: "About",
      introduction: "Hi! I’m a frontend developer based in İzmir, currently working at",
      companyId: 2,
      projectsIntroduction: "Outside of work, I’m still building and shipping side projects, including",
      projectIds: ["hal", "adbroom", "orbitcast"],
      closing: "I like turning everyday problems into useful little applications.",
      personal: "Code is only one part of who I am. Away from the keyboard, I take photos, draw, and collect little moments around the city. These are a few of my own photographs and illustrations — a different way of making things."
    },
    experience: { heading: "Experience" },
    projects: { heading: "Projects", ids: ["hal", "adbroom", "ikra", "orbitcast", "kurye-35", "mailsender"], moreLabel: "More on GitHub →" },
    blog: { heading: "Blog", limit: 4, moreLabel: "More blog posts..." },
    contact: { heading: "Contact", introduction: "Want to get in touch?", emailLabel: "Send me an email" }
  }
};
export default settings;
