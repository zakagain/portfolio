import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'

export function NotFound() {
  usePageMeta('Page not found')

  return (
    <div className="container page page--centered">
      <p className="not-found__code">404</p>
      <h1 className="not-found__title">This page does not exist</h1>
      <p className="not-found__lead">
        The link may be out of date, or the page may have moved.
      </p>
      <Link className="button button--primary" to="/">
        Back to home
      </Link>
    </div>
  )
}
