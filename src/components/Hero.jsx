import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useScrollTo } from '../hooks/useScrollTo'

/* ─────────────────────────────────────────
   Photo Portrait
───────────────────────────────────────── */
function Portrait() {
  const scanRef = useRef(null)
  const pwA = useRef(null)
  const pwB = useRef(null)

  useEffect(() => {
    let t = 0
    let rafId
    const W = 460

    const animate = () => {
      t += 0.5

      if (pwA.current && pwB.current) {
        const y = 570
        let dA = `M0,${y}`
        let dB = `M0,${y + 12}`

        for (let x = 0; x <= W; x += 5) {
          dA += ` L${x},${y + Math.sin(x * 0.022 + t * 0.035) * 20 + Math.cos(x * 0.044 + t * 0.028) * 9}`
          dB += ` L${x},${y + 12 + Math.cos(x * 0.018 + t * 0.042) * 16 + Math.sin(x * 0.036 + t * 0.022) * 7}`
        }

        pwA.current.setAttribute('d', dA + ` L${W},612 L0,612 Z`)
        pwB.current.setAttribute('d', dB + ` L${W},612 L0,612 Z`)
      }

      if (scanRef.current) {
        scanRef.current.setAttribute(
          'y',
          (Math.sin(t * 0.012) * 306 + 306).toFixed(1)
        )
      }

      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <img
        src="/portrait.jpg"
        alt="Moheb Emad — Sound Engineer"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center top',
          display: 'block',
        }}
      />

      {/* Overlay gradients */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: 'linear-gradient(to top, var(--void) 0%, rgba(2,2,2,0.18) 45%, rgba(2,2,2,0.04) 100%)',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: 'linear-gradient(to right, rgba(2,2,2,0.5) 0%, transparent 35%, transparent 65%, rgba(2,2,2,0.35) 100%)',
      }} />

      {/* SVG HUD layer */}
      <svg
        viewBox="0 0 460 612"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 3, pointerEvents: 'none' }}
        aria-hidden="true"
      >
        <g stroke="rgba(32,0,234,0.05)" strokeWidth="0.5">
          {[150, 200, 250].map((y) => (
            <line key={`hy${y}`} x1="0" y1={y} x2="460" y2={y} />
          ))}
          {[115, 230, 345].map((x) => (
            <line key={`hx${x}`} x1={x} y1="0" x2={x} y2="400" />
          ))}
        </g>
        <g opacity="0.5">
          <path ref={pwA} fill="rgba(32,0,234,0.22)" />
          <path ref={pwB} fill="rgba(158,146,231,0.10)" />
        </g>
        <text x="14" y="600" fontFamily="Space Mono,monospace" fontSize="7.5" fill="rgba(32,0,234,0.45)" letterSpacing="2">
          SND.ENG.v25
        </text>
        <rect ref={scanRef} x="0" width="460" height="1.5" fill="rgba(32,0,234,0.10)" y="0" />
      </svg>
    </div>
  )
}

