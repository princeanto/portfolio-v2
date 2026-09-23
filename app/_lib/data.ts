/* Single source of truth for all page content. */

/* One source for the profile link — the talk/chat buttons and the socials
   list all point at it, so it only ever has to be changed here. */
const LINKEDIN = 'https://www.linkedin.com/in/prince-ladislas/';

export const PROFILE = {
  name: 'Prince Ladislas',
  role: 'Product Designer',
  location: 'India',
  email: 'princeladislas@gmail.com',
  resume: '/assets/pdf/Resume.pdf',
  linkedin: LINKEDIN,
  contactForm: 'https://forms.gle/GUYL1qWKesVqbmPi7',
  timeZone: 'Asia/Kolkata',
  socials: [
    { label: 'LinkedIn', href: LINKEDIN },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/anto__designs?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    },
  ],
};

export type NavItem = {
  label: string;
  href: string;
  /** Shown as an icon in the desktop pill; the label still names it for
      screen readers and is used as-is in the mobile menu */
  icon?: 'home';
};

/* Desktop pill nav. Home leads as an icon; Contact is left out because the
   "Let's talk" button sits beside this nav. This list also drives the
   scroll-spy highlight, so labels here match the section headings. */
export const NAV_PRIMARY: NavItem[] = [
  { label: 'Home', href: '#top', icon: 'home' },
  { label: 'Selected works', href: '#work' },
  { label: 'UI works', href: '#ui' },
  { label: 'AI playground', href: '#ai' },
  // Creative breaks is parked — uncomment here and in app/page.tsx to restore
  // { label: 'Creative breaks', href: '#play' },
  { label: 'About me', href: '#about' },
  { label: 'Community', href: '#community' },
];

