import { useEffect } from 'react'
import { profile } from '../data/portfolio'

const SITE_NAME = profile.name

/**
 * Sets the browser tab title per page, e.g. "Work — Zakariya Khalid".
 * Called with no argument it restores the site's default title.
 */
export function usePageMeta(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — ${profile.role}`
  }, [title])
}
