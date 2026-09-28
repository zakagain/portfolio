/**
 * Fixed grid backdrop. Rendered once in the Layout so the reveal animation
 * plays on a full page load, not on every client-side navigation.
 *
 * The reveal is pure CSS: `--reveal` runs from 0% to 125% and widens an opaque
 * wedge from the top-right corner towards the bottom-left.
 */
export function GridBackground() {
  return <div className="grid-bg" aria-hidden="true" />
}
