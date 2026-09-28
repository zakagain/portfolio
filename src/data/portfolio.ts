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
  role: 'President and CEO of Vectura One Inc.',
  tagline: 'I do random stuff and hope it works',
  location: 'United Kingdom',
  email: 'hello@zakariyakhalid.dpdns.org',
  resumeUrl: '/resume.pdf',
} as const

export const socials: SocialLink[] = [
  { label: 'GitHub', handle: '@zakagain', href: 'https://github.com/zakagain', external: true },
  {
    label: 'Email',
    handle: 'hello@zakariyakhalid.dpdns.org',
    href: 'mailto:hello@zakariyakhalid.dpdns.org',
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
    "Hi, I'm Zak. Nice to meet you. I enjoy films, TV and videogames. I also like development, as you can see. I really don't know what else to put here, so this is it for now. ",
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
    id: 'config-journal',
    title: 'Config Journal',
    tech: ['TypeScript', 'JavaScript'],
    status: 'live',
    links: [
      { label: 'Live site', href: 'https://config-journal.zakariyakhalid.dpdns.org', external: true },
      { label: 'Source', href: 'https://github.com/zakagain/config-journal', external: true },
    ],
  },
  {
    id: 'mac-space-period',
    title: 'Mac Space Period',
    tech: ['AutoHotkey v2'],
    status: 'live',
    // No live site for this one.
    links: [{ label: 'Source', href: 'https://github.com/zakagain/MSP', external: true }],
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
    role: 'Founder, President and CEO',
    organisation: 'Vectura One Inc.',
    start: '2025',
    summary:
      'Founded and lead Vectura One Inc., setting its direction and overseeing day-to-day operations and growth.',
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
