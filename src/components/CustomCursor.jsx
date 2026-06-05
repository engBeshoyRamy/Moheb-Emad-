import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    // Only on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`
      }
    }

    const animRing = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.1
      ring.current.y += (pos.current.y - ring.current.y) * 0.1
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`
        ringRef.current.style.top = `${ring.current.y}px`
      }
      rafRef.current = requestAnimationFrame(animRing)
    }

    const onOver = (e) => {
      if (e.target.closest('a, button, [role="button"]')) {
        document.body.classList.add('cursor-grow')
      }
    }
    const onOut = (e) => {
      if (e.target.closest('a, button, [role="button"]')) {
        document.body.classList.remove('cursor-grow')
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mouseout', onOut)
    rafRef.current = requestAnimationFrame(animRing)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor hidden md:block"
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="custom-cursor-ring hidden md:block"
        aria-hidden="true"
      />
    </>
  )
}