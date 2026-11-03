import { useEffect } from 'react'
import { profile } from '../data/portfolio'

const SITE_URL = 'https://zakariyakhalid.com'
const SITE_NAME = profile.name

const DEFAULT_DESCRIPTION = 'Portfolio of Zakariya Khalid, a software engineer building things for the web.'

/**
 * Sets the browser tab title per page, e.g. "Work — Zakariya Khalid".
 * Called with no argument it restores the site's default title.
 * Also keeps <title>, <meta name="description">, <link rel="canonical">,
 * og:*, and twitter:* in sync with the current route so each SPA page
 * self-canonicalizes and carries correct social-preview metadata.
 */
export function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    const pageTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — ${profile.role}`
    const pageDescription = description ?? DEFAULT_DESCRIPTION

    document.title = pageTitle

    // Canonical + og:url
    const normalizedPath = window.location.pathname.replace(/\/+$/, '') || '/'
    const canonicalUrl = `${SITE_URL}${normalizedPath}`
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = canonicalUrl

    let ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]')
    if (!ogUrl) {
      ogUrl = document.createElement('meta')
      ogUrl.setAttribute('property', 'og:url')
      document.head.appendChild(ogUrl)
    }
    ogUrl.content = canonicalUrl

    // description
    let desc = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!desc) {
      desc = document.createElement('meta')
      desc.name = 'description'
      document.head.appendChild(desc)
    }
    desc.content = pageDescription

    // og:title / og:description
    const setMeta = (selector: string, attr: 'property' | 'name', key: string, value: string) => {
      let el = document.querySelector<HTMLMetaElement>(selector)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.content = value
    }
    setMeta('meta[property="og:title"]', 'property', 'og:title', pageTitle)
    setMeta('meta[property="og:description"]', 'property', 'og:description', pageDescription)
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', pageTitle)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', pageDescription)

    // og:image (static asset, same for all routes)
    setMeta('meta[property="og:image"]', 'property', 'og:image', `${SITE_URL}/og.png`)
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', `${SITE_URL}/og.png`)
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
  }, [title, description])
}
