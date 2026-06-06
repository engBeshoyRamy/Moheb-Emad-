import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function generateWaveformBars(seed, count) {
  return Array.from({ length: count }, (_, i) => ({
    h: Math.max(8, 100 * Math.abs(
      Math.sin(i * 0.47 + seed * 0.31) * 0.55 +
      Math.sin(i * 0.19 + seed * 0.12) * 0.28 +
      Math.cos(i * 0.61 + seed * 0.22) * 0.17
    )),
    peak: Math.max(12, 100 * Math.abs(Math.sin(i * 0.38 + seed * 0.44))),
  }))
}

function generateVUHeights(seed) {
  return Array.from({ length: 28 }, (_, i) => (
    30 + 65 * Math.abs(Math.sin(i * 0.72 + seed * 0.19))
  ))
}

function ModalAudioPlayer({ project }) {
  const audioRef = useRef(null)
  const intervalRef = useRef(null)
  const seed = useMemo(() => project.id.charCodeAt(0) + project.id.charCodeAt(1), [project.id])
  const waveformBars = useMemo(() => generateWaveformBars(seed, 80), [seed])
  const vuHeights = useMemo(() => generateVUHeights(seed), [seed])

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isLooping, setIsLooping] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [vuTick, setVuTick] = useState(0)

  useEffect(() => {
    const audio = new Audio(project.audioUrl)
    audio.loop = isLooping
    audio.preload = 'metadata'
    audioRef.current = audio

    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration)
      setIsLoaded(true)
    })
    audio.addEventListener('timeupdate', () => setCurrentTime(audio.currentTime))
    audio.addEventListener('ended', () => {
      if (!isLooping) setIsPlaying(false)
    })

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [project.audioUrl]) // eslint-disable-line

  useEffect(() => {
    if (audioRef.current) audioRef.current.loop = isLooping
  }, [isLooping])

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => setVuTick(t => t + 1), 120)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [isPlaying])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) { audio.pause(); setIsPlaying(false) }
    else { audio.play(); setIsPlaying(true) }
  }, [isPlaying])

  const seek = useCallback((e) => {
    const audio = audioRef.current
    if (!audio || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    audio.currentTime = ratio * duration
    setCurrentTime(ratio * duration)
  }, [duration])

  const fmt = (s) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  const progress = duration ? currentTime / duration : 0

  return (
    <div style={{
      background: 'var(--surface2)',
      border: '1px solid rgba(32,0,234,0.25)',
      borderRadius: 8,
      padding: '20px 22px',
      marginTop: 28,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 6, height: 6, borderRadius: '50%',
            background: isPlaying ? '#00ff88' : 'var(--gray)',
            boxShadow: isPlaying ? '0 0 10px #00ff88' : 'none',
            transition: 'all 0.3s',
          }} />
          <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.55rem', letterSpacing: '0.2em', color: 'var(--gray)' }}>
            AUDIO PREVIEW
          </span>
        </div>
        <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.5rem', color: 'var(--gray)', letterSpacing: '0.12em', opacity: 0.5 }}>
          44.1kHz · 24-bit
        </span>
      </div>

      <div
        onClick={seek}
        style={{
          position: 'relative', height: 64, cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 1.5,
          marginBottom: 12, userSelect: 'none',
        }}
      >
        {waveformBars.map(({ h }, i) => {
          const barProgress = i / waveformBars.length
          const isPast = barProgress <= progress
          return (
            <div
              key={i}
              style={{
                flex: 1, borderRadius: 2,
                height: `${h * 0.64}%`,
                background: isPast
                  ? 'linear-gradient(to top, var(--blue), var(--lav))'
                  : 'var(--border)',
                transition: 'background 0.1s',
                opacity: isPast ? 0.9 : 0.5,
              }}
            />
          )
        })}
        <div style={{
          position: 'absolute', top: 0, bottom: 0,
          left: `${progress * 100}%`,
          width: 2, background: 'var(--white)',
          boxShadow: '0 0 8px rgba(255,255,255,0.5)',
          pointerEvents: 'none',
          transition: 'left 0.1s linear',
        }} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.52rem', color: 'var(--gray)', letterSpacing: '0.1em' }}>
          {fmt(currentTime)} / {isLoaded ? fmt(duration) : '--:--'}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button
            onClick={() => setIsLooping(l => !l)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: isLooping ? 'var(--lav)' : 'var(--gray)',
              fontSize: '0.7rem', padding: 4,
              transition: 'color 0.2s',
            }}
            aria-label="Toggle loop"
          >⟳</button>
          <motion.button
            onClick={togglePlay}
            style={{
              width: 42, height: 42, borderRadius: '50%',
              background: isPlaying
                ? 'linear-gradient(135deg, var(--blue), var(--lav))'
                : 'rgba(32,0,234,0.15)',
              border: '1px solid rgba(32,0,234,0.5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#fff', fontSize: '0.85rem',
            }}
            whileHover={{ scale: 1.08, boxShadow: '0 0 20px rgba(32,0,234,0.5)' }}
            whileTap={{ scale: 0.94 }}
          >
            {isPlaying ? '⏸' : '▶'}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden', marginTop: 16 }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 28 }}>
              {vuHeights.map((baseH, i) => {
                const animated = baseH * (0.5 + 0.5 * Math.abs(Math.sin(vuTick * 0.6 + i * 0.4)))
                const pct = animated / 100
                const color = pct > 0.82 ? '#ff4444' : pct > 0.6 ? '#ffcc00' : 'var(--blue)'
                return (
                  <div
                    key={i}
                    style={{
                      flex: 1, borderRadius: 1,
                      height: `${Math.min(100, animated)}%`,
                      background: color, opacity: 0.75,
                      transition: 'height 0.1s ease, background 0.1s',
                    }}
                  />
                )
              })}
            </div>
            <div style={{
              fontFamily: 'var(--ff-mono)', fontSize: '0.42rem',
              color: 'var(--gray)', letterSpacing: '0.15em', opacity: 0.4,
              marginTop: 5, textAlign: 'center',
            }}>
              VU METERS — L/R
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ProjectWaveform({ project }) {
  const seed = project.id.charCodeAt(0) + project.id.charCodeAt(1)
  const colorMap = {
    'TV / Drama':   ['#1a00c8', '#9E92E7', '#2000EA'],
    'Podcast':      ['#5030bb', '#9E92E7', '#7b5ea7'],
    'Sound Design': ['#0f00a0', '#2000EA', '#4030cc'],
    'Game Audio':   ['#6030cc', '#9E92E7', '#8855ff'],
  }
  const [c1, c2, c3] = colorMap[project.category] || ['#2000EA', '#9E92E7', '#1a00c8']

  const bars = useMemo(() => Array.from({ length: 60 }, (_, i) => ({
    h: Math.max(5, 90 * Math.abs(
      Math.sin(i * 0.52 + seed * 0.28) * 0.6 +
      Math.sin(i * 0.18 + seed * 0.14) * 0.27 +
      Math.cos(i * 0.39 + seed * 0.09) * 0.13
    )),
    x: i * 14 + 8,
    fill: i % 3 === 0 ? c1 : i % 3 === 1 ? c2 : c3,
    opacity: 0.3 + 0.65 * Math.abs(Math.sin(i * 0.41 + seed)),
  })), [c1, c2, c3, seed])

  return (
    <svg viewBox="0 0 860 120" style={{ width: '100%', height: 120 }} aria-hidden="true">
      <defs>
        <linearGradient id={`mwg-${project.id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={c1} stopOpacity="0.0" />
          <stop offset="15%" stopColor={c1} stopOpacity="1" />
          <stop offset="85%" stopColor={c3} stopOpacity="1" />
          <stop offset="100%" stopColor={c3} stopOpacity="0.0" />
        </linearGradient>
        <mask id={`mwm-${project.id}`}>
          <rect width="860" height="120" fill={`url(#mwg-${project.id})`} />
        </mask>
        <filter id={`mwf-${project.id}`}>
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
      </defs>
      <g mask={`url(#mwm-${project.id})`} filter={`url(#mwf-${project.id})`} opacity="0.4">
        {bars.map(({ h, x, fill }, i) => (
          <rect key={i} x={x - 1} y={60 - h / 2 - 4} width={12} height={h + 8} rx="3" fill={fill} opacity="0.6" />
        ))}
      </g>
      <g mask={`url(#mwm-${project.id})`}>
        {bars.map(({ h, x, fill, opacity }, i) => (
          <g key={i}>
            <rect x={x} y={60 - h / 2} width={9} height={h / 2} rx="1.5" fill={fill} opacity={opacity} />
            <rect x={x} y={60} width={9} height={h / 2} rx="1.5" fill={fill} opacity={opacity * 0.45} />
          </g>
        ))}
      </g>
      <line x1="0" y1="60" x2="860" y2="60" stroke="var(--border)" strokeWidth="1" />
    </svg>
  )
}

const CAT_ICON = {
  'TV / Drama':   '◈',
  'Podcast':      '◎',
  'Sound Design': '◇',
  'Game Audio':   '▸',
}

export default function ProjectModal({ project, onClose, onNavigate, allProjects }) {
  const scrollRef = useRef(null)
  const hasAudio = !!project.audioUrl
  const hasLink = !!project.projectUrl

  const currentIndex = useMemo(
    () => allProjects.findIndex(p => p.id === project.id),
    [allProjects, project.id]
  )
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && prevProject) onNavigate(prevProject)
      if (e.key === 'ArrowRight' && nextProject) onNavigate(nextProject)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, onNavigate, prevProject, nextProject])

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }, [project.id])

  const icon = CAT_ICON[project.category] || '◆'

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .modal-content-grid {
            grid-template-columns: 1fr !important;
          }
          .modal-top-bar {
            padding: 12px 16px 10px !important;
          }
          .modal-nav-btn span {
            display: none;
          }
          .modal-scrollable {
            padding: 20px 16px !important;
          }
          .modal-title {
            font-size: clamp(2rem, 10vw, 3rem) !important;
          }
          .modal-meta-row {
            gap: 10px 20px !important;
          }
        }
      `}</style>

      {/* Backdrop */}
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 900,
          background: 'rgba(2,2,2,0.75)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
        }}
      />

      {/* Drawer panel */}
      <motion.div
        key="modal-panel"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 32, stiffness: 280, mass: 0.9 }}
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          zIndex: 901,
          height: '92vh',
          background: 'var(--surface)',
          borderTop: '1px solid rgba(32,0,234,0.35)',
          borderRadius: '18px 18px 0 0',
          boxShadow: '0 -40px 120px rgba(0,0,0,0.4), 0 -2px 0 rgba(32,0,234,0.4)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Top bar */}
        <div
          className="modal-top-bar"
          style={{
            flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 28px 12px',
            borderBottom: '1px solid var(--border)',
            background: 'var(--surface2)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 3, borderRadius: 2, background: 'var(--border)' }} />
            <span style={{
              fontFamily: 'var(--ff-mono)', fontSize: '0.52rem',
              letterSpacing: '0.22em', color: 'var(--gray)',
            }}>
              PROJECT DETAIL
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <motion.button
              onClick={() => prevProject && onNavigate(prevProject)}
              disabled={!prevProject}
              className="modal-nav-btn"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: 4, padding: '6px 12px',
                fontFamily: 'var(--ff-mono)', fontSize: '0.5rem',
                letterSpacing: '0.12em',
                color: prevProject ? 'var(--gray)' : 'var(--border)',
                cursor: prevProject ? 'pointer' : 'default',
                display: 'flex', alignItems: 'center', gap: 4,
              }}
              whileHover={prevProject ? { borderColor: 'rgba(32,0,234,0.4)', color: 'var(--lav)' } : {}}
              whileTap={prevProject ? { scale: 0.95 } : {}}
            >
              ← <span>PREV</span>
            </motion.button>

            <motion.button
              onClick={() => nextProject && onNavigate(nextProject)}
              disabled={!nextProject}
              className="modal-nav-btn"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: 4, padding: '6px 12px',
                fontFamily: 'var(--ff-mono)', fontSize: '0.5rem',
                letterSpacing: '0.12em',
                color: nextProject ? 'var(--gray)' : 'var(--border)',
                cursor: nextProject ? 'pointer' : 'default',
                display: 'flex', alignItems: 'center', gap: 4,
              }}
              whileHover={nextProject ? { borderColor: 'rgba(32,0,234,0.4)', color: 'var(--lav)' } : {}}
              whileTap={nextProject ? { scale: 0.95 } : {}}
            >
              <span>NEXT</span> →
            </motion.button>

            <motion.button
              onClick={onClose}
              style={{
                width: 34, height: 34, borderRadius: 4,
                background: 'var(--card)',
                border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--gray)', fontSize: '1rem', cursor: 'pointer',
                marginLeft: 6,
              }}
              whileHover={{ background: 'rgba(220,40,40,0.15)', borderColor: 'rgba(220,40,40,0.4)', color: 'var(--white)' }}
              whileTap={{ scale: 0.92 }}
              aria-label="Close"
            >
              ✕
            </motion.button>
          </div>
        </div>

        {/* Scrollable content */}
        <div
          ref={scrollRef}
          className="modal-scrollable"
          style={{
            flex: 1, overflowY: 'auto',
            padding: 'clamp(24px, 4vw, 52px) clamp(20px, 6vw, 80px)',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(32,0,234,0.25) transparent',
            background: 'var(--surface)',
          }}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ maxWidth: 900, margin: '0 auto' }}
          >
            {/* Category badge */}
            <motion.div variants={itemVariants} style={{ marginBottom: 18 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '5px 14px', borderRadius: 3,
                fontFamily: 'var(--ff-mono)', fontSize: '0.52rem', letterSpacing: '0.16em',
                color: '#fff', background: project.color || '#1a00c8',
              }}>
                <span>{icon}</span>
                {project.category}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className="modal-title"
              style={{
                fontFamily: 'var(--ff-disp)',
                fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
                lineHeight: 0.92, letterSpacing: '0.02em',
                color: 'var(--white)', marginBottom: 28,
              }}
            >
              {project.title}
            </motion.h1>

            {/* Meta row */}
            <motion.div
              variants={itemVariants}
              className="modal-meta-row"
              style={{
                display: 'flex', flexWrap: 'wrap', gap: '10px 32px',
                marginBottom: 36,
                paddingBottom: 28,
                borderBottom: '1px solid var(--border)',
              }}
            >
              {[
                { label: 'YEAR', val: project.year },
                { label: 'FORMAT', val: project.duration },
                { label: 'TYPE', val: project.type },
                { label: 'TOOLS', val: project.tools },
              ].map(({ label, val }) => (
                <div key={label}>
                  <div style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.45rem', letterSpacing: '0.2em', color: 'var(--blue)', marginBottom: 4 }}>
                    {label}
                  </div>
                  <div style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.65rem', color: 'var(--white)', letterSpacing: '0.06em' }}>
                    {val}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Waveform visual */}
            <motion.div variants={itemVariants} style={{
              marginBottom: 36,
              padding: '24px 0 8px',
              borderBottom: '1px solid var(--border)',
            }}>
              <ProjectWaveform project={project} />
            </motion.div>

            {/* Two-column layout — 1 col on mobile */}
            <motion.div
              variants={itemVariants}
              className="modal-content-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 260px',
                gap: 40,
                marginBottom: 32,
              }}
            >
              {/* Description */}
              <div>
                <p style={{
                  fontSize: 'clamp(0.88rem, 1.5vw, 1rem)',
                  lineHeight: 1.85,
                  color: 'var(--text-sec)',
                  marginBottom: 28,
                }}>
                  {project.fullDesc}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {project.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      style={{
                        padding: '5px 13px', borderRadius: 3,
                        fontFamily: 'var(--ff-mono)', fontSize: '0.5rem', letterSpacing: '0.14em',
                        color: 'var(--lav)',
                        border: '1px solid rgba(158,146,231,0.2)',
                        background: 'rgba(158,146,231,0.05)',
                      }}
                      whileHover={{
                        background: 'rgba(158,146,231,0.12)',
                        borderColor: 'rgba(158,146,231,0.45)',
                        color: 'var(--white)',
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div>
                {hasLink && (
                  <motion.a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '14px 18px',
                      background: 'rgba(32,0,234,0.08)',
                      border: '1px solid rgba(32,0,234,0.25)',
                      borderRadius: 6, marginBottom: 12,
                      textDecoration: 'none', cursor: 'pointer',
                    }}
                    whileHover={{
                      background: 'rgba(32,0,234,0.15)',
                      borderColor: 'rgba(32,0,234,0.6)',
                      boxShadow: '0 0 24px rgba(32,0,234,0.2)',
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div>
                      <div style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.5rem', letterSpacing: '0.18em', color: 'var(--blue)', marginBottom: 4 }}>
                        VIEW PROJECT
                      </div>
                      <div style={{ fontFamily: 'var(--ff-body)', fontSize: '0.75rem', color: 'var(--white)' }}>
                        Open External Link ↗
                      </div>
                    </div>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%',
                      border: '1px solid rgba(32,0,234,0.4)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--blue)', fontSize: '1rem', flexShrink: 0,
                    }}>
                      ↗
                    </div>
                  </motion.a>
                )}

                {!hasLink && !hasAudio && (
                  <div style={{
                    padding: '14px 18px',
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: 6,
                    fontFamily: 'var(--ff-mono)', fontSize: '0.52rem',
                    color: 'var(--gray)', letterSpacing: '0.12em', lineHeight: 1.7,
                  }}>
                    DETAILS ONLY<br />
                    <span style={{ color: 'var(--gray)', fontSize: '0.44rem', opacity: 0.5 }}>
                      No external link or audio available for this project.
                    </span>
                  </div>
                )}

                <div style={{
                  padding: '16px 18px',
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: 6,
                  marginTop: hasLink ? 12 : 0,
                }}>
                  <div style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.44rem', letterSpacing: '0.2em', color: 'var(--gray)', marginBottom: 14, opacity: 0.6 }}>
                    PROJECT INFO
                  </div>
                  {[
                    { k: 'Category', v: project.category },
                    { k: 'Year', v: project.year },
                    { k: 'Duration', v: project.duration },
                    { k: 'Type', v: project.type },
                  ].map(({ k, v }) => (
                    <div key={k} style={{
                      display: 'flex', justifyContent: 'space-between',
                      padding: '8px 0',
                      borderBottom: '1px solid var(--border)',
                    }}>
                      <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.48rem', color: 'var(--gray)', letterSpacing: '0.1em' }}>{k}</span>
                      <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.48rem', color: 'var(--white)', letterSpacing: '0.06em' }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Audio Player */}
            {hasAudio && (
              <motion.div variants={itemVariants}>
                <ModalAudioPlayer project={project} />
              </motion.div>
            )}

            <div style={{ height: 48 }} />
          </motion.div>
        </div>

        {/* Bottom glow bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, transparent, ${project.color || '#2000EA'}, var(--lav), transparent)`,
          opacity: 0.6,
          pointerEvents: 'none',
        }} />
      </motion.div>
    </>
  )
}