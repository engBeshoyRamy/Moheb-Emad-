import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/**
 * AnimatedSection — wraps children in a scroll-triggered fade/slide animation.
 *
 * Props:
 *  children   — content to animate
 *  delay      — stagger delay in seconds (default 0)
 *  direction  — 'up' | 'down' | 'left' | 'right' (default 'up')
 *  as         — the rendered element tag, e.g. 'section', 'article' (default 'div')
 *  className  — extra Tailwind / CSS classes
 *  style      — inline style overrides
 */
export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  as = 'div',
  style = {},
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-72px' })

  const initial = {
    opacity: 0,
    y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
    x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
  }

  const MotionTag = motion[as] ?? motion.div

  return (
    <MotionTag
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
      style={style}
    >
      {children}
    </MotionTag>
  )
}