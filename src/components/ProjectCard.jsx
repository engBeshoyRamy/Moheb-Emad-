import { motion } from 'framer-motion'
import { useMemo } from 'react'

function ProjectThumbnail({ project }) {
  const colorMap = {
    'TV / Drama':    ['#1a00c8', '#9E92E7', '#2000EA'],
    'Podcast':       ['#5030bb', '#9E92E7', '#7b5ea7'],
    'Sound Design':  ['#0f00a0', '#2000EA', '#4030cc'],
    'Game Audio':    ['#6030cc', '#9E92E7', '#8855ff'],
  }
  const [c1, c2, c3] = colorMap[project.category] || ['#2000EA', '#9E92E7', '#1a00c8']
  const seed = project.id.charCodeAt(1) + project.id.charCodeAt(0)

  const bars = useMemo(() =>
    Array.from({ length: 38 }, (_, i) => ({
      h: Math.max(6, 88 * Math.abs(
        Math.sin(i * 0.65 + seed * 0.28) * 0.65 +
        Math.sin(i * 0.21 + seed * 0.15) * 0.25 +
        Math.cos(i * 0.44 + seed * 0.1) * 0.1
      )),
      x: i * 11 + 4,
      fill: i % 4 === 0 ? c1 : i % 4 === 1 ? c2 : i % 4 === 2 ? c3 : 'rgba(255,255,255,0.08)',
      opacity: 0.35 + Math.abs(Math.sin(i * 0.38 + seed)) * 0.65,
    }))
  , [c1, c2, c3, seed])

  const glowBars = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      h: Math.max(4, 50 * Math.abs(Math.sin(i * 1.1 + seed * 0.5))),
      x: i * 32 + 8,
    }))
  , [seed])

  return (
    <svg
      viewBox="0 0 420 140"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`ptg-${project.id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="100%" stopColor={c1} stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id={`ptg-h-${project.id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={c1} stopOpacity="0.08" />
          <stop offset="50%" stopColor={c2} stopOpacity="0.04" />
          <stop offset="100%" stopColor={c3} stopOpacity="0.08" />
        </linearGradient>
        <radialGradient id={`ptg-r-${project.id}`} cx="50%" cy="100%" r="60%">
          <stop offset="0%" stopColor={c1} stopOpacity="0.22" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id={`blur-${project.id}`}>
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {/* bg — uses currentColor trick via rect fill transparent so parent bg shows */}
      <rect width="420" height="140" fill="transparent" />
      <rect width="420" height="140" fill={`url(#ptg-h-${project.id})`} />
      <rect width="420" height="140" fill={`url(#ptg-r-${project.id})`} />

      {/* blurred glow bars */}
      {glowBars.map(({ h, x }, i) => (
        <rect
          key={i}
          x={x}
          y={138 - h}
          width={22}
          height={h}
          rx="2"
          fill={i % 2 === 0 ? c1 : c2}
          opacity={0.12}
          filter={`url(#blur-${project.id})`}
        />
      ))}

      {/* main bars */}
      {bars.map(({ h, x, fill, opacity }, i) => (
        <rect
          key={i}
          x={x}
          y={138 - h}
          width={9}
          height={h}
          rx="1.5"
          fill={fill}
          opacity={opacity}
        />
      ))}

      {/* scanlines */}
      {Array.from({ length: 7 }, (_, i) => (
        <line
          key={i}
          x1="0" y1={i * 20 + 10}
          x2="420" y2={i * 20 + 10}
          stroke="rgba(255,255,255,0.012)"
          strokeWidth="1"
        />
      ))}

      <rect width="420" height="140" fill={`url(#ptg-${project.id})`} />

      <text x="12" y="17" fontFamily="Space Mono,monospace" fontSize="7" fill={c2} opacity="0.5" letterSpacing="2.5">
        {project.type?.toUpperCase()}
      </text>
      <text x="12" y="28" fontFamily="Space Mono,monospace" fontSize="7" fill={c1} opacity="0.45" letterSpacing="2">
        {project.year}
      </text>

      <path d="M400 8 L412 8 L412 20" stroke={c1} strokeWidth="1.2" fill="none" opacity="0.4" />
      <path d="M400 132 L412 132 L412 120" stroke={c1} strokeWidth="1.2" fill="none" opacity="0.4" />
    </svg>
  )
}

const categoryIcons = {
  'TV / Drama':   '◈',
  'Podcast':      '◎',
  'Sound Design': '◇',
  'Game Audio':   '▸',
}

