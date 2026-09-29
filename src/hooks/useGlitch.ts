import { useEffect, useRef } from 'react'

/** Hues the core flashes through during a burst. */
const FLASHES = ['#3dffa0', '#00ff9c', '#7cff9b', '#00e0ff', '#2bfffe', '#ff2e88', '#ff5edb'] as const

const between = (min: number, max: number) => min + Math.random() * (max - min)
const pick = (list: readonly string[]) => list[Math.floor(Math.random() * list.length)]

/** Roughly one burst in three dies part-way through, the way a real fault does. */
const CUT_SHORT_CHANCE = 0.35

/**
 * Randomly glitches the 404 on load, then again at irregular intervals.
 *
 * The visuals live in CSS (`not-found-split` / `not-found-core`), which keeps
 * the animation itself on well-supported ground. This hook only varies the
 * per-burst duration, split distance and flash hue, and decides when the next
 * burst fires — so the gaps are genuinely random rather than a fixed loop.
 *
 * Bursts are restarted by removing the attribute, forcing a reflow, and setting
 * it again, which restarts the CSS animations from the beginning.
 */
export function useGlitch<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const timer = useRef(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const run = () => {
      element.style.setProperty('--glitch-dur', `${Math.round(between(280, 640))}ms`)
      element.style.setProperty('--glitch-a', `${between(3, 10).toFixed(1)}px`)
      element.style.setProperty('--glitch-b', `${between(3, 10).toFixed(1)}px`)
      element.style.setProperty('--glitch-flash', pick(FLASHES))
      // A fractional iteration count plays only that slice of the keyframes,
      // so the burst visibly stops early instead of always running to the end.
      element.style.setProperty(
        '--glitch-play',
        Math.random() < CUT_SHORT_CHANCE ? between(0.2, 0.8).toFixed(2) : '1',
      )

      element.removeAttribute('data-glitch')
      // Reflow, so re-adding the attribute counts as a fresh animation.
      void element.offsetWidth
      element.setAttribute('data-glitch', 'on')
    }

    const schedule = () => {
      timer.current = window.setTimeout(() => {
        run()
        schedule()
      }, between(1700, 4600))
    }

    // First burst shortly after load, then keep going at random intervals.
    timer.current = window.setTimeout(() => {
      run()
      schedule()
    }, 600)

    return () => window.clearTimeout(timer.current)
  }, [])

  return ref
}
