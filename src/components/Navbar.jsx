import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { useScrollTo } from '../hooks/useScrollTo'
import { useTheme } from '../context/ThemeContext'

const NAV_LINKS = ['About', 'Skills', 'Experience', 'Projects', 'Contact']

function LogoEQBars() {
  const heights = [8, 13, 18, 22, 16, 11, 7]
  return (
    <div
      aria-hidden="true"
      style={{
        width: 34, height: 34,
        border: '1px solid rgba(32,0,234,0.45)',
        borderRadius: 4,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        gap: 2, padding: '6px 6px 5px',
        background: 'rgba(32,0,234,0.07)',
        flexShrink: 0,
      }}
    >
      {heights.map((h, i) => (
        <div
          key={i}
          className="eq-bar"
          style={{
            width: 3, height: h,
            borderRadius: '2px 2px 0 0',
            background: 'var(--blue)',
            animationDuration: `${0.7 + i * 0.12}s`,
            animationDelay: `${i * 0.07}s`,
          }}
        />
      ))}
    </div>
  )
}

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isLight = theme === 'light'
  return (
    <button
      onClick={toggle}
      className="theme-toggle"
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      title={isLight ? 'Dark mode' : 'Light mode'}
    >
      <div className="theme-toggle__track" />
      <div className="theme-toggle__thumb">
        <span key={theme} className="theme-toggle__icon">
          {isLight ? '☀' : '☽'}
        </span>
      </div>
    </button>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const scrollTo = useScrollTo()
  const { theme } = useTheme()

  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > 60)
    if (!isHome) return
    const sections = ['about', 'skills', 'experience', 'projects', 'contact']
    for (const id of sections) {
      const el = document.getElementById(id)
      if (!el) continue
      const rect = el.getBoundingClientRect()
      if (rect.top <= 110 && rect.bottom > 110) {
        setActiveSection(id)
        break
      }
    }
  }, [isHome])

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && menuOpen) setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  const handleNavClick = (section) => {
    setMenuOpen(false)
    scrollTo(section.toLowerCase())
  }

  const handleLogoClick = () => {
    if (isHome) window.scrollTo({ top: 0, behavior: 'smooth' })
    else scrollTo('hero')
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          zIndex: 150,
          padding: '0 clamp(16px, 4vw, 64px)',
          height: scrolled ? 60 : 70,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          transition: 'background 0.4s, border-color 0.4s, height 0.35s',
          borderBottom: `1px solid ${scrolled ? 'rgba(32,0,234,0.22)' : 'transparent'}`,
          background: scrolled ? 'var(--nav-bg)' : 'transparent',
          backdropFilter: scrolled ? 'blur(28px) saturate(1.4)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(28px) saturate(1.4)' : 'none',
        }}
      >
        {/* Logo */}
        <button
          onClick={handleLogoClick}
          aria-label="Go to home"
          style={{
            display: 'flex', alignItems: 'center', gap: 12,
            background: 'none', border: 'none', cursor: 'pointer',
          }}
        >
          <LogoEQBars />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <span style={{
              fontFamily: 'var(--ff-mono)', fontSize: '0.68rem',
              letterSpacing: '0.22em', color: 'var(--white)', lineHeight: 1,
            }}>
              Sound
            </span>
            <span style={{
              fontFamily: 'var(--ff-mono)', fontSize: '0.42rem',
              letterSpacing: '0.28em', color: 'var(--lav)', lineHeight: 1,
            }}>
              ENGINEER
            </span>
          </div>
        </button>

        {/* Desktop nav */}
        <ul style={{ display: 'flex', gap: 0, listStyle: 'none' }} className="hidden md:flex" role="list">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.toLowerCase()
            return (
              <li key={link}>
                <button
                  onClick={() => handleNavClick(link)}
                  aria-current={isActive ? 'page' : undefined}
                  style={{
                    fontFamily: 'var(--ff-mono)', fontSize: '0.62rem',
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: isActive ? 'var(--lav)' : 'var(--gray)',
                    background: 'none', border: 'none',
                    padding: '8px 18px', position: 'relative',
                    transition: 'color 0.25s', cursor: 'none',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--white)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = isActive ? 'var(--lav)' : 'var(--gray)' }}
                >
                  {link}
                  <motion.span
                    aria-hidden="true"
                    style={{
                      position: 'absolute', bottom: 4, left: 18, right: 18,
                      height: 1, background: 'var(--lav)', display: 'block',
                    }}
                    initial={false}
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  />
                </button>
              </li>
            )
          })}
        </ul>

        {/* Desktop right: theme toggle + hire me */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <motion.button
            onClick={() => handleNavClick('contact')}
            style={{
              fontFamily: 'var(--ff-mono)', fontSize: '0.62rem',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--lav)', border: '1px solid rgba(158,146,231,0.35)',
              background: 'none', padding: '9px 22px', borderRadius: 2,
              cursor: 'none', position: 'relative', overflow: 'hidden',
            }}
            whileHover={{
              borderColor: 'rgba(158,146,231,0.7)',
              backgroundColor: 'rgba(32,0,234,0.15)',
              boxShadow: 'var(--glow-l)',
            }}
            transition={{ duration: 0.3 }}
            aria-label="Contact Moheb Emad for hire"
          >
            Hire Me
          </motion.button>
        </div>

        {/* Mobile right: theme toggle + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(v => !v)}
            style={{
              background: 'none', border: 'none',
              cursor: 'pointer',
              display: 'flex', flexDirection: 'column',
              gap: '6px', padding: '10px 8px',
            }}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                style={{
                  width: 24, height: 2,
                  background: 'var(--lav)',
                  display: 'block', borderRadius: 2,
                }}
                animate={
                  menuOpen
                    ? i === 0 ? { rotate: 45, y: 8 }
                    : i === 1 ? { opacity: 0, scaleX: 0 }
                    : { rotate: -45, y: -8 }
                    : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }
                }
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed', inset: 0, zIndex: 140,
              background: 'var(--void)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              display: 'flex', flexDirection: 'column',
              justifyContent: 'center', alignItems: 'flex-start',
              padding: '0 clamp(32px, 8vw, 80px)',
            }}
          >
            <nav aria-label="Mobile navigation">
              {NAV_LINKS.map((link, i) => (
                <div key={link} style={{ overflow: 'hidden', marginBottom: 4 }}>
                  <motion.button
                    initial={{ y: '120%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
                    onClick={() => handleNavClick(link)}
                    style={{
                      fontFamily: 'var(--ff-disp)',
                      fontSize: 'clamp(2.8rem, 9vw, 5rem)',
                      letterSpacing: '0.04em',
                      /* FIX: was var(--border) which is near-invisible */
                      color: 'var(--gray)',
                      background: 'none', border: 'none',
                      padding: '6px 0', display: 'block',
                      cursor: 'pointer',
                      transition: 'color 0.25s',
                      WebkitTapHighlightColor: 'transparent',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--lav)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--gray)' }}
                    onTouchStart={(e) => { e.currentTarget.style.color = 'var(--lav)' }}
                    onTouchEnd={(e) => {
                      setTimeout(() => {
                        if (e.currentTarget) e.currentTarget.style.color = 'var(--gray)'
                      }, 200)
                    }}
                  >
                    {link}
                  </motion.button>
                </div>
              ))}
            </nav>

            {/* Theme toggle inside mobile menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 48 }}
            >
              <span style={{
                fontFamily: 'var(--ff-mono)', fontSize: '0.58rem',
                letterSpacing: '0.18em', color: 'var(--gray)', textTransform: 'uppercase',
              }}>
                {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </span>
              <ThemeToggle />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              style={{
                position: 'absolute', bottom: 40,
                left: 'clamp(32px, 8vw, 80px)',
                fontFamily: 'var(--ff-mono)', fontSize: '0.6rem',
                letterSpacing: '0.2em', color: 'var(--gray)',
              }}
            >
              MOHEB EMAD · 2025
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}