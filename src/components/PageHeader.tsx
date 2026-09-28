import type { ReactNode } from 'react'

type PageHeaderProps = {
  title: string
  children?: ReactNode
  /** Optional blurb shown under the heading. */
  lede?: string
}

/** Heading block at the top of a standalone page. */
export function PageHeader({ title, lede }: PageHeaderProps) {
  return (
    <header className="page-header">
      <h1 className="page-header__title">{title}</h1>
      {lede ? <p className="page-header__lede">{lede}</p> : null}
    </header>
  )
}
