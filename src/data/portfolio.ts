export type Link = {
  label: string
  href: string
  /** External links open in a new tab. */
  external?: boolean
}

export type Project = {
  id: string
  title: string
  /** One-liner shown on the card. */
  summary?: string
  /** Optional longer paragraph. */
  description?: string
  tech: string[]
  links: Link[]
  status?: 'live' | 'in-progress' | 'archived'
  featured?: boolean
}

export type Experience = {
  role: string
  organisation: string
  location?: string
  /** Optional link (e.g. the organisation's site). Opens in a new tab when external. */
  link?: Link
  start: string
  /** Omit for a role that is still current. */
  end?: string
  summary?: string
  highlights?: string[]
  tech?: string[]
}

export type SkillGroup = {
  category: string
  items: string[]
}

export type SocialLink = Link & {
  handle: string
}

export const profile = {
  name: 'Zakariya Khalid',
  role: 'Chief Operating Officer at Orca Systems',
  location: 'United Kingdom',
  email: 'hello@zakariyakhalid.com',
  resumeUrl: '/resume.pdf',
} as const

export const socials: SocialLink[] = [
  { label: 'GitHub', handle: '@zakagain', href: 'https://github.com/zakagain', external: true },
  {
    label: 'Email',
    // Read from `profile` so the address is only ever written down once.
    handle: profile.email,
    href: `mailto:${profile.email}`,
  },
]

/** Drives the nav bar and the routes in `App.tsx`. */
export const navLinks = [
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/skills', label: 'Skills' },
  { to: '/experience', label: 'Experience' },
  { to: '/contact', label: 'Contact' },
] as const

export const about = {
  heading: 'About',
  paragraphs: [
    "I'm Zak, a developer based in the UK with a strong focus on web development and self-hosted infrastructure. I enjoy building clean, functional tools and exploring how systems work from the code up. I'm very interested in web design. ",
  ],
  facts: [
    { label: 'Based in', value: profile.location },
    { label: 'Focus', value: 'Web development' },
  ],

  currently: [
    'Reading Project Hail Mary',
    'Playing Spider-Man 2',
    'Some other random things',
  ],
}

export const projects: Project[] = [
  {
    id: 'premiere-tui',
    title: 'Premiere TUI',
    summary: 'Scaffold Premiere Pro projects instantly.',
    tech: ['Powershell 7'],
    status: 'live',
    links: [
      { label: 'Live site', href: 'https://premiere-tui.zakariyakhalid.com', external: true },
      { label: 'Source', href: 'https://github.com/zakagain/premiere-tui', external: true },
    ],
  },
  {
    id: 'config-journal',
    title: 'Config Journal',
    tech: ['TypeScript', 'JavaScript'],
    status: 'live',
    links: [
      { label: 'Live site', href: 'https://config-journal.zakariyakhalid.com', external: true },
      { label: 'Source', href: 'https://github.com/zakagain/config-journal', external: true },
    ],
  },
  {
    id: 'mac-space-period',
    title: 'Mac Space Period',
    tech: ['AutoHotkey v2'],
    status: 'live',
    links: [
      { label: 'Live site', href: 'https://msp.zakariyakhalid.com', external: true },
      { label: 'Source', href: 'https://github.com/zakagain/MSP', external: true },
    ],
  },
  {
    id: 'finance-app',
    title: 'Finance App',
    tech: ['TypeScript', 'CSS'],
    status: 'live',
    links: [
      { label: 'Live site', href: 'https://zakagain.github.io/finance-app', external: true },
      { label: 'Source', href: 'https://github.com/zakagain/finance-app', external: true },
    ],
  },
  {
    id: 'icao-lookup',
    title: 'ICAO Lookup',
    tech: ['HTML', 'CSS'],
    status: 'live',
    links: [
      { label: 'Live site', href: 'https://zakagain.github.io/ICAO_lookup/', external: true },
      { label: 'Source', href: 'https://github.com/zakagain/ICAO_lookup', external: true },
    ],
  },
]

export const experience: Experience[] = [
  {
    role: 'Chief Operating Officer',
    organisation: 'Orca Systems',
    link: {
      label: 'Orca Servers',
      href: 'https://orcaservers.com/?utm_source=zakariyakhalid.com',
      external: true,
    },
    start: '2026',
    summary:
      'Early stages. Joined Orca Systems (https://orcaservers.com) as Chief Operating Officer.',
  },
]

/**
 * One flat list rather than separate categories. Every language used across the
 * projects above is marked as a basic skill; keep those in step with the
 * project `tech` lists.
 */
export const skills: SkillGroup[] = [
  {
    category: 'Skills',
    items: [
      'TypeScript (basic skills)',
      'JavaScript (basic skills)',
      'Python (basic skills)',
      'HTML (basic skills)',
      'CSS (basic skills)',
      'AutoHotkey v2 (basic skills)',
      'React',
      'Accessibility',
      'Node.js',
      'REST APIs',
      'Postgres',
      'Git',
      'Vite',
      'Testing',
      'CI/CD',
    ],
  },
]

/**
 * Headline numbers in the hero band. The project count is derived from
 * `projects`, so it cannot drift out of step with the rest of the page.
 */
export const metrics = [
  {
    value: String(projects.filter((project) => project.status === 'live').length).padStart(2, '0'),
    label: 'live projects',
  },
  { value: '∞', label: 'random stuff, hoping it works' },
  { value: '2026', label: 'Joined Orca Systems' },
]
