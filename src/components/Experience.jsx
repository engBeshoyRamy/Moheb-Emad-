import { motion } from 'framer-motion'
import AnimatedSection from './AnimatedSection'

const EXPERIENCES = [
  {
    role: 'Sound Engineer & Audio Designer',
    company: 'TV & Media Production',
    period: '2021 — Present',
    badge: 'FULL-TIME',
    primary: true,
    desc: 'Leading audio post-production for TV drama series. Full pipeline ownership from raw audio to broadcast-ready final mix delivery,Surround sound mixing, and music integration for Cinema and TV.',
    chips: ['Audio Editing', 'Dialogue Mixing', 'Sound Design', '5.1 Mix', 'Music Integration'],
  },
  {
    role: 'Post-Production Audio Engineer',
    company: 'Film & Media Projects',
    period: '2020 — 2021',
    badge: 'FREELANCE',
    primary: false,
    desc: 'Post-production audio for short films, commercials, and digital content. Specializing in dialogue editing, SFX layering, and final mix.',
    chips: ['Dialogue Editing', 'SFX Design', 'Foley Recording', 'Surround Mixing'],
  },
  {
    role: 'Game Audio Developer',
    company: 'Independent Projects',
    period: '2022 — Present',
    badge: 'PERSONAL',
    primary: false,
    desc: 'Interactive audio design in Wwise and Unreal Engine 5. Building game audio prototypes and adaptive music systems.',
    chips: ['Wwise', 'Unreal Engine 5', 'Adaptive Music', 'Real-time Audio'],
  },
]

function ExpCard({ exp, index }) {
  return (
    <AnimatedSection delay={index * 0.15}>
      <motion.div
        style={{
          background: exp.primary ? 'rgba(32,0,234,0.05)' : 'rgba(255,248,248,0.022)',
          border: `1px solid ${exp.primary ? 'rgba(32,0,234,0.35)' : 'rgba(255,248,248,0.07)'}`,
          borderRadius: 4,
          padding: 'clamp(20px, 3vw, 28px)',
        }}
        whileHover={{ borderColor: 'rgba(32,0,234,0.4)', y: -3 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {exp.primary && (
          <div style={{ height: 1, background: 'linear-gradient(90deg, var(--blue), var(--lav), transparent)', marginBottom: 20 }} />
        )}
        <div style={{ fontFamily: 'var(--ff-disp)', fontSize: '1.2rem', letterSpacing: '0.04em', color: 'var(--white)' }}>
          {exp.role}
        </div>
        <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--lav)', marginBottom: 12 }}>
          {exp.company}
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginBottom: 14 }}>
          <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.58rem', letterSpacing: '0.15em', color: 'var(--gray)' }}>
            {exp.period}
          </span>
          <span style={{ padding: '3px 10px', border: '1px solid rgba(32,0,234,0.35)', borderRadius: 2, fontFamily: 'var(--ff-mono)', fontSize: '0.5rem', letterSpacing: '0.15em', color: 'var(--blue)' }}>
            {exp.badge}
          </span>
        </div>
        <p style={{ fontSize: '0.85rem', lineHeight: 1.75, color: 'var(--gray)', marginBottom: 16 }}>
          {exp.desc}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {exp.chips.map((chip) => (
            <span key={chip} style={{ padding: '4px 10px', background: 'rgba(255,248,248,0.04)', borderRadius: 2, fontFamily: 'var(--ff-mono)', fontSize: '0.52rem', color: 'var(--gray)', letterSpacing: '0.1em' }}>
              {chip}
            </span>
          ))}
        </div>
      </motion.div>
    </AnimatedSection>
  )
}

export default function Experience() {
  return (
    <section id="experience" style={{ padding: 'clamp(80px, 10vw, 140px) 0', position: 'relative', zIndex: 10 }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, var(--blue), transparent)' }} />
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 clamp(20px, 5vw, 64px)' }}>

        <AnimatedSection>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 28, height: 1, background: 'var(--blue)' }} />
            <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.6rem', letterSpacing: '0.28em', color: 'var(--blue)', textTransform: 'uppercase' }}>
              Work History
            </span>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h2 style={{ fontFamily: 'var(--ff-disp)', fontSize: 'clamp(3rem, 5.5vw, 5.5rem)', lineHeight: 0.9, color: 'var(--white)', marginBottom: 'clamp(52px, 7vw, 88px)' }}>
            EXPERIENCE &<br />
            <span style={{ color: 'var(--lav)' }}>TIMELINE</span>
          </h2>
        </AnimatedSection>

        <div style={{ position: 'relative' }}>
          <div
            aria-hidden="true"
            className="hidden md:block"
            style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, var(--blue), rgba(32,0,234,0.05))' }}
          />

          {EXPERIENCES.map((exp, i) => (
            <div
              key={exp.role}
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, marginBottom: 52, position: 'relative' }}
              className="max-md:grid-cols-1 max-md:gap-4"
            >
              <motion.div
                aria-hidden="true"
                className="hidden md:block"
                style={{
                  position: 'absolute', top: 26, left: '50%', transform: 'translateX(-50%)',
                  width: 13, height: 13, borderRadius: '50%',
                  border: '2px solid var(--blue)',
                  background: exp.primary ? 'var(--blue)' : 'var(--void)',
                  boxShadow: exp.primary ? '0 0 20px var(--blue)' : 'none',
                  zIndex: 2,
                }}
                whileInView={{ scale: [0, 1.3, 1] }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              />

              {i % 2 === 0 ? (
                <>
                  <ExpCard exp={exp} index={i} />
                  <div />
                </>
              ) : (
                <>
                  <div />
                  <ExpCard exp={exp} index={i} />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}