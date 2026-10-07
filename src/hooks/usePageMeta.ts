import { useEffect } from 'react'
import { profile } from '../data/portfolio'

const SITE_URL = 'https://zakariyakhalid.dpdns.org'
const SITE_NAME = profile.name

/**
 * Sets the browser tab title per page, e.g. "Work — Zakariya Khalid".
 * Called with no argument it restores the site's default title.
 * Also keeps <link rel="canonical"> and og:url in sync with the current
 * route so each SPA page self-canonicalizes for Google.
 */
export function usePageMeta(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — ${profile.role}`

    const canonicalUrl = `${SITE_URL}${window.location.pathname}`
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
  }, [title])
}
