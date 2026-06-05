import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = '201277335115'
const CONTACT_EMAIL  = 'mohebetadros@gmail.com'

const SOCIALS = [
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@mohebemad',
    color: '#FF0000',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M23.5 6.5s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.8 2.2 12 2.2 12 2.2s-4.8 0-7.3.2c-.6.1-1.9.1-3 1.3C.8 4.5.5 6.5.5 6.5S.2 8.8.2 11.1v2.2c0 2.3.3 4.6.3 4.6s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.2 22 12 22 12 22s4.8 0 7.3-.3c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.3.3-4.6v-2.2c0-2.3-.3-4.6-.3-4.6zM9.7 15.5V8.4l8.1 3.6-8.1 3.5z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/mohebtadroos/',
    color: '#1877F2',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.49h-2.79V24C19.62 23.1 24 18.1 24 12.07z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/e.tadroos',
    color: '#E1306C',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: 'elCinema',
    href: 'https://elcinema.com/person/2321112/',
    color: '#E8A020',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18 3H6a3 3 0 00-3 3v12a3 3 0 003 3h12a3 3 0 003-3V6a3 3 0 00-3-3zM8 17H5v-2h3v2zm0-4H5v-2h3v2zm0-4H5V7h3v2zm10 8H9V7h9v10zm-3-8h-5V8h5v1zm0 3h-5v-1h5v1zm0 3h-5v-1h5v1z" />
      </svg>
    ),
  },
  {
    name: 'IMDb',
    href: 'https://www.imdb.com/name/nm16687397/',
    color: '#F5C518',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M14.31 9.588v.005c-.077-.048-.227-.07-.42-.07v4.815c.27 0 .44-.06.5-.165.062-.104.095-.405.095-.885V10.5c0-.42-.022-.694-.07-.8a.347.347 0 00-.105-.112zM22 4H2a2 2 0 00-2 2v12a2 2 0 002 2h20a2 2 0 002-2V6a2 2 0 00-2-2zM5.84 15.82H4V8.18h1.84v7.64zm5.84 0H10.1v-5.09l-.72 5.09H8.22l-.75-4.97v4.97H5.9V8.18h2.17c.21 1.13.4 2.43.58 3.91.14-1.09.36-2.39.64-3.91h2.35v7.64zm4.96-1.7c0 .57-.04.99-.12 1.26-.08.27-.22.48-.41.62-.2.14-.43.22-.72.26-.28.04-.7.06-1.25.06H12.7V8.18h1.62c.52 0 .92.03 1.19.1.28.06.5.18.67.35.17.17.28.38.34.63.06.26.08.67.08 1.24v3.57zm3.73.05c0 .43-.08.74-.23.93-.15.19-.4.28-.73.28-.3 0-.54-.1-.72-.3-.18-.2-.27-.5-.27-.91v-3.2c0-.4.09-.68.27-.88.18-.2.42-.3.73-.3.33 0 .57.1.72.3.15.2.23.5.23.9v3.18z"/>
      </svg>
    ),
  },
]

// ─── WAVEFORM BARS ────────────────────────────────────────────────────────────
function WaveformBars({ active = false, count = 28 }) {
  const heights = Array.from({ length: count }, (_, i) => {
    const center = count / 2
    const dist = Math.abs(i - center) / center
    return 0.3 + (1 - dist) * 0.7
  })
  return (
    <div aria-hidden style={{ display: 'flex', alignItems: 'center', gap: 3, height: 40, opacity: active ? 1 : 0.25, transition: 'opacity 0.4s' }}>
      {heights.map((h, i) => (
        <motion.div
          key={i}
          style={{
            width: 2, borderRadius: 1,
            background: active ? `rgba(32,0,234,${0.5 + h * 0.5})` : 'rgba(32,0,234,0.4)',
            transformOrigin: 'center',
          }}
          animate={active ? { height: [h * 36, h * 14, h * 40, h * 22, h * 36] } : { height: h * 20 }}
          transition={active
            ? { duration: 1.2 + (i % 5) * 0.18, repeat: Infinity, ease: 'easeInOut', delay: (i % 7) * 0.07 }
            : { duration: 0.4 }}
        />
      ))}
    </div>
  )
}