/* Mobile overlay — the same run, plus the two the pill leaves out */
export const NAV_ALL: NavItem[] = [
  ...NAV_PRIMARY,
  { label: 'In their words', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

/* AI playground ----------------------------------------------------------
   Things built end to end with AI — games, apps, tools, experiments.

   TO ADD ONE: copy a block below and edit it. Only `title`, `blurb`, `href`
   and `kind` are required.
     kind  — free text, shown as the pill. e.g. 'Game', 'App', 'Tool'.
     stack — optional; the models/tools used, shown under the title.
     art   — optional; a screenshot in /public/assets/images/. Cards without
             one fall back to a generated monogram, so a missing image never
             leaves a hole in the grid.
     year  — optional.

   The section hides itself entirely when this array is empty, so it is safe
   to ship with nothing in it. */

export type AiWork = {
  title: string;
  blurb: string;
  href: string;
  kind: string;
  stack?: string;
  art?: string;
  year?: string;
};

export const AI_PLAYGROUND: AiWork[] = [
  {
    title: 'Gambit',
    blurb:
      'A full 3D chess set you can orbit and zoom, with an engine at five strength levels, ' +
      'engine-vs-engine duels, move review and FEN import.',
    href: 'https://chess-3d-dusky.vercel.app',
    kind: 'Game',
    stack: 'Next.js · WebGL',
    art: '/assets/images/ai-gambit-chess.webp',
    year: '2026',
  },
  {
    title: 'Playground',
    blurb:
      'Colour, type, shape, draw, make and dare: six small creative tools in one tab. ' +
      'No account, and once loaded it installs and keeps working offline.',
    href: 'https://playground-phi-orpin.vercel.app',
    kind: 'Tool',
    stack: 'Next.js · PWA',
    art: '/assets/images/ai-playground.webp',
    year: '2026',
  },
  {
    title: 'Runner',
    blurb:
      "Chrome's offline dinosaur, playing on the CRT of a 3D Bondi Blue iMac G3 you can " +
      'walk around — eight camera angles, from screen-on to free look.',
    href: 'https://runner-zeta-seven.vercel.app/',
    kind: 'Game',
    stack: 'Next.js · WebGL',
    art: '/assets/images/ai-runner-imac.webp',
    year: '2026',
  },
  {
    title: 'Spot the Lie',
    blurb:
      'Four statements a round, three of them true and one invented by a model. ' +
      '56 rounds, three hints, three wrong answers and you start over.',
    href: 'https://spot-the-lie.vercel.app',
    kind: 'Game',
    stack: 'Next.js',
    art: '/assets/images/ai-spot-the-lie.webp',
    year: '2026',
  },
];

export type Service = { title: string; body: string; icon: string };

export const SERVICES: Service[] = [
  {
    title: 'Product Design',
    body: 'Crafting intuitive, pixel-perfect experiences for web and mobile.',
    icon: '/assets/images/product-design-1.png',
  },
  {
    title: 'UI/UX Strategy',
    body: 'Solving real user problems with research-driven design thinking.',
    icon: '/assets/images/product-design-2.png',
  },
  {
    title: 'Design Systems',
    body: 'Building scalable, flexible systems that power consistency and speed.',
    icon: '/assets/images/product-design-3.png',
  },
  {
    title: 'AI-Enhanced Design',
    body: 'Leveraging AI tools like ChatGPT & Perplexity to supercharge creativity.',
    icon: '/assets/images/product-design-4.png',
  },
];

export type Project = {
  id: string;
  /** Product name as it should read in the entry header */
  name: string;
  /** One-line description sitting under the name */
  subtitle: string;
  /** Engagement window shown in the pill on the right */
  period: string;
  /** Discipline chips shown inside the media card */
  chips: string[];
  /** Wide artwork, used when the entry runs full width */
  art: string;
  /** Tall image opened in the lightbox */
  full?: string;
  /** Internal route opened in the modal instead of an image */
  route?: string;
};

export const PROJECTS: Project[] = [
  {
    id: 'connect',
    name: 'Connect',
    subtitle: 'One API instead of a hundred identity checks',
    period: '2021 – 2026',
    chips: ['Enterprise platform', 'Research', 'Design systems'],
    art: '/assets/images/projects/connect.png',
    route: '/platform-evolution/',
  },
  {
    id: 'lulu',
    name: 'Lulu Money',
    subtitle: 'Cross-border remittance, rebuilt around trust',
    period: 'Fintech',
    chips: ['Mobile app', 'UX', 'Research'],
    art: '/assets/images/projects/lulu.png',
    full: '/assets/images/Lulu-ui.png',
  },
  {
    id: 'alfapay',
    name: 'AlfaPay',
    subtitle: 'Al Fardan Exchange\u2019s money transfer experience',
    period: 'Fintech',
    chips: ['Mobile app', 'UX', 'Research'],
    art: '/assets/images/projects/alfapay.png',
    full: '/assets/images/Alfapay-ui.png',
  },
  {
    id: 'cookr',
    name: 'Cookr',
    subtitle: 'Home-cooked food, ordered like everything else',
    period: 'Consumer',
    chips: ['Web app', 'UI'],
    art: '/assets/images/projects/cookr.png',
    full: '/assets/images/Cookr-ui.png',
  },
  {
    id: 'wand',
    name: 'Wand',
    subtitle: 'A workspace for running verification projects',
    period: 'SaaS',
    chips: ['Web app', 'UI', 'Design systems'],
    art: '/assets/images/projects/wand.png',
    full: '/assets/images/Wand-ui.png',
  },
];

/* Each screen carries its own title and one line about what it shows, so the
   grid reads as four pieces of work rather than four pictures. */
export const UI_WORKS = [
  {
    thumb: '/assets/images/ui-works-1.webp',
    full: '/assets/images/ui-works-full-1.webp',
    alt: 'Digital KYC onboarding',
    title: 'Digital KYC',
    note: 'Onboarding that verifies an ID from a photo of the card.',
  },
  {
    thumb: '/assets/images/ui-works-2.webp',
    full: '/assets/images/ui-works-full-2.webp',
    alt: 'Cookr home-chef flow',
    title: 'Cookr home chefs',
    note: 'How a home cook signs up, gets listed and starts selling.',
  },
  {
    thumb: '/assets/images/ui-works-3.webp',
    full: '/assets/images/ui-works-full-3.webp',
    alt: 'Salary advance activation',
    title: 'Salary advance',
    note: 'Drawing wages early against a WPS payroll card.',
  },
  {
    thumb: '/assets/images/ui-works-4.webp',
    full: '/assets/images/ui-works-full-4.webp',
    alt: 'Banking dashboard',
    title: 'Banking dashboard',
    note: 'Account home — balance, cards and the day’s activity.',
  },
];

export const PLAY = {
  title: 'Design Experiments: Vadivelu Edition',
  body: "A playful concept imagining how Vadivelu's iconic dialogues would look if turned into real digital experiences — from apps to portals.",
  preview: '/assets/images/mobile-screens.webp',
  backdrop: '/assets/images/gold.webp',
  full: '/assets/images/vadivelu-ui.webp',
};

/* Intrinsic dimensions are recorded so the gallery can lay each photo out
   at its true aspect ratio rather than cropping everything to one shape. */
export const COMMUNITY_IMAGES = [
  { src: '/assets/images/community-1.webp', alt: 'Community workshop', w: 1090, h: 1109 },
  { src: '/assets/images/community-2.webp', alt: 'Collaboration session', w: 1090, h: 602 },
  { src: '/assets/images/community-3.webp', alt: 'Design feedback', w: 858, h: 642 },
  { src: '/assets/images/community-4.webp', alt: 'Critique session', w: 858, h: 1064 },
  { src: '/assets/images/community-5.webp', alt: 'Networking', w: 482, h: 998 },
  { src: '/assets/images/community-6.webp', alt: 'Sketch sprint', w: 800, h: 999 },
  { src: '/assets/images/community-7.webp', alt: 'Panel discussion', w: 1342, h: 696 },
];

export type CommunityWork = {
  slug: string;
  title: string;
  thumb: string;
  full: string;
};

export const COMMUNITY_WORKS: CommunityWork[] = [
  { slug: 'mad-desgin-2023', title: 'MAD Design 2023', thumb: '/assets/images/community-works-1.webp', full: '/assets/images/community-works-ui-1.webp' },
  { slug: 'chennai-meet-2022', title: 'Chennai Meet 2022', thumb: '/assets/images/community-works-2.webp', full: '/assets/images/community-works-ui-2.webp' },
  { slug: 'hydrabad-meet', title: 'Hyderabad Meet', thumb: '/assets/images/community-works-3.webp', full: '/assets/images/community-works-ui-3.webp' },
  { slug: 'kalaiyugam-2023', title: 'Kalaiyugam 2023', thumb: '/assets/images/community-works-4.webp', full: '/assets/images/community-works-ui-4.webp' },
  { slug: 'hydrabad-meet-2024', title: 'Hyderabad Meet 2024', thumb: '/assets/images/community-works-5.webp', full: '/assets/images/community-works-ui-5.webp' },
  { slug: 'design-system-workshop', title: 'Design System Workshop', thumb: '/assets/images/community-works-6.webp', full: '/assets/images/community-works-ui-6.webp' },
];

export type Testimonial = { quote: string; name: string; role: string; avatar: string };

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'He consistently takes complete ownership of projects and drives them with clarity and dedication. Prince has an exceptional ability to handle complex problems and translate them into thoughtful, practical design solutions.',
    name: 'Ganesh',
    role: 'Manager · M2P Fintech',
    avatar: '/assets/images/ganesh.png',
  },
  {
    quote:
      'His main strengths include sharp problem-solving abilities and grasping complex concepts quickly. His adaptability and resilience enable him to thrive under pressure, with a proactive attitude.',
    name: 'Jeevan',
    role: 'Manager · M2P Fintech',
    avatar: '/assets/images/jeevan.png',
  },
  {
    quote:
      'Prince quickly understands product context and brings structure to ambiguity. His calm, analytical approach helps teams move faster with confidence.',
    name: 'Rajesh Sanker',
    role: 'Manager · M2P Fintech',
    avatar: '/assets/images/rajesh.png',
  },
  {
    quote:
      'His creativity, attention to detail, and collaborative spirit make him a joy to work with. He will continue to shine and achieve remarkable success everywhere he goes.',
    name: 'Ishaq',
    role: 'Lead Designer · Publicis Sapient',
    avatar: '/assets/images/ishaq.png',
  },
];

export const ABOUT = {
  portrait: '/assets/images/prince-hero-image.webp',
  statement: [
    { text: "I\u2019ve spent the past ", em: false },
    { text: "6+ years", em: true },
    { text: " designing ", em: false },
    { text: "enterprise and consumer", em: true },
    { text: " products for teams of all sizes.", em: false },
  ],
  paragraphs: [
    'My route into design wasn\u2019t conventional — I\u2019m self-taught, and I learnt by shipping.',
    'For the past few years I\u2019ve worked on digital products spanning identity verification, payments, remittance and food delivery. I like decoding complicated systems and turning them into something one person can actually use.',
    'I\u2019m at my best on problems with real constraints — where the hard part is structure, not decoration, and where the work has to hold up once it ships.',
  ],
};
