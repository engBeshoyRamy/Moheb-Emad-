import { useEffect, useState, useCallback } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WaveBackground from './components/WaveBackground'
import ProjectDetail from './pages/ProjectDetail'

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </>
  )
}

export default function App() {
  const [scrollPct, setScrollPct] = useState(0)
  const location = useLocation()

  const onScroll = useCallback(() => {
    const total = document.body.scrollHeight - window.innerHeight
    if (total <= 0) return
    setScrollPct(Math.round((window.scrollY / total) * 100))
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'var(--void)',
      }}
    >
      {/* Grain noise — decorative, hidden from AT */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Scroll progress bar */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollPct}%` }}
        role="progressbar"
        aria-valuenow={scrollPct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      />

      {/* Ambient wave canvas */}
      <WaveBackground />


      {/* Navigation */}
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:slug" element={<ProjectDetail />} />
        {/* 404 fallback — redirect home */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  )
}