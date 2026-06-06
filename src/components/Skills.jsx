import { motion } from 'framer-motion'
import AnimatedSection from './AnimatedSection'

const SKILL_GROUPS = [
  {
    title: 'Audio & Sound', icon: '◎', color: 'var(--blue)',
    colorDim: 'rgba(32,0,234,0.12)', borderColor: 'rgba(32,0,234,0.3)',
    skills: ['Sound Design','Mixing & Mastering','Audio Editing','Foley & SFX','Surround Audio','Music Production','Dialogue Editing','Field Recording'],
  },
  {
    title: 'Tools & Software', icon: '◈', color: 'var(--lav)',
    colorDim: 'rgba(158,146,231,0.1)', borderColor: 'rgba(158,146,231,0.28)',
    skills: ['Pro Tools','Cubase','Ableton Live','Wwise','Unreal Engine 5','iZotope Suite','Logic Pro','Reaper','RX Advanced'],
  },
  {
    title: 'Creative', icon: '◇', color: 'var(--blue)',
    colorDim: 'rgba(32,0,234,0.12)', borderColor: 'rgba(32,0,234,0.3)',
    skills: ['Storytelling Through Sound','Adaptive Music Systems','Dramatic Audio Design','Music Sense & Rhythm','Cinematic Atmospheres','Interactive Audio'],
  },
]

const TOOLS = [
  'Pro Tools','Ableton Live','Cubase','Wwise','Unreal Engine 5',
  'iZotope RX','Logic Pro','Reaper','iZotope Ozone',
  'Spat Revolution','Max/MSP','Boom Library','McDSP','Waves','Dolby Atmos',
]

function SkillChip({ name, color, colorDim, borderColor, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.04 }}
      whileHover={{ scale: 1.05, borderColor: color, backgroundColor: colorDim, y: -2 }}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '9px 16px', borderRadius: 3,
        border: `1px solid ${borderColor}`,
        background: 'rgba(255,248,248,0.03)',
        cursor: 'default',
        transition: 'border-color 0.2s, background 0.2s',
      }}
    >
      <span aria-hidden="true" style={{
        width: 5, height: 5, borderRadius: '50%',
        background: color, flexShrink: 0, opacity: 0.8,
      }} />
      <span style={{
        fontFamily: 'var(--ff-mono)', fontSize: '0.62rem',
        letterSpacing: '0.12em', color: 'var(--white)', whiteSpace: 'nowrap',
      }}>
        {name}
      </span>
    </motion.div>
  )
}

function SkillCard({ group, groupIndex }) {
  return (
    <AnimatedSection delay={groupIndex * 0.12}>
      <motion.div
        style={{
          background: 'rgba(255,248,248,0.022)',
          border: '1px solid rgba(255,248,248,0.07)',
          borderRadius: 4,
          padding: 'clamp(24px, 3vw, 32px)',
          height: '100%', position: 'relative', overflow: 'hidden',
        }}
        whileHover={{
          borderColor: group.borderColor,
          backgroundColor: group.colorDim,
          y: -4,
          boxShadow: '0 24px 48px rgba(0,0,0,0.4)',
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <div aria-hidden="true" style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: `linear-gradient(90deg, transparent, ${group.color}, transparent)`,
          opacity: 0.5,
        }} />

        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          marginBottom: 24, paddingBottom: 18,
          borderBottom: `1px solid ${group.borderColor}`,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 4,
            border: `1px solid ${group.borderColor}`,
            background: group.colorDim,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1rem', color: group.color, flexShrink: 0,
          }}>
            {group.icon}
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--ff-disp)', fontSize: '1.1rem',
              letterSpacing: '0.08em', color: 'var(--white)', lineHeight: 1,
            }}>
              {group.title}
            </div>
            <div style={{
              fontFamily: 'var(--ff-mono)', fontSize: '0.52rem',
              letterSpacing: '0.18em', color: group.color, marginTop: 4, opacity: 0.8,
            }}>
              {group.skills.length} SKILLS
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {group.skills.map((skill, si) => (
            <SkillChip
              key={skill} name={skill}
              color={group.color} colorDim={group.colorDim}
              borderColor={group.borderColor} index={si}
            />
          ))}
        </div>
      </motion.div>
    </AnimatedSection>
  )
}

