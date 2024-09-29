import {
  profile,
  hypeandbuzz,
  sungurdev,
  tahsinbeycom,
  mallconomy,
  hypeople,
} from './src/assets/img';

const db = {
  name: 'tahsin sungur',
  title: 'frontend developer',
  jobSeeking: true,
  resume: '/doc/TahsinSUNGUR_08_2024.pdf',
  about:
    "i'm a <span class='mark'>frontend developer</span> based in Izmir, and currently working at <a href={lastworklink}>{lastwork}</a>, where I code interfaces and design animations for our individual and corporate clients, prioritizing user experience.",
  image: profile,
  nav: [
    { id: 0, name: 'home', path: '/' },
    { id: 1, name: 'experience', path: '/works' },
  ],
  social: [
    {
      id: 0,
      name: 'github',
      icon: 'github',
      path: 'https://github.com/tahsingibi',
    },
    {
      id: 1,
      icon: 'linkedin',
      name: 'linkedin',
      path: 'https://www.linkedin.com/in/tahsin-sungur/',
    },
    {
      id: 2,
      name: 'x',
      icon: 'twitter-x',
      path: 'https://x.com/tahsingibi',
    },
    {
      id: 3,
      name: 'mail',
      icon: 'envelope',
      path: 'mailto:mtahsinsungur+sungurdev@gmail.com',
    },
  ],
  experience: [
    {
      id: 2,
      image: hypeople,
      name: 'HYPEOPLE',
      title: 'Frontend Developer',
      year: '03/2024 - Present',
      path: '/works#Hypeople',
      description:
        '<p>At Hypeople Studio, I develop websites tailored to the needs of individual and corporate clients. Throughout this process, I have specialized in customer-centric projects, focusing on user experience, performance optimization, and scalability. Additionally, I deliver innovative and effective solutions by incorporating modern web technologies and animation developments into these projects.</p>',
    },
    {
      id: 1,
      image: mallconomy,
      name: 'Mallconomy',
      title: 'Frontend Developer',
      year: '10/2022 - 01/2024',
      path: '/works#Mallconomy',
      description:
        "<p>Mallconomy is building the metaverse's most fun shopping mall on Polygon specifically for the creators, brands and workers, with immersive dynamics, exclusive partnerships and the endless possibilities of a robust GameFi economy.</p><ul><li>I developed a product where users can log in with their social media accounts or web3 wallets, complete marketing tasks, earn points, and convert these points into rewards.</li><li>I transformed this bounty application, which had 1.2 million users and high traffic, into a SaaS model. Working on this project, I improved my skills in state management and architectural design.</li><li>Developed an admin panel to oversee user actions and tasks.</li><li>I developed a web application using React, Typescript, and Ethers.js where users can perform minting and claiming operations for MallCard NFTs within the Mallconomy Metaverse on the Polygon network. In this app, I enabled them to view their referral rewards and the Mallconomy points earned through their NFTs.</li><li>I have developed a sales application for our client's web3 token.</li></ul>",
      projects: [
        {
          id: 'M001',
          name: "Own a piece of Web3 Commerce's future",
          image: mallconomy,
          live: 'https://mint.mallconomy.com/',
          tech: 'Next.js, TypeScript',
          year: '2023',
        },
        {
          id: 'M002',
          name: 'Malls of the Metaverse On Any Device',
          image: mallconomy,
          live: 'https://mallconomy.com/',
          tech: 'HTML, CSS, JavaScript',
          year: '2023',
        },
        {
          id: 'M003',
          name: 'MallStar App - Mallconomy',
          image: mallconomy,
          live: 'https://app.mallconomy.com/',
          tech: 'Next.js',
          year: '2023',
        },
        {
          id: 'M004',
          name: 'Hype&Buzz - Web3 Growth Partner',
          image: hypeandbuzz,
          live: 'https://hypeand.buzz/',
          year: '2023',
          tech: 'Next.js',
        },
        {
          id: 'M005',
          name: 'Admin Dashboard',
          live: '',
          year: '2022',
          tech: 'React, TypeScript',
        },
      ],
    },
    {
      id: 0,
      image: sungurdev,
      name: 'Freelance',
      title: 'Frontend Developer',
      year: '2016 - 2022',
      path: '/works#Freelance',
      description:
        '<p>Sometime around 2018 or a bit earlier, I started developing using HTML/CSS and WordPress, which I continued as a side job until 2022. Regardless of my main occupation, I persisted in constantly improving my coding skills. In 2022, I decided to make coding my primary occupation and began enhancing my expertise in React/Next.js. Before venturing into a freelance frontend developer career, I delivered numerous WordPress products and released a couple of WordPress themes. Some of the projects I worked on during my freelance period include:</p>',
      projects: [
        {
          id: 0,
          name: 'sungur.dev',
          explain: 'My developer portfolio.',
          tech: 'Next.js',
          icon: 'code-slash',
          live: 'https://sungur.dev',
          repo: 'https://github.com/tahsingibi/sungurdev',
          year: 2024,
        },
        {
          id: 1,
          icon: 'reply-all',
          name: 'MailSender',
          explain: 'Nodemailer-based HTML email sender.',
          tech: 'Node.js',
          repo: 'https://github.com/tahsingibi/nodejs-mailsender',
          year: 2024,
        },
        {
          id: 2,
          icon: 'currency-bitcoin',
          name: 'Cryptos App.',
          explain: 'Real-time cryptocurrency market tracker.',
          tech: 'React, Websocket',
          repo: 'https://github.com/tahsingibi/cryptos',
          live: 'https://cryptos-view.vercel.app/',
          year: 2024,
        },
        {
          id: 3,
          icon: 'kanban',
          name: 'CompanyCRM',
          explain: 'React Antd-based admin panel design.',
          tech: 'React, Antd',
          repo: 'https://github.com/tahsingibi/companycrm',
          live: 'https://companycrm.vercel.app/',
          year: 2024,
        },
        {
          id: 4,
          icon: 'bookmark',
          name: 'Bountyhub',
          explain: 'Storybook for Bountyhub application.',
          tech: 'React, Storybook',
          repo: 'https://github.com/tahsingibi/bountyhub',
          live: 'https://bountyhub-storybook.vercel.app/',
          year: 2023,
        },
        {
          id: 5,
          icon: 'feather',
          name: 'tahsinbey.com',
          explain: 'My personal blog.',
          tech: 'WordPress, TailwindCSS',
          live: 'https://tahsinbey.com/',
          year: 2020,
        },
        {
          id: 6,
          name: 'ToDo App.',
          live: 'https://todoapp-practicum.vercel.app/',
          tech: 'React - TailwindCSS',
          year: 2022,
        },
        {
          id: 7,
          name: 'Weather App.',
          live: 'https://weatherapptr.vercel.app/',
          tech: 'React - TailwindCSS',
          year: 2022,
        },

        {
          id: 8,
          name: 'HEXWORD-TR',
          live: 'https://hexword-tr.vercel.app/',
          tech: 'React - TailwindCSS',
          year: 2022,
        },
        {
          id: 9,
          name: 'Landify Landing Page',
          live: 'https://tahsinbey.com/cv/landify/',
          tech: 'TailwindCSS',
          year: 2022,
        },
        {
          id: 10,
          name: 'BRN Architecture & Engineering',
          live: 'https://tahsinbey.com/cv/brn/',
          tech: 'TailwindCSS',
          year: 2020,
        },
        {
          id: 11,
          name: 'Pena Weddings Web Page',
          live: 'https://tahsinbey.com/cv/penaweddings/',
          tech: 'Bootstrap',
          year: 2019,
        },
      ],
    },
  ],
  work: [
    {
      id: 0,
      name: 'sungur.dev',
      explain: 'My developer portfolio.',
      tech: 'Next.js',
      icon: 'code-slash',
      live: 'https://sungur.dev',
      repo: 'https://github.com/tahsingibi/sungurdev',
    },
    {
      id: 1,
      icon: 'reply-all',
      name: 'MailSender',
      explain: 'Nodemailer-based HTML email sender.',
      tech: 'Node.js',
      repo: 'https://github.com/tahsingibi/nodejs-mailsender',
    },
    {
      id: 2,
      icon: 'currency-bitcoin',
      name: 'Cryptos App.',
      explain: 'Real-time cryptocurrency market tracker.',
      tech: 'React, Websocket',
      repo: 'https://github.com/tahsingibi/cryptos',
      live: 'https://cryptos-view.vercel.app/',
    },
    {
      id: 3,
      icon: 'kanban',
      name: 'CompanyCRM',
      explain: 'React Antd-based admin panel design.',
      tech: 'React, Antd',
      repo: 'https://github.com/tahsingibi/companycrm',
      live: 'https://companycrm.vercel.app/',
    },
    {
      id: 4,
      icon: 'bookmark',
      name: 'Bountyhub',
      explain: 'Storybook for Bountyhub application.',
      tech: 'React, Storybook',
      repo: 'https://github.com/tahsingibi/bountyhub',
      live: 'https://bountyhub-storybook.vercel.app/',
    },
    {
      id: 5,
      icon: 'feather',
      name: 'tahsinbey.com',
      explain: 'My personal blog.',
      tech: 'WordPress, TailwindCSS',
      live: 'https://tahsinbey.com/',
    },
  ],
  pages: {
    works: {
      heading: 'works',
      description: 'summary of my background as a frontend developer.',
    },
  },
};

export default db;
