import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { join, resolve } from 'node:path'

const ROOT = resolve(process.cwd())
const DIST = join(ROOT, 'dist')
const SSR = join(ROOT, 'dist-ssr')

const SITE_URL = 'https://zakariyakhalid.dpdns.org'
const SITE_NAME = 'Zakariya Khalid'
const DEFAULT_DESCRIPTION = 'Portfolio of Zakariya Khalid, a software engineer building things for the web.'

const ROUTES = [
  { path: '/', title: null, description: DEFAULT_DESCRIPTION },
  { path: '/work', title: 'Work', description: 'Selected projects by Zakariya Khalid — web apps, tools, and experiments.' },
  { path: '/about', title: 'About', description: 'About Zakariya Khalid, software engineer and founder of Vectura One Inc.' },
  { path: '/skills', title: 'Skills', description: 'Skills and tools Zakariya Khalid uses for web development.' },
  { path: '/experience', title: 'Experience', description: 'Work experience of Zakariya Khalid, founder and CEO of Vectura One Inc.' },
  { path: '/contact', title: 'Contact', description: 'Get in touch with Zakariya Khalid.' },
]

const { render } = await import(pathToFileURL(join(SSR, 'entry-server.js')).href)

const template = await readFile(join(DIST, 'index.html'), 'utf8')

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

for (const route of ROUTES) {
  const html = render(route.path)
  const pageTitle = route.title ? `${route.title} — ${SITE_NAME}` : `${SITE_NAME} — President and CEO of Vectura One Inc.`
  // Note: role comes from portfolio; hardcoded to match profile.role
  const pageDesc = route.description

  let out = template

  // Inject rendered app into #root
  out = out.replace('<div id="root"></div>', `<div id="root">${html}</div>`)

  // Title
  out = out.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(pageTitle)}</title>`)

  // meta description
  out = out.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="${escapeHtml(pageDesc)}" />`,
  )

  // canonical + og:url
  const canonicalUrl = `${SITE_URL}${route.path === '/' ? '/' : route.path}`
  out = out.replace(
    /<link rel="canonical" href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${canonicalUrl}" />`,
  )
  out = out.replace(
    /<meta property="og:url" content="[^"]*"\s*\/>/,
    `<meta property="og:url" content="${canonicalUrl}" />`,
  )

  // og:title / og:description
  out = out.replace(
    /<meta property="og:title" content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${escapeHtml(pageTitle)}" />`,
  )
  out = out.replace(
    /<meta property="og:description" content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${escapeHtml(pageDesc)}" />`,
  )

  // twitter
  out = out.replace(
    /<meta name="twitter:title" content="[^"]*"\s*\/>/,
    `<meta name="twitter:title" content="${escapeHtml(pageTitle)}" />`,
  )
  out = out.replace(
    /<meta name="twitter:description" content="[^"]*"\s*\/>/,
    `<meta name="twitter:description" content="${escapeHtml(pageDesc)}" />`,
  )

  // Write file
  if (route.path === '/') {
    await writeFile(join(DIST, 'index.html'), out)
  } else {
    const dir = join(DIST, route.path.replace(/^\//, ''))
    if (!existsSync(dir)) await mkdir(dir, { recursive: true })
    await writeFile(join(dir, 'index.html'), out)
  }
  console.log('prerendered', route.path)
}

console.log('done')
