import { motion } from 'framer-motion'

const SOCIALS = [
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@mohebemad',
    color: '#FF0000',
    svg: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.5 6.5s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.8 2.2 12 2.2 12 2.2s-4.8 0-7.3.2c-.6.1-1.9.1-3 1.3C.8 4.5.5 6.5.5 6.5S.2 8.8.2 11.1v2.2c0 2.3.3 4.6.3 4.6s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.2 22 12 22 12 22s4.8 0 7.3-.3c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.3.3-4.6v-2.2c0-2.3-.3-4.6-.3-4.6zM9.7 15.5V8.4l8.1 3.6-8.1 3.5z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/mohebtadroos/',
    color: '#1877F2',
    svg: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.49h-2.79V24C19.62 23.1 24 18.1 24 12.07z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/e.tadroos',
    color: '#E1306C',
    svg: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: 'elCinema',
    href: 'https://elcinema.com/person/2321112/',
    color: '#E8A020',
    svg: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18 3H6a3 3 0 00-3 3v12a3 3 0 003 3h12a3 3 0 003-3V6a3 3 0 00-3-3zM8 17H5v-2h3v2zm0-4H5v-2h3v2zm0-4H5V7h3v2zm10 8H9V7h9v10zm-3-8h-5V8h5v1zm0 3h-5v-1h5v1zm0 3h-5v-1h5v1z" />
      </svg>
    ),
  },
  {
    name: 'IMDb',
    href: 'https://www.imdb.com/name/nm16687397/',
    color: '#F5C518',
    svg: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M14.31 9.588v.005c-.077-.048-.227-.07-.42-.07v4.815c.27 0 .44-.06.5-.165.062-.104.095-.405.095-.885V10.5c0-.42-.022-.694-.07-.8a.347.347 0 00-.105-.112zM22 4H2a2 2 0 00-2 2v12a2 2 0 002 2h20a2 2 0 002-2V6a2 2 0 00-2-2zM5.84 15.82H4V8.18h1.84v7.64zm5.84 0H10.1v-5.09l-.72 5.09H8.22l-.75-4.97v4.97H5.9V8.18h2.17c.21 1.13.4 2.43.58 3.91.14-1.09.36-2.39.64-3.91h2.35v7.64zm4.96-1.7c0 .57-.04.99-.12 1.26-.08.27-.22.48-.41.62-.2.14-.43.22-.72.26-.28.04-.7.06-1.25.06H12.7V8.18h1.62c.52 0 .92.03 1.19.1.28.06.5.18.67.35.17.17.28.38.34.63.06.26.08.67.08 1.24v3.57zm3.73.05c0 .43-.08.74-.23.93-.15.19-.4.28-.73.28-.3 0-.54-.1-.72-.3-.18-.2-.27-.5-.27-.91v-3.2c0-.4.09-.68.27-.88.18-.2.42-.3.73-.3.33 0 .57.1.72.3.15.2.23.5.23.9v3.18z"/>
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer style={{
      position: 'relative', zIndex: 10,
      paddingBottom: 'clamp(24px, 3vw, 40px)',
      marginTop: 0,
    }}>

      {/* Top gradient border */}
      <div style={{
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(32,0,234,0.4), rgba(158,146,231,0.3), transparent)',
        marginBottom: 0,
      }} />

      {/* Ghost text */}
      <div style={{ overflow: 'hidden', lineHeight: 1 }}>
        <div
          aria-hidden="true"
          style={{
            fontFamily: 'var(--ff-disp)',
            fontSize: 'clamp(5rem, 13vw, 13rem)',
            letterSpacing: '0.02em',
            lineHeight: 0.85,
            userSelect: 'none',
            padding: '0 clamp(20px, 5vw, 64px)',
            background: 'linear-gradient(180deg, var(--border) 0%, transparent 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          MOHEB EMAD
        </div>
      </div>

      {/* Main footer content */}
      <div style={{
        maxWidth: 1300, margin: '-clamp(16px,2vw,28px) auto 0',
        padding: '0 clamp(20px, 5vw, 64px)',
        position: 'relative',
      }}>

        {/* Brand + socials row */}
        <div style={{
          display: 'flex', flexWrap: 'wrap',
          justifyContent: 'space-between', alignItems: 'flex-end',
          gap: 24, paddingBottom: 24,
          borderBottom: '1px solid var(--border)',
        }}>
          {/* Brand */}
          <div>
            <div style={{
              fontFamily: 'var(--ff-disp)', fontSize: '1.9rem',
              letterSpacing: '0.08em', color: 'var(--white)', lineHeight: 1,
            }}>
              MOHEB EMAD
            </div>
            <div style={{
              fontFamily: 'var(--ff-mono)', fontSize: '0.54rem',
              letterSpacing: '0.22em', color: 'var(--gray)', marginTop: 6,
            }}>
              SOUND ENGINEER · AUDIO DESIGNER · GAME AUDIO
            </div>
          </div>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            {SOCIALS.map((s) => (
              <motion.a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.name}
                aria-label={s.name}
                style={{
                  width: 38, height: 38,
                  border: '1px solid var(--border)',
                  borderRadius: 6,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--gray)',
                  textDecoration: 'none',
                  background: 'var(--card)',
                }}
                whileHover={{
                  y: -4,
                  borderColor: s.color + '70',
                  color: s.color,
                  background: s.color + '12',
                  boxShadow: `0 4px 20px ${s.color}22`,
                }}
                transition={{ duration: 0.18 }}
              >
                {s.svg}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop: 20,
          display: 'flex', flexWrap: 'wrap',
          justifyContent: 'space-between', alignItems: 'center', gap: 12,
          fontFamily: 'var(--ff-mono)', fontSize: '0.54rem',
          letterSpacing: '0.12em', color: 'var(--gray)',
        }}>
          <span>© 2025 Moheb Emad. All rights reserved.</span>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              aria-hidden="true"
              style={{
                width: 6, height: 6, borderRadius: '50%',
                background: '#4ade80', display: 'inline-block',
                animation: 'ping-slow 2s ease-out infinite',
              }}
            />
            <span style={{ color: 'rgba(74,222,128,0.8)' }}>AVAILABLE FOR WORK</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ping-slow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(74,222,128,0.5); }
          60%       { box-shadow: 0 0 0 7px rgba(74,222,128,0); }
        }
      `}</style>
    </footer>
  )
}