import { motion } from 'framer-motion'
import AnimatedSection from './AnimatedSection'

function EQDisplay() {
  const heights = [28, 50, 75, 100, 88, 68, 82, 55, 40, 65, 80, 92, 70, 46, 32]
  return (
    <div className="studio-eq-display" style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 56, marginBottom: 24 }}>
      {heights.map((h, i) => (
        <div
          key={i}
          className="eq-bar"
          style={{
            flex: 1, height: `${h}%`, borderRadius: '2px 2px 0 0',
            background: i % 2
              ? 'linear-gradient(to top, var(--lav), rgba(158,146,231,0.2))'
              : 'linear-gradient(to top, var(--blue), rgba(32,0,234,0.2))',
            animationDuration: `${0.65 + i * 0.1}s`,
            animationDelay: `${i * 0.05}s`,
          }}
        />
      ))}
    </div>
  )
}

const SPECS = [
  { k: 'Role',           v: 'Sound Engineer',    accent: false },
  { k: 'Specialization', v: 'Film & Game Audio',  accent: false },
  { k: 'Primary DAW',    v: 'Pro Tools / Cubase', accent: false },
  { k: 'Game Engine',    v: 'Unreal + Wwise',     accent: false },
  { k: 'Status',         v: 'Available',           accent: true  },
]

const META = [
  { label: 'Education', val: 'Bachelor\u2019s of Sound Engineering, The institute of cinema' },
  { label: 'Focus',     val: 'Film & Game Audio' },
  { label: 'Location',  val: 'Egypt' },
  { label: 'Languages', val: 'Arabic, English' },
]

