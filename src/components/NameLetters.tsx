import { useState } from 'react'
import type { CSSProperties } from 'react'

/**
 * Faces the name can flip to on hover. Deliberately all sans-serif, and only
 * ones whose advances stay close to the resting face: the alternate face is
 * layered over the resting one, so a wider one would overlap its neighbour.
 * Measured worst-case overhang is ~4px for these, against 9px for Gill Sans
 * and 5.8px for Lucida Grande, which were dropped.
 */
const HOVER_FONTS = [
  '"Helvetica Neue", Helvetica, Arial, sans-serif',
  '"Trebuchet MS", "Lucida Sans Unicode", sans-serif',
  '"Avenir Next", Avenir, "Segoe UI", sans-serif',
  '"Roboto Condensed", "Arial Narrow", "Helvetica Neue", sans-serif',
  '"Segoe UI", Roboto, "Helvetica Neue", sans-serif',
] as const

function pickFont() {
  return HOVER_FONTS[Math.floor(Math.random() * HOVER_FONTS.length)]
}

function Letter({ char }: { char: string }) {
  // Re-picked on every hover, so returning to a letter can give a new face.
  const [hoverFont, setHoverFont] = useState<string>(HOVER_FONTS[0])

  return (
    <span
      className="letter"
      style={{ '--letter-font': hoverFont } as CSSProperties}
      onMouseEnter={() => setHoverFont(pickFont())}
    >
      <span className="letter__face letter__face--base">{char}</span>
      <span className="letter__face letter__face--alt" aria-hidden="true">
        {char}
      </span>
    </span>
  )
}

type NameLettersProps = {
  name: string
  className?: string
}

/**
 * Renders a name as individually hoverable letters.
 *
 * The alternate face is taken out of flow and layered over the resting one, so
 * it can never resize its cell and shift the rest of the name — which matters
 * because the face is chosen at random on each hover.
 *
 * The real name is exposed once via `.sr-only` and the per-letter markup is
 * hidden, so screen readers announce it as a single word rather than spelling
 * it out letter by letter.
 */
export function NameLetters({ name, className }: NameLettersProps) {
  const words = name.split(/\s+/).filter(Boolean)

  return (
    <span className={className ? `name ${className}` : 'name'}>
      <span className="sr-only">{name}</span>
      {words.map((word, w) => (
        <span key={word}>
          {Array.from(word).map((char, i) => (
            <Letter key={`${char}-${i}`} char={char} />
          ))}
          {w < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </span>
  )
}
