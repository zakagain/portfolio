import { Link } from 'react-router-dom'
import { useGlitch } from '../hooks/useGlitch'
import { usePageMeta } from '../hooks/usePageMeta'

/** Decorative terminal output. Hidden from assistive tech, since it only
 *  restates the heading and lead in a different voice. */
const errorLog = [
  '$ curl -sS "https://example.com/whatever" | head -1',
  'HTTP/2 404',
  'error: no such page — did you mean one that exists?',
].join('\n')

const notFoundCode = '404'

export function NotFound() {
  usePageMeta('Page not found')
  const glitchRef = useGlitch<HTMLParagraphElement>()

  return (
    <div className="container page page--centered">
      {/* The ghost layers are decorative duplicates of the code, driven by
          `useGlitch`; only the core span is announced. */}
      <p className="not-found__code" ref={glitchRef}>
        <span className="not-found__code-core">{notFoundCode}</span>
        <span className="not-found__code-ghost not-found__code-ghost--cyan" aria-hidden="true">
          {notFoundCode}
        </span>
        <span className="not-found__code-ghost not-found__code-ghost--pink" aria-hidden="true">
          {notFoundCode}
        </span>
      </p>

      <h1 className="not-found__title">This page doesn't exist</h1>

      <p className="not-found__lead">
        Either it was never here, or I moved it and forgot where. Probably the latter.
      </p>

      <pre className="not-found__log" aria-hidden="true">
        {errorLog}
      </pre>

      <div className="not-found__actions">
        <Link className="button button--primary" to="/">
          Back to home
        </Link>
        <Link className="button" to="/work">
          See my work
        </Link>
      </div>
    </div>
  )
}
