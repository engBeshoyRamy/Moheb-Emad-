import { useEffect, useRef } from 'react'

export default function WaveBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let t = 0

    const waves = [
      { amp: 48, freq: 0.007, speed: 0.009, color: 'rgba(32,0,234,0.1)', y: 0.52 },
      { amp: 32, freq: 0.011, speed: 0.015, color: 'rgba(158,146,231,0.06)', y: 0.57 },
      { amp: 65, freq: 0.004, speed: 0.006, color: 'rgba(32,0,234,0.05)', y: 0.44 },
    ]

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t++
      waves.forEach((w) => {
        ctx.beginPath()
        ctx.moveTo(0, canvas.height * w.y)
        for (let x = 0; x <= canvas.width; x += 3) {
          const y =
            canvas.height * w.y +
            Math.sin(x * w.freq + t * w.speed) * w.amp +
            Math.cos(x * w.freq * 0.5 + t * w.speed * 0.65) * w.amp * 0.4
          ctx.lineTo(x, y)
        }
        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, w.color)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}