// ─── FLOATING LABEL FIELD ─────────────────────────────────────────────────────
function FloatingField({ id, label, type = 'text', multiline = false, value, onChange, onBlur, error, required, rows = 5 }) {
  const [focused, setFocused] = useState(false)
  const lifted = focused || value.length > 0

  const sharedStyle = {
    width: '100%',
    background: focused ? 'rgba(32,0,234,0.06)' : 'var(--card)',
    border: error
      ? '1px solid rgba(255,80,80,0.6)'
      : focused
      ? '1px solid rgba(32,0,234,0.7)'
      : '1px solid var(--border)',
    borderRadius: 6,
    padding: multiline ? '28px 18px 14px' : '26px 18px 10px',
    color: 'var(--white)',
    fontFamily: 'var(--ff-body)',
    fontSize: '0.92rem',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.25s, background 0.25s, box-shadow 0.25s',
    boxShadow: focused
      ? error
        ? '0 0 0 3px rgba(255,80,80,0.1)'
        : '0 0 0 3px rgba(32,0,234,0.1), 0 0 20px rgba(32,0,234,0.06)'
      : 'none',
    resize: multiline ? 'vertical' : 'none',
    lineHeight: 1.7,
  }

  const labelStyle = {
    position: 'absolute',
    left: 18,
    top: lifted ? (multiline ? 10 : 9) : multiline ? '18px' : '50%',
    transform: lifted ? 'none' : multiline ? 'none' : 'translateY(-50%)',
    fontFamily: lifted ? 'var(--ff-mono)' : 'var(--ff-body)',
    fontSize: lifted ? '0.52rem' : '0.88rem',
    letterSpacing: lifted ? '0.22em' : 0,
    textTransform: lifted ? 'uppercase' : 'none',
    color: error
      ? 'rgba(255,100,100,0.9)'
      : lifted
      ? focused ? 'rgba(32,0,234,0.9)' : 'var(--lav)'
      : 'var(--gray)',
    pointerEvents: 'none',
    transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
    whiteSpace: 'nowrap',
  }

  return (
    <div style={{ position: 'relative', marginBottom: error ? 6 : 20 }}>
      {multiline ? (
        <textarea
          id={id} rows={rows} value={value} onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={(e) => { setFocused(false); onBlur?.(e) }}
          required={required} style={sharedStyle}
          aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined}
        />
      ) : (
        <input
          id={id} type={type} value={value} onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={(e) => { setFocused(false); onBlur?.(e) }}
          required={required} style={sharedStyle}
          aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined}
        />
      )}
      <label htmlFor={id} style={labelStyle}>{label}</label>
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-err`} role="alert"
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.58rem', letterSpacing: '0.1em', color: 'rgba(255,100,100,0.9)', margin: '5px 0 14px 4px' }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── SUCCESS STATE ────────────────────────────────────────────────────────────
function SuccessState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      style={{ textAlign: 'center', padding: '48px 0' }}
    >
      <motion.div
        style={{
          width: 72, height: 72, borderRadius: '50%',
          background: 'rgba(34,197,94,0.1)',
          border: '1.5px solid rgba(34,197,94,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px',
        }}
        animate={{ boxShadow: ['0 0 0 0 rgba(34,197,94,0)', '0 0 0 14px rgba(34,197,94,0.08)', '0 0 0 0 rgba(34,197,94,0)'] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
          <motion.path
            d="M6 14L11 19L22 8" stroke="rgba(34,197,94,0.9)" strokeWidth="2.2"
            strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          />
        </svg>
      </motion.div>
      <p style={{ fontFamily: 'var(--ff-disp)', fontSize: '1.4rem', color: 'var(--white)', marginBottom: 8 }}>
        Opening WhatsApp…
      </p>
      <p style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.62rem', letterSpacing: '0.18em', color: 'var(--gray)' }}>
        YOUR MESSAGE IS PRE-FILLED AND READY
      </p>
    </motion.div>
  )
}

// ─── SENDING STATE ────────────────────────────────────────────────────────────
function SendingState() {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      style={{ textAlign: 'center', padding: '48px 0' }}
    >
      <WaveformBars active count={20} />
      <p style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.6rem', letterSpacing: '0.26em', color: 'rgba(32,0,234,0.7)', marginTop: 16, textTransform: 'uppercase' }}>
        Preparing Message...
      </p>
    </motion.div>
  )
}

// ─── AVAILABILITY BADGE ───────────────────────────────────────────────────────
function AvailabilityBadge() {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      background: 'rgba(34,197,94,0.08)',
      border: '1px solid rgba(34,197,94,0.2)',
      borderRadius: 20, padding: '6px 14px', marginBottom: 28,
    }}>
      <motion.div
        style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(34,197,94,0.9)' }}
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.55rem', letterSpacing: '0.2em', color: 'rgba(34,197,94,0.8)', textTransform: 'uppercase' }}>
        Available for Projects
      </span>
    </div>
  )
}

// ─── VALIDATION ───────────────────────────────────────────────────────────────
function validateForm({ name, email, subject, message }) {
  const errs = {}
  if (!name.trim())    errs.name    = 'Name is required'
  if (!email.trim())   errs.email   = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                       errs.email   = 'Enter a valid email address'
  if (!subject.trim()) errs.subject = 'Subject is required'
  if (!message.trim()) errs.message = 'Message is required'
  else if (message.trim().length < 20)
                       errs.message = 'Please add more detail (min 20 chars)'
  return errs
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Contact() {
  const sectionRef = useRef(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-100px' })

  const [fields, setFields]   = useState({ name: '', email: '', subject: '', message: '' })
  const [touched, setTouched] = useState({})
  const [status, setStatus]   = useState('idle')

  const errors = validateForm(fields)
  const visibleErrors = Object.fromEntries(
    Object.entries(errors).filter(([k]) => touched[k])
  )

  const update = (field) => (e) =>
    setFields((prev) => ({ ...prev, [field]: e.target.value }))

  const touch = (field) => () =>
    setTouched((prev) => ({ ...prev, [field]: true }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setTouched({ name: true, email: true, subject: true, message: true })
    if (Object.keys(errors).length > 0) return
    setStatus('sending')
    setTimeout(() => {
      const text = encodeURIComponent(
        `Hi Moheb, I visited your portfolio and I'd like to discuss a project.\n\nName: ${fields.name}\nEmail: ${fields.email}\nSubject: ${fields.subject}\n\nMessage:\n${fields.message}`
      )
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener,noreferrer')
      setStatus('success')
      setFields({ name: '', email: '', subject: '', message: '' })
      setTouched({})
    }, 900)
  }

  const resetForm = () => setStatus('idle')

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        padding: 'clamp(80px, 10vw, 140px) 0 clamp(40px, 5vw, 64px)',
        position: 'relative', zIndex: 10, overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(32,0,234,0.07) 0%, transparent 70%)', top: '-10%', right: '-15%' }} />
        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(158,146,231,0.05) 0%, transparent 70%)', bottom: '0%', left: '-10%' }} />
      </div>

      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 clamp(20px, 5vw, 64px)' }}>

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}
        >
          <div style={{ width: 28, height: 1, background: 'var(--blue)' }} />
          <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.6rem', letterSpacing: '0.28em', color: 'var(--blue)', textTransform: 'uppercase' }}>
            Get In Touch
          </span>
        </motion.div>

        {/* Waveform divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.6 }} animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ marginBottom: 56, transformOrigin: 'left' }}
        >
          <WaveformBars active={inView} count={36} />
        </motion.div>

        {/* Two-column grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
          gap: 'clamp(32px, 5vw, 80px)',
          alignItems: 'start',
        }}>

          {/* ── LEFT: info card ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div style={{
              background: 'var(--card)',
              border: '1px solid var(--border-b)',
              borderRadius: 8,
              padding: 'clamp(28px, 4vw, 48px)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div aria-hidden style={{
                position: 'absolute', top: 0, right: 0, width: 80, height: 80,
                background: 'radial-gradient(circle at top right, rgba(158,146,231,0.12), transparent 70%)',
              }} />

              <AvailabilityBadge />

              <h2 style={{
                fontFamily: 'var(--ff-disp)',
                fontSize: 'clamp(2rem, 4vw, 3.6rem)',
                lineHeight: 0.92, color: 'var(--white)',
                marginBottom: 20, letterSpacing: '-0.01em',
              }}>
                LET&apos;S CREATE<br />
                <span style={{ color: 'var(--lav)' }}>IMMERSIVE</span><br />
                SOUND TOGETHER.
              </h2>

              <p style={{ fontSize: '0.88rem', lineHeight: 1.82, color: 'var(--gray)', marginBottom: 28, maxWidth: 340 }}>
                Have a project in mind? I&apos;d love to craft an audio experience
                that elevates your film, game, or media production.
              </p>

              <motion.a
                href={`mailto:${CONTACT_EMAIL}`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  fontFamily: 'var(--ff-mono)', fontSize: '0.7rem',
                  color: 'var(--lav)', letterSpacing: '0.1em',
                  marginBottom: 28, textDecoration: 'none',
                }}
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M1 3L7 8L13 3M1 3H13V11H1V3Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                </svg>
                {CONTACT_EMAIL}
              </motion.a>

              <div style={{ height: 1, background: 'var(--border)', marginBottom: 20 }} />

              <p style={{
                fontFamily: 'var(--ff-mono)', fontSize: '0.52rem',
                letterSpacing: '0.22em', color: 'var(--gray)',
                textTransform: 'uppercase', marginBottom: 14,
              }}>
                Find me on
              </p>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {SOCIALS.map((s) => (
                  <motion.a
                    key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                    title={s.name} aria-label={s.name}
                    style={{
                      width: 44, height: 44,
                      border: '1px solid var(--border)',
                      borderRadius: 8,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--gray)', textDecoration: 'none',
                    }}
                    whileHover={{ y: -3, borderColor: s.color + '66', color: s.color, backgroundColor: s.color + '14' }}
                    transition={{ duration: 0.2 }}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>

              <p style={{
                fontFamily: 'var(--ff-mono)', fontSize: '0.54rem',
                letterSpacing: '0.16em', color: 'var(--gray)',
                opacity: 0.5,
                marginTop: 24, textTransform: 'uppercase',
              }}>
                Typical response within 24 hrs · via WhatsApp
              </p>
            </div>
          </motion.div>

          {/* ── RIGHT: form card ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: 'clamp(24px, 4vw, 44px)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}>

              {/* Card header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{
                    fontFamily: 'var(--ff-mono)', fontSize: '0.56rem',
                    letterSpacing: '0.28em', color: 'var(--blue)',
                    textTransform: 'uppercase',
                  }}>
                    New Transmission
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="rgba(34,197,94,0.8)" aria-hidden>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span style={{
                      fontFamily: 'var(--ff-mono)', fontSize: '0.52rem',
                      letterSpacing: '0.14em', color: 'rgba(34,197,94,0.7)',
                      textTransform: 'uppercase',
                    }}>
                      Sends via WhatsApp
                    </span>
                  </div>
                </div>
                {/* Traffic lights — decorative */}
                <div style={{ display: 'flex', gap: 5 }}>
                  {['rgba(255,80,80,0.5)', 'rgba(255,200,50,0.5)', 'rgba(34,197,94,0.5)'].map((bg, i) => (
                    <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: bg }} />
                  ))}
                </div>
              </div>

              <div style={{ height: 1, background: 'var(--border)', marginBottom: 24 }} />

              {/* Form states */}
              <AnimatePresence mode="wait">
                {status === 'sending' ? (
                  <motion.div key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <SendingState />
                  </motion.div>
                ) : status === 'success' ? (
                  <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <SuccessState />
                    <motion.button
                      onClick={resetForm}
                      style={{
                        width: '100%', marginTop: 20, padding: '13px 0',
                        fontFamily: 'var(--ff-mono)', fontSize: '0.62rem',
                        letterSpacing: '0.22em', textTransform: 'uppercase',
                        background: 'transparent', color: 'var(--gray)',
                        border: '1px solid var(--border)',
                        borderRadius: 6, cursor: 'pointer',
                      }}
                      whileHover={{ borderColor: 'rgba(32,0,234,0.4)', color: 'var(--lav)' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Send Another Message
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} noValidate
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  >
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="max-sm:grid-cols-1">
                      <FloatingField id="c-name" label="Your Name" value={fields.name} onChange={update('name')} onBlur={touch('name')} error={visibleErrors.name} required />
                      <FloatingField id="c-email" label="Email Address" type="email" value={fields.email} onChange={update('email')} onBlur={touch('email')} error={visibleErrors.email} required />
                    </div>
                    <FloatingField id="c-subject" label="Subject" value={fields.subject} onChange={update('subject')} onBlur={touch('subject')} error={visibleErrors.subject} required />
                    <FloatingField id="c-msg" label="Your Message" multiline rows={5} value={fields.message} onChange={update('message')} onBlur={touch('message')} error={visibleErrors.message} required />

                    <div style={{
                      fontFamily: 'var(--ff-mono)', fontSize: '0.52rem',
                      letterSpacing: '0.1em',
                      color: fields.message.length >= 20 ? 'rgba(34,197,94,0.6)' : 'var(--gray)',
                      textAlign: 'right', marginTop: -12, marginBottom: 24,
                      transition: 'color 0.3s', opacity: 0.7,
                    }}>
                      {fields.message.length} / 20 min
                    </div>

                    <motion.button
                      type="submit"
                      style={{
                        width: '100%', padding: '16px 0',
                        fontFamily: 'var(--ff-mono)', fontSize: '0.66rem',
                        letterSpacing: '0.24em', textTransform: 'uppercase',
                        background: 'var(--blue)', color: '#fff',
                        border: 'none', borderRadius: 6, cursor: 'pointer',
                        position: 'relative', overflow: 'hidden',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                      }}
                      whileHover={{ filter: 'brightness(1.15)', boxShadow: '0 0 32px rgba(32,0,234,0.45)' }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                    >
                      <motion.div
                        aria-hidden
                        style={{
                          position: 'absolute', top: 0, left: 0,
                          width: '45%', height: '100%',
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.13), transparent)',
                          pointerEvents: 'none',
                        }}
                        initial={{ x: '-100%' }} animate={{ x: '280%' }}
                        transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.8, ease: 'easeInOut' }}
                      />
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="white" aria-hidden style={{ flexShrink: 0 }}>
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Send via WhatsApp
                    </motion.button>

                    <p style={{
                      fontFamily: 'var(--ff-mono)', fontSize: '0.5rem',
                      letterSpacing: '0.12em', color: 'var(--gray)',
                      opacity: 0.5,
                      textAlign: 'center', marginTop: 14, textTransform: 'uppercase',
                    }}>
                      Your message will open in WhatsApp, pre-filled and ready to send
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}