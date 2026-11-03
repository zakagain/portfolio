function Letter({ char }: { char: string }) {
  return <span className="letter">{char}</span>
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
      <span aria-hidden="true">
        {words.map((word, w) => (
          <span key={word}>
            {Array.from(word).map((char, i) => (
              <Letter key={`${char}-${i}`} char={char} />
            ))}
            {w < words.length - 1 ? ' ' : null}
          </span>
        ))}
      </span>
    </span>
  )
}