export default function About() {
  return (
    <section
      id="about"
      style={{ padding: 'clamp(80px, 10vw, 140px) 0', position: 'relative', zIndex: 10 }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, var(--blue), transparent)',
      }} />

      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 clamp(20px, 5vw, 64px)' }}>

        <AnimatedSection>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 64 }}>
            <div style={{ width: 28, height: 1, background: 'var(--blue)', flexShrink: 0 }} />
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 16px', borderRadius: 40,
              border: '1px solid rgba(32,0,234,0.6)',
              background: 'rgba(32,0,234,0.14)',
              backdropFilter: 'blur(8px)',
            }}>
              <span aria-hidden="true" style={{
                width: 6, height: 6, borderRadius: '50%',
                background: 'var(--lav)', boxShadow: '0 0 8px var(--lav)',
                display: 'inline-block', flexShrink: 0,
              }} />
              <span style={{
                fontFamily: 'var(--ff-mono)', fontSize: '0.65rem',
                letterSpacing: '0.28em', color: 'var(--lav)',
                textTransform: 'uppercase', fontWeight: 700,
              }}>About Me</span>
            </div>
          </div>
        </AnimatedSection>

        {/* MAIN GRID */}
        <div className="about-grid">

          {/* LEFT: Photo */}
          <div className="about-left">
            <AnimatedSection>
              <motion.div
                initial={{ opacity: 0, x: -32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: 'relative' }}
              >
                <div aria-hidden="true" style={{
                  position: 'absolute', inset: -1, borderRadius: 6,
                  background: 'linear-gradient(135deg, rgba(32,0,234,0.6) 0%, rgba(158,146,231,0.3) 50%, transparent 100%)',
                  zIndex: 0,
                }} />

                <div
                  className="about-photo-frame"
                  style={{
                    position: 'relative', zIndex: 1, borderRadius: 5,
                    overflow: 'hidden', aspectRatio: '4/5',
                    background: '#06060e',
                    boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 60px rgba(32,0,234,0.2)',
                  }}
                >
                  <img
                    src="/moheb.jpg"
                    alt="Moheb Emad — Sound Engineer"
                    className="about-photo-img"
                    style={{
                      width: '100%', height: '100%',
                      objectFit: 'cover',
                      /* desktop: show from top */
                      objectPosition: 'top center',
                      display: 'block',
                      filter: 'brightness(0.9) contrast(1.08) saturate(0.9)',
                    }}
                  />
                  <div aria-hidden="true" style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(180deg, transparent 50%, rgba(2,2,2,0.85) 100%)',
                    pointerEvents: 'none',
                  }} />
                  <div aria-hidden="true" style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(90deg, rgba(32,0,234,0.15) 0%, transparent 35%)',
                    pointerEvents: 'none',
                  }} />
                  <div aria-hidden="true" style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 4px)',
                    pointerEvents: 'none',
                  }} />
                  <svg aria-hidden="true" style={{
                    position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none',
                  }} viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M3,3 L3,10 M3,3 L10,3"      stroke="rgba(32,0,234,0.7)" strokeWidth="0.5" fill="none" vectorEffect="non-scaling-stroke" />
                    <path d="M97,3 L97,10 M97,3 L90,3"    stroke="rgba(32,0,234,0.7)" strokeWidth="0.5" fill="none" vectorEffect="non-scaling-stroke" />
                    <path d="M3,97 L3,90 M3,97 L10,97"    stroke="rgba(32,0,234,0.7)" strokeWidth="0.5" fill="none" vectorEffect="non-scaling-stroke" />
                    <path d="M97,97 L97,90 M97,97 L90,97" stroke="rgba(32,0,234,0.7)" strokeWidth="0.5" fill="none" vectorEffect="non-scaling-stroke" />
                  </svg>
                  <div aria-hidden="true" style={{
                    position: 'absolute', top: 12, left: 14,
                    fontFamily: 'var(--ff-mono)', fontSize: '0.46rem',
                    letterSpacing: '0.2em', color: 'rgba(32,0,234,0.7)',
                    textTransform: 'uppercase',
                  }}>MOHEB.EMAD</div>
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 20px 18px',
                  }}>
                    <div style={{
                      fontFamily: 'var(--ff-disp)', fontSize: '1.4rem',
                      letterSpacing: '0.08em', color: 'var(--white)', lineHeight: 1, marginBottom: 6,
                    }}>MOHEB EMAD</div>
                    <div style={{
                      fontFamily: 'var(--ff-mono)', fontSize: '0.52rem',
                      letterSpacing: '0.22em', color: 'var(--lav)',
                    }}>SOUND ENGINEER</div>
                  </div>
                </div>

                {/* Floating tag — hidden on mobile via CSS */}
                <motion.div
                  className="about-float-tag"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  aria-hidden="true"
                  style={{
                    position: 'absolute', top: 24, right: -18,
                    background: 'rgba(2,2,2,0.9)',
                    border: '1px solid rgba(32,0,234,0.5)',
                    padding: '8px 14px', borderRadius: 3,
                    fontFamily: 'var(--ff-mono)', fontSize: '0.5rem',
                    letterSpacing: '0.2em', color: 'var(--lav)',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 0 20px rgba(32,0,234,0.25)',
                    zIndex: 3, whiteSpace: 'nowrap',
                  }}
                >
                  ◈ AUDIO DESIGNER
                </motion.div>
              </motion.div>
            </AnimatedSection>
          </div>

          {/* RIGHT: Content */}
          <div className="about-right">

            <AnimatedSection delay={0.1}>
              <h2 style={{
                fontFamily: 'var(--ff-disp)',
                fontSize: 'clamp(2.8rem, 5vw, 5.5rem)',
                lineHeight: 0.88, color: 'var(--white)',
                marginBottom: 'clamp(20px, 3vw, 36px)',
                letterSpacing: '0.02em',
              }}>
                CRAFTING SOUND<br />
                <span style={{ color: 'var(--lav)' }}>AS EXPERIENCE</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.18}>
              <div style={{ marginBottom: 36 }}>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.9, color: 'var(--gray)', marginBottom: 14 }}>
                  Sound Engineer &amp; Audio Designer with a background in media production
                  and a deep focus on game audio and filmmaking. Graduate of the high institute of cinema, Sound Engineering department —
                  where technical precision meets creative sound.
                </p>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.9, color: 'var(--gray)' }}>
                  From dialogue editing to final mix, I own the full audio pipeline.
                  Currently expanding into interactive audio with Wwise and Unreal Engine 5.
                </p>
              </div>
            </AnimatedSection>

            {/* Studio card */}
            <AnimatedSection delay={0.26}>
              <div style={{
                background: 'rgba(32,0,234,0.04)',
                border: '1px solid rgba(32,0,234,0.28)',
                borderRadius: 4,
                padding: 'clamp(20px, 2.5vw, 28px)',
                position: 'relative', overflow: 'hidden', marginBottom: 32,
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                  background: 'linear-gradient(90deg, transparent, var(--blue) 40%, var(--lav) 60%, transparent)',
                }} />
                <div aria-hidden="true" style={{
                  position: 'absolute', inset: 0,
                  background: 'radial-gradient(ellipse at 50% -20%, rgba(32,0,234,0.1), transparent 65%)',
                  pointerEvents: 'none',
                }} />

                {/* Card header */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  marginBottom: 18, paddingBottom: 14, borderBottom: '1px solid var(--border)',
                }}>
                  <span style={{
                    fontFamily: 'var(--ff-mono)', fontSize: '0.58rem',
                    letterSpacing: '0.28em', color: 'var(--blue)', textTransform: 'uppercase',
                  }}>AUDIO PROFILE</span>

                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    padding: '4px 12px', borderRadius: 20,
                    border: '1px solid rgba(74,222,128,0.4)',
                    background: 'rgba(74,222,128,0.1)',
                  }}>
                    <span aria-hidden="true" style={{
                      width: 7, height: 7, borderRadius: '50%',
                      background: '#4ade80', display: 'inline-block',
                      boxShadow: '0 0 7px #4ade80',
                      animation: 'ping-slow 2s ease-out infinite',
                    }} />
                    <span style={{
                      fontFamily: 'var(--ff-mono)', fontSize: '0.62rem',
                      letterSpacing: '0.2em', color: '#4ade80', fontWeight: 700,
                    }}>LIVE</span>
                  </div>
                </div>

                {/* EQ + Specs */}
                <div className="studio-card-inner" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}>
                  <EQDisplay />
                  <div>
                    {SPECS.map((item) => (
                      <div key={item.k} style={{
                        display: 'flex', justifyContent: 'space-between',
                        padding: '7px 0', borderBottom: '1px solid rgba(255,248,248,0.04)', gap: 8,
                      }}>
                        <span style={{
                          fontFamily: 'var(--ff-mono)', fontSize: '0.54rem',
                          color: 'var(--gray)', letterSpacing: '0.08em', flexShrink: 0,
                        }}>{item.k}</span>
                        <span style={{
                          fontFamily: 'var(--ff-mono)', fontSize: '0.54rem',
                          letterSpacing: '0.06em', textAlign: 'right',
                          color: item.accent ? '#4ade80' : 'var(--white)',
                          display: 'flex', alignItems: 'center', gap: 5,
                        }}>
                          {item.v}
                          {item.accent && (
                            <span aria-hidden="true" style={{
                              width: 5, height: 5, borderRadius: '50%',
                              background: '#4ade80', display: 'inline-block',
                              boxShadow: '0 0 6px #4ade80',
                              animation: 'ping-slow 2s ease-out infinite', flexShrink: 0,
                            }} />
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Meta grid */}
            <AnimatedSection delay={0.34}>
              <div
                className="about-meta-grid"
                style={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px 28px',
                  paddingTop: 24, borderTop: '1px solid var(--border)',
                }}
              >
                {META.map((item) => (
                  <div key={item.label}>
                    <div style={{
                      fontFamily: 'var(--ff-mono)', fontSize: '0.5rem',
                      letterSpacing: '0.22em', color: 'var(--blue)',
                      textTransform: 'uppercase', marginBottom: 5,
                    }}>{item.label}</div>
                    <div style={{
                      fontFamily: 'var(--ff-body)', fontSize: '0.9rem',
                      fontWeight: 600, color: 'var(--white)',
                    }}>{item.val}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

          </div>
        </div>
      </div>
    </section>
  )
}