export default function ProjectCard({ project, index, onClick }) {
  const icon = categoryIcons[project.category] || '◆'
  const hasAudio = !!project.audioUrl

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.75, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 6,
        overflow: 'hidden',
        cursor: 'pointer',
        position: 'relative',
      }}
      whileHover={{
        borderColor: 'rgba(32,0,234,0.6)',
        y: -10,
        boxShadow: '0 40px 100px rgba(0,0,0,0.3), 0 0 60px rgba(32,0,234,0.18)',
      }}
      whileTap={{ y: -5, scale: 1.005 }}
      onClick={() => onClick(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(project) } }}
      aria-label={`View project: ${project.title}`}
    >
      {/* Thumbnail */}
      <div style={{
        width: '100%',
        aspectRatio: '16/9',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--surface)',
      }}>
        <ProjectThumbnail project={project} />

        {/* Bottom gradient — fades into card background */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 25%, var(--surface) 100%)',
          zIndex: 2,
        }} />

        {/* Hover veil */}
        <motion.div
          style={{
            position: 'absolute', inset: 0, zIndex: 3,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 10,
            backdropFilter: 'blur(4px)',
          }}
          initial={{ opacity: 0, background: 'rgba(32,0,234,0.0)' }}
          whileHover={{ opacity: 1, background: 'rgba(32,0,234,0.15)' }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            style={{
              padding: '10px 26px',
              border: '1px solid rgba(255,255,255,0.55)',
              borderRadius: 2,
              fontFamily: 'var(--ff-mono)',
              fontSize: '0.62rem',
              letterSpacing: '0.22em',
              color: 'var(--text-pri)',
              background: 'rgba(32,0,234,0.25)',
            }}
          >
            OPEN PROJECT
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            style={{
              fontFamily: 'var(--ff-mono)',
              fontSize: '0.5rem',
              letterSpacing: '0.18em',
              color: 'var(--lav)',
            }}
          >
            {hasAudio ? '▶ AUDIO PREVIEW AVAILABLE' : '⟶ VIEW DETAILS'}
          </motion.div>
        </motion.div>
      </div>

      {/* Card body */}
      <div style={{ padding: '20px 22px 22px', background: 'var(--surface)' }}>
        {/* Category + audio badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 11px', borderRadius: 2,
            fontFamily: 'var(--ff-mono)', fontSize: '0.5rem', letterSpacing: '0.15em', color: '#fff',
            background: project.color || '#1a00c8',
          }}>
            <span style={{ opacity: 0.8 }}>{icon}</span>
            {project.category}
          </span>

          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '3px 9px', borderRadius: 20,
            fontFamily: 'var(--ff-mono)', fontSize: '0.46rem', letterSpacing: '0.14em',
            color: hasAudio ? 'var(--lav)' : 'var(--gray)',
            border: `1px solid ${hasAudio ? 'rgba(158,146,231,0.3)' : 'var(--border)'}`,
            background: hasAudio ? 'rgba(158,146,231,0.07)' : 'transparent',
          }}>
            {hasAudio ? (
              <><span style={{ fontSize: '0.55rem' }}>▶</span>AUDIO</>
            ) : (
              <><span style={{ fontSize: '0.55rem' }}>⟶</span>DETAILS</>
            )}
          </span>
        </div>

        {/* Title */}
        <div style={{
          fontFamily: 'var(--ff-disp)',
          fontSize: 'clamp(1.15rem, 2vw, 1.42rem)',
          letterSpacing: '0.04em',
          color: 'var(--white)',
          marginBottom: 9,
          lineHeight: 1.05,
        }}>
          {project.title}
        </div>

        {/* Short desc */}
        <p style={{
          fontSize: '0.78rem',
          lineHeight: 1.7,
          color: 'var(--gray)',
          marginBottom: 16,
        }}>
          {project.shortDesc}
        </p>

        {/* Footer row */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingTop: 14,
          borderTop: '1px solid var(--border)',
        }}>
          <div style={{
            fontFamily: 'var(--ff-mono)', fontSize: '0.47rem',
            letterSpacing: '0.1em', color: 'var(--gray)',
            opacity: 0.6,
          }}>
            {project.tags.slice(0, 3).join(' · ')}
          </div>

          <motion.div
            style={{
              width: 32, height: 32, borderRadius: '50%',
              border: '1px solid rgba(32,0,234,0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--blue)', fontSize: '0.8rem', flexShrink: 0,
            }}
            whileHover={{ background: 'var(--blue)', color: '#fff', rotate: -45, scale: 1.1 }}
            transition={{ duration: 0.28 }}
            aria-hidden="true"
          >
            →
          </motion.div>
        </div>
      </div>

      {/* Left edge accent */}
      <motion.div
        style={{
          position: 'absolute', left: 0, top: '20%', bottom: '20%',
          width: 2, borderRadius: 1,
          background: `linear-gradient(to bottom, transparent, ${project.color || '#2000EA'}, transparent)`,
          opacity: 0,
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        aria-hidden="true"
      />
    </motion.article>
  )
}