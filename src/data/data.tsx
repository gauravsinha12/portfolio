import {
  AcademicCapIcon,
  ArrowDownTrayIcon,
  BuildingOffice2Icon,
  CalendarIcon,
  FlagIcon,
  MapIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

import GithubIcon from '../components/Icon/GithubIcon';
import InstagramIcon from '../components/Icon/InstagramIcon';
import LinkedInIcon from '../components/Icon/LinkedInIcon';
import StackOverflowIcon from '../components/Icon/StackOverflowIcon';
import TwitterIcon from '../components/Icon/TwitterIcon';
import heroImage from '../images/header-background.webp';
import porfolioImage1 from '../images/portfolio/portfolio-1.jpg';
import porfolioImage2 from '../images/portfolio/portfolio-2.jpg';
import porfolioImage3 from '../images/portfolio/portfolio-3.jpg';
import porfolioImage4 from '../images/portfolio/portfolio-4.jpg';
import porfolioImage5 from '../images/portfolio/portfolio-5.jpg';
import porfolioImage6 from '../images/portfolio/portfolio-6.jpg';
import porfolioImage7 from '../images/portfolio/portfolio-7.jpg';
import porfolioImage8 from '../images/portfolio/portfolio-8.jpg';
import porfolioImage9 from '../images/portfolio/portfolio-9.jpg';
import porfolioImage10 from '../images/portfolio/portfolio-10.jpg';
import porfolioImage11 from '../images/portfolio/portfolio-11.jpg';
import profilepic from '../images/profilepic.jpg';
// import testimonialImage from '../images/testimonial.webp';
import {
  About,
  ContactSection,
  ContactType,
  Hero,
  HomepageMeta,
  PortfolioItem,
  SkillGroup,
  Social,
  TimelineItem,
} from './dataDef';

/**
 * Page meta data
 */
export const homePageMeta: HomepageMeta = {
  title: 'Gaurav Sinha Portfolio',
  description: "This is my portfolio Website",
};

/**
 * Section definition
 */
export const SectionId = {
  Hero: 'hero',
  About: 'about',
  Contact: 'contact',
  Portfolio: 'portfolio',
  Resume: 'resume',
  Skills: 'skills',
  Stats: 'stats',
} as const;

export type SectionId = (typeof SectionId)[keyof typeof SectionId];

/**
 * Hero section
 */
export const heroData: Hero = {
  imageSrc: heroImage,
  name: `I'm Gaurav Sinha.`,
  description: (
    <>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        I'm India Based <strong className="text-stone-100">Full Stack Software Engineer and A Machine Learning Engineer</strong>, currently working
        at Accenture <strong className="text-stone-100"></strong> 
      </p>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        In my free time, you can catch me building tools that can provide ease to my work <strong className="text-stone-100">or tranning an LLM</strong>
      </p>
    </>
  ),
  actions: [
    {
      href: 'https://drive.google.com/file/d/1rWi5n-fXWC6CeT8Oc9119F5zwd0sr8vb/view?usp=sharing',
      text: 'Resume',
      primary: true,
      Icon: ArrowDownTrayIcon,
    },
    {
      href: `#${SectionId.Contact}`,
      text: 'Contact',
      primary: false,
    },
  ],
}

/**
 * About section
 */
export const aboutData: About = {
  profileImageSrc: profilepic,
  description: `I specialize in developing dynamic web applications, working fluently across both frontend and backend technologies. With expertise in React, Express, Django, and Spring Boot, I integrate these with databases like MongoDB and MySQL. I also leverage cloud platforms such as Azure and AWS to deliver reliable and scalable solutions. My skill set is geared towards ensuring efficient and effective software development.`,
  aboutItems: [
    {label: 'Location', text: 'India , Mumbai', Icon: MapIcon},
    {label: 'Age', text: '24', Icon: CalendarIcon},
    {label: 'Interests', text: 'Chess, Maths and Competetive Programming', Icon: SparklesIcon},
    {label: 'Employment', text: 'Accenture', Icon: BuildingOffice2Icon},
  ],
};

/**
 * Skills section
 */
export const skills: SkillGroup[] = [
  
  {
    name: 'Frontend development',
    skills: [
      {
        name: 'React',
        level: 9,
      },
      {
        name: 'Typescript',
        level: 7,
      },
      {
        name: 'Angular',
        level: 6,
      },
    ],
  },
  {
    name: 'Backend development',
    skills: [
      {
        name: 'Express.js',
        level: 7,
      },
      {
        name: 'Django',
        level: 8,
      },
      {
        name: 'Golang',
        level: 6,
      },
    ],
  },
  {
    name: 'Database Technologies',
    skills: [
      {
        name: 'MongoDB',
        level: 7,
      },
      {
        name: 'MySQL',
        level: 8,
      },
    
    ],
  },
  {
    name: 'API Technologies',
    skills: [
      {
        name: 'GraphQL',
        level: 7,
      },
      {
        name: 'RestfulAPI',
        level: 8,
      },
    ],
  },
  {
    name: 'Mobile development',
    skills: [
      {
        name: 'Flutter',
        level: 7,
      },
      {
        name: 'Kotlin',
        level: 6,
      },
    ],
  },
  {
    name: 'Spoken languages',
    skills: [
      {
        name: 'English',
        level: 10,
      },
      {
        name: 'Hindi',
        level: 10,
      },
    ],
  },
];

/**
 * Portfolio section
 */
export const portfolioItems: PortfolioItem[] = [
 
  {
    title: 'React Chat App',
    description: 'The React Chat Room App enables real-time messaging across multiple rooms with secure user authentication and a responsive design, ensuring seamless communication on any device.',
    url: 'https://github.com/gauravsinha12/React-ChatApp-main',
    image: porfolioImage5,
  },
  {
    title: 'Rusty Compressor',
    description: 'This is File compressor which can optimially compress a file and is written in RUST.',
    url: 'https://github.com/gauravsinha12/Rusty-compressor',
    image: porfolioImage6,
  },
  {
    title: 'Job Portal',
    description: 'This is a job portal whoes frontend is done using Html , css and Bootstraped, Backend is done using Django and for Database I have used MySQL',
    url: 'https://github.com/gauravsinha12/onlinejobportal',
    image: porfolioImage7,
  },

  {
    title: 'AI SQL Engineer',
    description: 'This AI sql Engineer is capable of executing any SQL queries on database with just a input of simple prompts.',
    url: 'https://github.com/gauravsinha12/AI-Sql-Engineer',
    image: porfolioImage11,
  },
];

/**
 * Resume section -- TODO: Standardize resume contact format or offer MDX
 */
export const experience: TimelineItem[] = [
  {
    date: 'Dec 2022 - Present',
    location: 'Mumbai, India',
    title: 'Advance Associate Software Engineer',
    content: (
      <p>
        We have worked on React for the frontend, initially built the backend with Spring Boot, and later transitioned it to Flask for better flexibility and performance.
      </p>
    ),
  },

];


export const education: TimelineItem[] = [
  {
    date: 'June 2022',
    location: 'Bhopal, Madhyapradesh',
    title: 'Rajiv Gandhi Proudyogiki Vishwavidyalaya',
    content: <p><strong>B.Tech From Computer Science with CGPA :- 8.0</strong></p>,

  },
];


/**
 * Testimonial section
 */
// export const testimonial: TestimonialSection = {
//   imageSrc: testimonialImage,
//   testimonials: [
//     {
//       name: 'John Doe',
//       text: 'Use this as an opportunity to promote what it is like to work with you. High value testimonials include ones from current or past co-workers, managers, or from happy clients.',
//       image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/169.jpg',
//     },
//     {
//       name: 'Jane Doe',
//       text: 'Here you should write some nice things that someone has said about you. Encourage them to be specific and include important details (notes about a project you were on together, impressive quality produced, etc).',
//       image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/14.jpg',
//     },
//     {
//       name: 'Someone else',
//       text: 'Add several of these, and keep them as fresh as possible, but be sure to focus on quality testimonials with strong highlights of your skills/work ethic.',
//       image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/69.jpg',
//     },
//   ],
// };

/**
 * Contact section
 */

export const contact: ContactSection = {
  headerText: 'Get in touch.',
  description: 'Here is a good spot for a message to your readers to let them know how best to reach out to you.',
  items: [
    {
      type: ContactType.Email,
      text: 'gauravsinha6261@gmail.com',
      href: 'mailto:gauravsinha6261@gmail.com',
    },
    {
      type: ContactType.Instagram,
      text: '@life_of.gaurav',
      href: 'https://www.instagram.com/life_of.gaurav/',
    },
    {
      type: ContactType.Github,
      text: 'gauravsinha12',
      href: 'https://github.com/gauravsinha12',
    },
  ],
};

/**
 * Social items
 */
export const socialLinks: Social[] = [
  {label: 'Github', Icon: GithubIcon, href: 'https://github.com/gauravsinha12'},
  {label: 'LinkedIn', Icon: LinkedInIcon, href: 'https://www.linkedin.com/in/gaurav-sinha-pro108/'},
  {label: 'Instagram', Icon: InstagramIcon, href: 'https://www.instagram.com/life_of.gaurav/'},
];