function FloatingEQCard() {
  const heights = [22, 35, 50, 65, 80, 70, 55, 40, 28, 45, 62, 75, 58, 38, 24]
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden="true"
      style={{
        position: 'absolute',
        bottom: -24, left: -32,
        zIndex: 12,
        background: 'var(--surface)',
        border: '1px solid rgba(32,0,234,0.3)',
        backdropFilter: 'blur(20px)',
        borderRadius: 4,
        padding: '12px 16px',
        display: 'flex', flexDirection: 'column', gap: 8,
        boxShadow: '0 20px 60px rgba(0,0,0,0.25), 0 0 20px rgba(32,0,234,0.12)',
      }}
    >
      <div style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.5rem', letterSpacing: '0.2em', color: 'var(--blue)' }}>
        FREQUENCY RESPONSE
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 32 }}>
        {heights.map((h, i) => (
          <div
            key={i}
            className="eq-bar"
            style={{
              width: 5, height: h,
              borderRadius: '1px 1px 0 0',
              background: 'linear-gradient(to top, var(--blue), var(--lav))',
              animationDuration: `${0.6 + i * 0.1}s`,
              animationDelay: `${i * 0.06}s`,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

function FloatingDBCard() {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: -20, right: -28,
        zIndex: 12,
        background: 'var(--surface)',
        border: '1px solid rgba(158,146,231,0.25)',
        backdropFilter: 'blur(20px)',
        borderRadius: 4,
        padding: '10px 14px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
      }}
    >
      <div style={{ fontFamily: 'var(--ff-disp)', fontSize: '1.5rem', color: 'var(--lav)', lineHeight: 1 }}>
        +140 dB
      </div>
      <div style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.48rem', letterSpacing: '0.18em', color: 'var(--gray)', marginTop: 2 }}>
        PEAK LEVEL
      </div>
    </motion.div>
  )
}

const CONTAINER_VARIANTS = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
}

export default function Hero() {
  const ref = useRef(null)
  const scrollTo = useScrollTo()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const yLeft  = useTransform(scrollYProgress, [0, 1], [0, -80])
  const yRight = useTransform(scrollYProgress, [0, 1], [0, -40])

  // ✅ مش بيختفي — بس بيعمل fade خفيف جداً في آخر الـ scroll
  const opacity = useTransform(scrollYProgress, [0, 0.95], [1, 0.15])

  return (
    <section
      ref={ref}
      id="hero"
      aria-label="Introduction"
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        overflow: 'hidden',
        padding: '100px clamp(20px, 5vw, 64px) 60px',
        gap: 'clamp(40px, 5vw, 80px)',
        zIndex: 10,
      }}
      className="max-md:grid-cols-1 max-md:pb-24"
    >
      {/* Grid overlay */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      {/* ── Left column ── */}
      <motion.div
        style={{ y: yLeft, opacity, position: 'relative', zIndex: 10 }}
        variants={CONTAINER_VARIANTS}
        initial="hidden"
        animate="visible"
      >
        {/* Availability badge */}
        <motion.div variants={ITEM_VARIANTS}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '7px 18px', borderRadius: 40,
            border: '1px solid rgba(74,222,128,0.25)',
            background: 'rgba(74,222,128,0.06)',
            marginBottom: 40,
          }}>
            <span aria-hidden="true" style={{
              width: 7, height: 7, borderRadius: '50%',
              background: '#4ade80', position: 'relative',
              display: 'inline-block', flexShrink: 0,
            }}>
              <span style={{
                position: 'absolute', inset: -3, borderRadius: '50%',
                border: '1px solid rgba(74,222,128,0.4)',
                animation: 'ping-dot 2s ease-out infinite',
              }} />
            </span>
            <span style={{
              fontFamily: 'var(--ff-mono)', fontSize: '0.6rem',
              letterSpacing: '0.22em', color: '#4ade80',
            }}>
              Available for Projects
            </span>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p variants={ITEM_VARIANTS} style={{
          fontFamily: 'var(--ff-mono)', fontSize: '0.62rem',
          letterSpacing: '0.28em', textTransform: 'uppercase',
          color: 'var(--lav)', marginBottom: 18,
        }}>
          Audio Engineer · Sound Designer
        </motion.p>

        {/* Name */}
        <motion.h1 variants={ITEM_VARIANTS} style={{
          fontFamily: 'var(--ff-disp)',
          fontSize: 'clamp(4.5rem, 12vw, 11rem)',
          lineHeight: 0.86, letterSpacing: '0.02em', marginBottom: 32,
        }}>
          <span style={{ display: 'block', color: 'var(--white)' }}>MOHEB</span>
          <span style={{
            display: 'block',
            background: 'linear-gradient(100deg, #2000EA 0%, #9E92E7 50%, #2000EA 100%)',
            backgroundSize: '200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'shimmer 5s linear infinite',
          }}>
            EMAD
          </span>
        </motion.h1>

        {/* Divider line */}
        <motion.div variants={ITEM_VARIANTS} style={{
          display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24,
        }}>
          <div aria-hidden="true" style={{
            width: 44, height: 1,
            background: 'linear-gradient(90deg, var(--blue), transparent)',
            flexShrink: 0,
          }} />
          <span style={{
            fontFamily: 'var(--ff-mono)', fontSize: '0.65rem',
            letterSpacing: '0.25em', color: 'var(--lav)', textTransform: 'uppercase',
          }}>
            I shape what you feel
          </span>
        </motion.div>

        {/* Bio */}
        <motion.p variants={ITEM_VARIANTS} style={{
          fontFamily: 'var(--ff-body)', fontSize: '0.97rem',
          lineHeight: 1.82, color: 'var(--gray)',
          maxWidth: 420, marginBottom: 44,
        }}>
          Crafting immersive sound experiences for film, games, and media —
          where technical precision meets artistic vision.
        </motion.p>

        {/* CTA buttons */}
        <motion.div variants={ITEM_VARIANTS} style={{
          display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: 56,
        }}>
          <button
            className="btn-primary"
            onClick={() => scrollTo('projects')}
            aria-label="View my work"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="btn-arrow" aria-hidden="true">
              <polygon points="2,1 11,6.5 2,12" fill="white" />
            </svg>
            View My Work
          </button>

          {/* ✅ Contact Me — مربوط صح بالـ scrollTo */}
          <button
            className="btn-outline"
            onClick={() => scrollTo('Contact')}
            aria-label="Contact Moheb Emad"
          >
            Contact Me
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div variants={ITEM_VARIANTS} style={{
          display: 'flex', gap: 40, paddingTop: 32,
          borderTop: '1px solid var(--border)',
        }}>
          {[
            { n: '6+',   l: 'Years'     },
            { n: '500+', l: 'Projects'  },
            { n: '30',   l: 'Platforms' },
          ].map((stat) => (
            <div key={stat.l}>
              <div style={{
                fontFamily: 'var(--ff-disp)', fontSize: '2.6rem',
                color: 'var(--lav)', lineHeight: 1,
              }}>
                {stat.n}
              </div>
              <div style={{
                fontFamily: 'var(--ff-mono)', fontSize: '0.55rem',
                letterSpacing: '0.18em', color: 'var(--gray)', marginTop: 4,
              }}>
                {stat.l}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Right column: portrait ── */}
      <motion.div
        style={{
          y: yRight,
          position: 'relative',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 10,
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
      >
        <div style={{
          position: 'relative',
          width: 'clamp(260px, 38vw, 460px)',
          aspectRatio: '3/4',
        }}>
          {/* Glow pulse */}
          <motion.div
            aria-hidden="true"
            animate={{ scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', inset: '-8%', borderRadius: '50%',
              background: 'radial-gradient(ellipse at center, rgba(32,0,234,0.22) 0%, transparent 70%)',
            }}
          />

          {/* Spinning ring */}
          <div aria-hidden="true" style={{
            position: 'absolute', inset: '-6%', borderRadius: '50%',
            border: '1px solid rgba(32,0,234,0.2)',
            animation: 'spin-slow 25s linear infinite',
          }}>
            <div style={{
              position: 'absolute', top: -3, left: '50%',
              transform: 'translateX(-50%)',
              width: 6, height: 6, borderRadius: '50%',
              background: 'var(--blue)',
              boxShadow: '0 0 12px var(--blue)',
            }} />
          </div>

          {/* Dashed reverse ring */}
          <div aria-hidden="true" style={{
            position: 'absolute', inset: '-14%', borderRadius: '50%',
            border: '1px dashed rgba(158,146,231,0.1)',
            animation: 'spin-slow 40s linear infinite reverse',
          }} />

          {/* Pulse rings */}
          {[0, 1, 2].map((i) => (
            <div key={i} aria-hidden="true" style={{
              position: 'absolute', top: '50%', left: '50%',
              width: '160%', height: '160%', borderRadius: '50%',
              border: '1px solid rgba(32,0,234,0.4)',
              animation: `pulse-ring 3s ease-out ${i * 0.8}s infinite`,
            }} />
          ))}

          {/* Portrait frame */}
          <div style={{
            position: 'absolute', inset: 0,
            borderRadius: 4, overflow: 'hidden',
            border: '1px solid rgba(32,0,234,0.3)',
            boxShadow: '0 0 60px rgba(32,0,234,0.18), inset 0 0 40px rgba(2,2,2,0.7)',
          }}>
            <Portrait />
          </div>

          {/* Corner labels */}
          <div aria-hidden="true" style={{
            position: 'absolute', top: -10, left: 16, zIndex: 10,
            fontFamily: 'var(--ff-mono)', fontSize: '0.52rem',
            letterSpacing: '0.18em', color: 'rgba(32,0,234,0.7)',
            borderTop: '1px solid var(--blue)', borderLeft: '1px solid var(--blue)',
            padding: '5px 10px',
          }} />
          <div aria-hidden="true" style={{
            position: 'absolute', bottom: -10, right: 16, zIndex: 10,
            fontFamily: 'var(--ff-mono)', fontSize: '0.52rem',
            letterSpacing: '0.18em', color: 'rgba(32,0,234,0.7)',
            borderBottom: '1px solid var(--blue)', borderRight: '1px solid var(--blue)',
            padding: '5px 10px',
          }} />

          <FloatingEQCard />
          <FloatingDBCard />
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: 32, left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        }}
      >
        <span style={{
          fontFamily: 'var(--ff-mono)', fontSize: '0.52rem',
          letterSpacing: '0.3em', color: 'var(--gray)',
        }}>
          SCROLL
        </span>
        <div style={{
          width: 1, height: 40,
          background: 'var(--border)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0,
            width: '100%', height: '50%',
            background: 'linear-gradient(to bottom, var(--blue), transparent)',
            animation: 'scroll-flow 1.8s ease-in-out infinite',
          }} />
        </div>
      </motion.div>
    </section>
  )
}