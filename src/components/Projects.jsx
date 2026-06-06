import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from './AnimatedSection'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'
import { PROJECTS, CATEGORIES } from '../data/projects'

const INITIAL_VISIBLE = 6

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)
  const [showAll, setShowAll] = useState(false)

  const filtered = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory)

  const visible = showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE)
  const hasMore = filtered.length > INITIAL_VISIBLE

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat)
    setShowAll(false)
  }

  const openProject = useCallback((project) => {
    setSelectedProject(project)
    window.history.pushState({ modal: project.slug }, '', `/project/${project.slug}`)
  }, [])

  const closeModal = useCallback(() => {
    setSelectedProject(null)
    window.history.pushState({}, '', '/')
  }, [])

  const navigateToProject = useCallback((project) => {
    setSelectedProject(project)
    window.history.replaceState({ modal: project.slug }, '', `/project/${project.slug}`)
  }, [])

  return (
    <>
      <section
        id="projects"
        style={{ padding: 'clamp(80px, 10vw, 140px) 0', position: 'relative', zIndex: 10 }}
      >
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(158,146,231,0.35), transparent)',
        }} />

        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 clamp(20px, 5vw, 64px)' }}>

          <AnimatedSection>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 28, height: 1, background: 'var(--blue)' }} />
              <span style={{
                fontFamily: 'var(--ff-mono)', fontSize: '0.6rem',
                letterSpacing: '0.28em', color: 'var(--blue)', textTransform: 'uppercase',
              }}>Portfolio</span>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2 style={{
              fontFamily: 'var(--ff-disp)',
              fontSize: 'clamp(3rem, 5.5vw, 5.5rem)',
              lineHeight: 0.9, color: 'var(--white)',
              marginBottom: 'clamp(40px, 5vw, 60px)',
            }}>
              SELECTED<br />
              <span style={{ color: 'var(--lav)' }}>PROJECTS</span>
            </h2>
          </AnimatedSection>

          {/* Filter bar */}
          <AnimatedSection delay={0.2}>
            <div className="filter-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 48 }}>
              {CATEGORIES.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  style={{
                    padding: '9px 22px', borderRadius: 2,
                    fontFamily: 'var(--ff-mono)', fontSize: '0.6rem',
                    letterSpacing: '0.15em', textTransform: 'uppercase',
                    background: activeCategory === cat ? 'rgba(32,0,234,0.18)' : 'none',
                    border: `1px solid ${activeCategory === cat ? 'var(--blue)' : 'rgba(255,248,248,0.07)'}`,
                    color: activeCategory === cat ? 'var(--lav)' : 'var(--gray)',
                    cursor: 'pointer',
                  }}
                  whileHover={{ borderColor: 'rgba(32,0,234,0.4)', color: 'var(--lav)' }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </AnimatedSection>

          {/* Projects grid */}
          <motion.div
            layout
            className="projects-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }}
          >
            <AnimatePresence mode="popLayout">
              {visible.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  onClick={openProject}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* See More / See Less */}
          {hasMore && (
            <AnimatedSection delay={0.25}>
              <div style={{ textAlign: 'center', marginTop: 40 }}>
                <motion.button
                  className="see-more-btn"
                  onClick={() => setShowAll((prev) => !prev)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 10,
                    padding: '12px 32px', borderRadius: 2,
                    fontFamily: 'var(--ff-mono)', fontSize: '0.65rem',
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    background: 'rgba(32,0,234,0.08)',
                    border: '1px solid rgba(32,0,234,0.35)',
                    color: 'var(--lav)', cursor: 'pointer',
                    position: 'relative', overflow: 'hidden',
                  }}
                  whileHover={{
                    background: 'rgba(32,0,234,0.18)',
                    borderColor: 'var(--blue)',
                    boxShadow: '0 0 24px rgba(32,0,234,0.3)',
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                >
                  {showAll ? (
                    <>
                      See Less
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                        <path d="M2 8.5l4.5-4.5L11 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  ) : (
                    <>
                      See More
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        width: 20, height: 20, borderRadius: '50%',
                        background: 'rgba(32,0,234,0.25)', fontSize: '0.55rem',
                        color: 'var(--blue)', fontFamily: 'var(--ff-mono)',
                      }}>
                        +{filtered.length - INITIAL_VISIBLE}
                      </span>
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                        <path d="M2 4.5l4.5 4.5L11 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )}
                </motion.button>
              </div>
            </AnimatedSection>
          )}

          <AnimatedSection delay={0.3}>
            <div style={{ textAlign: 'center', marginTop: 60 }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--gray)', marginBottom: 20 }}>
                Ready to start your next project?
              </p>
              <button
                className="btn-primary"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Let&apos;s Create Together
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="btn-arrow" aria-hidden="true">
                  <path d="M2 6.5h9M7 2l4.5 4.5L7 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            key={selectedProject.slug}
            project={selectedProject}
            onClose={closeModal}
            onNavigate={navigateToProject}
            allProjects={PROJECTS}
          />
        )}
      </AnimatePresence>
    </>
  )
}