export default function Skills() {
  return (
    <section
      id="skills"
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
            }}>Expertise</span>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h2 style={{
            fontFamily: 'var(--ff-disp)',
            fontSize: 'clamp(3rem, 5.5vw, 5.5rem)',
            lineHeight: 0.9, color: 'var(--white)',
            marginBottom: 'clamp(52px, 7vw, 88px)',
          }}>
            SKILLS &amp;<br />
            <span style={{ color: 'var(--lav)' }}>CAPABILITIES</span>
          </h2>
        </AnimatedSection>

        {/* Skills grid — className for mobile CSS */}
        <div
          className="skills-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}
        >
          {SKILL_GROUPS.map((group, gi) => (
            <SkillCard key={group.title} group={group} groupIndex={gi} />
          ))}
        </div>

        {/* Stats strip */}
        <AnimatedSection delay={0.3}>
          <div
            className="stats-strip"
            style={{
              marginTop: 48,
              padding: 'clamp(20px, 3vw, 28px) clamp(24px, 3vw, 36px)',
              border: '1px solid rgba(32,0,234,0.2)',
              borderRadius: 4,
              background: 'rgba(32,0,234,0.03)',
              display: 'flex', flexWrap: 'wrap',
              gap: 'clamp(24px, 4vw, 48px)',
              alignItems: 'center', justifyContent: 'space-around',
              position: 'relative', overflow: 'hidden',
            }}
          >
            <div aria-hidden="true" style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse at 50% 120%, rgba(32,0,234,0.08), transparent 70%)',
              pointerEvents: 'none',
            }} />
            {[
              { num: '6+',   label: 'Years Experience', icon: '◎' },
              { num: '500+', label: 'Projects Delivered', icon: '◈' },
              { num: '30+',  label: 'Platforms Covered', icon: '◇' },
              { num: '1000+',label: 'SFX Created',        icon: '◎' },
            ].map((stat) => (
              <div key={stat.label} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: 6, position: 'relative', zIndex: 1,
              }}>
                <span aria-hidden="true" style={{ fontSize: '0.8rem', color: 'var(--blue)', opacity: 0.7 }}>
                  {stat.icon}
                </span>
                <span style={{
                  fontFamily: 'var(--ff-disp)',
                  fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                  color: 'var(--lav)', lineHeight: 1,
                }}>
                  {stat.num}
                </span>
                <span style={{
                  fontFamily: 'var(--ff-mono)', fontSize: '0.55rem',
                  letterSpacing: '0.18em', color: 'var(--gray)',
                  textTransform: 'uppercase', textAlign: 'center',
                }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Marquee */}
        <AnimatedSection delay={0.4}>
          <div style={{
            overflow: 'hidden', marginTop: 48,
            WebkitMaskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
            maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
          }}>
            <div style={{
              display: 'flex', gap: 14, width: 'max-content',
              animation: 'marquee-run 22s linear infinite',
            }}>
              {[...TOOLS, ...TOOLS].map((tool, i) => (
                <motion.span
                  key={i}
                  style={{
                    padding: '8px 18px',
                    border: '1px solid var(--border)',
                    borderRadius: 20,
                    fontFamily: 'var(--ff-mono)', fontSize: '0.6rem',
                    letterSpacing: '0.12em', color: 'var(--gray)',
                    whiteSpace: 'nowrap', cursor: 'default', display: 'inline-block',
                  }}
                  whileHover={{ borderColor: 'rgba(32,0,234,0.4)', color: 'var(--lav)', backgroundColor: 'rgba(32,0,234,0.06)' }}
                  transition={{ duration: 0.2 }}
                >
                  {tool}
                </motion.span>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}