import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './index.css'

/* ── Transition variants ── */
const fadeVariants = {
  initial: { opacity: 0, scale: 0.97 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, scale: 1.03, transition: { duration: 0.4, ease: 'easeIn' } },
}

/* ── Cinematic cross-fade (for S2 → S6) ── */
const cinematicVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.75, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.5, ease: 'easeIn' } },
}

/* ── Floating Hearts ── */
const HEARTS = ['💗', '💕', '💖', '🌸', '💓', '♥️']
function FloatingHearts({ count = 12 }) {
  const items = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${8 + (i * 7.5) % 84}%`,
    delay: `${(i * 0.9) % 6}s`,
    duration: `${4 + (i * 0.7) % 4}s`,
    size: `${14 + (i * 3) % 12}px`,
    heart: HEARTS[i % HEARTS.length],
    top: `${60 + (i * 4) % 30}%`,
  }))
  return (
    <div className="hearts-container">
      {items.map(h => (
        <span key={h.id} className="floating-heart" style={{
          left: h.left, top: h.top, fontSize: h.size,
          animationDuration: h.duration, animationDelay: h.delay,
        }}>{h.heart}</span>
      ))}
    </div>
  )
}

/* ── Back Button ── */
function BackBtn({ onClick }) {
  return (
    <button className="back-btn" onClick={onClick} aria-label="Go back">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </button>
  )
}

/* ════════════════════════════════════════
   SCREEN 1 — LANDING
════════════════════════════════════════ */
function Screen1({ onNext }) {
  return (
    <motion.div className="screen paper-light screen1" key="s1"
      variants={fadeVariants} initial="initial" animate="animate" exit="exit">

      <FloatingHearts count={14} />

      {/* Decorative bg petals */}
      <div className="bg-petal" style={{ width: 200, height: 200, top: -60, right: -60, opacity: 0.07 }} />
      <div className="bg-petal" style={{ width: 150, height: 150, bottom: 80, left: -40, opacity: 0.05 }} />

      {/* Hero illustration */}
      <motion.div className="s1-graphic-wrap"
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}>
        <img src="/landing.png" alt="Mother and Daughter"
          style={{
            width: '100%', height: '100%', objectFit: 'contain',
            filter: 'drop-shadow(0 12px 32px rgba(181,25,58,0.18))'
          }} />
      </motion.div>

      {/* Ribbon */}
      <motion.div className="s1-ribbon"
        initial={{ opacity: 0, scaleX: 0.7 }} animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.45, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}>
        <span className="s1-ribbon-text">Mother's Day</span>
      </motion.div>

      <motion.p className="s1-tagline"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}>
        A little something made with love 💕
      </motion.p>

      {/* Nav arrow */}
      <motion.button className="s1-nav-btn" onClick={onNext} aria-label="Next"
        initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
          stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </motion.button>
    </motion.div>
  )
}

/* ════════════════════════════════════════
   SCREEN 2 — MENU
════════════════════════════════════════ */
const menuIcons = [
  { src: '/cam.png', label: 'Photos', screen: 'gallery' },
  { src: '/bouquet.png', label: 'Flowers', screen: 'bouquet' },
  { src: '/letter.png', label: 'Letter', screen: 'letter' },
]

function Screen2({ onNav }) {
  return (
    <motion.div className="screen paper-light screen2" key="s2"
      variants={fadeVariants} initial="initial" animate="animate" exit="exit">

      <FloatingHearts count={8} />

      <motion.h1 className="s2-header"
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.55 }}>
        this is for you mom!
      </motion.h1>

      <motion.div className="s2-divider"
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }} />

      {/* Gift Icons */}
      <div className="s2-icons-row">
        {menuIcons.map((ic, i) => (
          <motion.button key={ic.screen} className="s2-icon-btn"
            onClick={() => onNav(ic.screen)}
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + i * 0.12, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            whileHover={{ scale: 1.12, y: -6 }}
            whileTap={{ scale: 0.88 }}>
            <img className="s2-icon-img" src={ic.src} alt={ic.label} />
            <span className="s2-icon-label">{ic.label}</span>
          </motion.button>
        ))}
      </div>

      <motion.p className="s2-footer"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.75, duration: 0.5 }}>
        click any gift to open it ✨
      </motion.p>

      {/* ── Finale Trigger Section ── */}
      <motion.p className="s2-surprise-hint"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.6 }}>
        click on this button for the last surprise
      </motion.p>

      <motion.button
        id="finale-heart-btn"
        className="s2-finale-heart"
        onClick={() => onNav('finale')}
        aria-label="Last surprise"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        /* Float + Beat — combined via keyframes in CSS, Framer handles whileHover */
        whileHover={{ scale: 1.18 }}
        whileTap={{ scale: 0.9 }}>
        {/* 3D-styled heart SVG */}
        <svg className="finale-heart-svg" viewBox="0 0 100 92" xmlns="http://www.w3.org/2000/svg">
          {/* Shadow layer */}
          <path d="M50 84 C50 84 8 54 8 30 C8 16 18 6 30 6 C38 6 45 11 50 18 C55 11 62 6 70 6 C82 6 92 16 92 30 C92 54 50 84 50 84Z"
            fill="rgba(80,0,20,0.35)" transform="translate(2,5)" />
          {/* Deep base */}
          <path d="M50 84 C50 84 8 54 8 30 C8 16 18 6 30 6 C38 6 45 11 50 18 C55 11 62 6 70 6 C82 6 92 16 92 30 C92 54 50 84 50 84Z"
            fill="#8b0a28" />
          {/* Mid layer */}
          <path d="M50 80 C50 80 11 52 11 30 C11 18 20 9 30 9 C38 9 45 14 50 21 C55 14 62 9 70 9 C80 9 89 18 89 30 C89 52 50 80 50 80Z"
            fill="#c0163e" />
          {/* Main bright fill */}
          <path d="M50 75 C50 75 14 50 14 30 C14 20 22 12 31 12 C39 12 45 17 50 24 C55 17 61 12 69 12 C78 12 86 20 86 30 C86 50 50 75 50 75Z"
            fill="#e8204d" />
          {/* Highlight sheen */}
          <path d="M32 14 C25 16 19 23 18 31 C22 20 29 14 38 13 C36 13 34 13 32 14Z"
            fill="rgba(255,255,255,0.35)" />
          <ellipse cx="36" cy="20" rx="8" ry="5" fill="rgba(255,255,255,0.22)" transform="rotate(-20,36,20)" />
        </svg>
      </motion.button>
    </motion.div>
  )
}

/* ════════════════════════════════════════
   SCREEN 3 — GALLERY
════════════════════════════════════════ */
const POLAROIDS = [
  { src: '/img1.jpeg', w: 140, h: 140, top: '22%', left: '5%', rotate: -6, z: 3 },
  { src: '/img2.jpeg', w: 130, h: 130, top: '18%', left: '48%', rotate: 5, z: 2 },
  { src: '/img3.jpeg', w: 145, h: 145, top: '38%', left: '20%', rotate: -3, z: 4 },
  { src: '/img4.jpeg', w: 132, h: 132, top: '58%', left: '2%', rotate: 7, z: 1 },
  { src: '/img5.jpeg', w: 138, h: 138, top: '54%', left: '45%', rotate: -5, z: 5 },
]

function Screen3({ onBack }) {
  return (
    <motion.div className="screen paper-dark screen3" key="s3"
      variants={fadeVariants} initial="initial" animate="animate" exit="exit">

      {/* Header */}
      <motion.div className="s3-header"
        initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15, duration: 0.6 }}>
        <div className="s3-love">I LOVE</div>
        <div className="s3-you">You</div>
      </motion.div>

      {/* Polaroid collage */}
      <div className="s3-collage">
        {POLAROIDS.map((p, i) => (
          <motion.div key={i} className="polaroid"
            style={{
              width: p.w, height: p.h + 28, top: p.top, left: p.left, zIndex: p.z,
              transform: `rotate(${p.rotate}deg)`
            }}
            initial={{ opacity: 0, scale: 0.6, rotate: p.rotate - 15 }}
            animate={{ opacity: 1, scale: 1, rotate: p.rotate }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
            whileHover={{ scale: 1.1, rotate: 0, zIndex: 20 }}>
            <img src={p.src} alt={`Memory ${i + 1}`}
              style={{ width: p.w, height: p.h, objectFit: 'cover', display: 'block' }} />
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <motion.div className="s3-footer"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}>
        <p className="s3-footer-text">
          To the strongest woman I know,<br />
          <strong style={{ color: '#f8b4c8' }}>Happy Mother's Day! 🌸</strong>
        </p>
      </motion.div>

      <BackBtn onClick={onBack} />
    </motion.div>
  )
}

/* ════════════════════════════════════════
   SCREEN 4 — BOUQUET
════════════════════════════════════════ */
function Screen4({ onBack }) {
  return (
    <motion.div className="screen paper-light screen4" key="s4"
      variants={fadeVariants} initial="initial" animate="animate" exit="exit">

      <FloatingHearts count={10} />

      <motion.h1 className="s4-header"
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.55 }}>
        flower for you 🌸
      </motion.h1>

      <motion.div className="s4-flower-wrap"
        initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.65, ease: [0.34, 1.56, 0.64, 1] }}>
        <img className="s4-flower-img" src="/flower.png" alt="Flower Bouquet" />
      </motion.div>

      <motion.p className="s4-note"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}>
        Because you deserve all the flowers 💐
      </motion.p>

      <BackBtn onClick={onBack} />
    </motion.div>
  )
}

/* ════════════════════════════════════════
   SCREEN 5 — LETTER  (reverted — clean)
════════════════════════════════════════ */
const LETTER_TEXT = `If I had a thousand lives to live, I would choose you to be my mom every single time, without a second thought. Because even in every different version of me, you'd still be the one I'd need.
You are the heart I come from. Onek Onek online ador and bhalobasha mummaaaa
Love you Mummaaaa ❤️❤️❤️❤️💗💗💗`

function TypingText({ text, delay = 0.5 }) {
  const lines = text.split('\n')
  return (
    <>
      {lines.map((line, lineIdx) => {
        const words = line.split(' ')
        return (
          <span key={lineIdx} style={{ display: 'block', minHeight: line.trim() === '' ? '1em' : 'auto' }}>
            {words.map((word, wordIdx) => (
              <motion.span
                key={`${lineIdx}-${wordIdx}`}
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{
                  delay: delay + (lineIdx * 5 + wordIdx) * 0.04,
                  duration: 0.3
                }}
              >
                {word}{' '}
              </motion.span>
            ))}
          </span>
        )
      })}
    </>
  )
}

function Screen5({ onBack }) {
  return (
    <motion.div className="screen paper-light screen5" key="s5"
      variants={fadeVariants} initial="initial" animate="animate" exit="exit">

      <FloatingHearts count={6} />

      <motion.h1 className="s5-header"
        initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}>
        For You Mom
      </motion.h1>

      <motion.div className="s5-letter-card"
        initial={{ opacity: 0, y: 30, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}>

        <p className="s5-letter-text">
          <TypingText text={LETTER_TEXT} delay={0.55} />
        </p>

        <motion.span className="s5-signature"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 0.8 }}>
          — Your baban 🌹
        </motion.span>
      </motion.div>

      <BackBtn onClick={onBack} />
    </motion.div>
  )
}

/* ════════════════════════════════════════
   SCREEN 6 — GRAND FINALE
════════════════════════════════════════ */

/* Love-cracker confetti particles */
const CRACKER_PARTICLES = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  emoji: ['💗', '💕', '💖', '❤️', '🌸', '💓', '♥️', '🌺', '💘', '✨'][i % 10],
  x: `${Math.random() * 100}%`,
  delay: Math.random() * 2.5,
  duration: 3 + Math.random() * 3,
  size: 14 + Math.floor(Math.random() * 16),
  startY: `${-10 + Math.random() * 30}%`,
}))

function LoveCracker() {
  /* We use simple divs with CSS animations for maximum performance */
  return (
    <div className="love-cracker" aria-hidden="true">
      {CRACKER_PARTICLES.map(p => (
        <div
          key={p.id}
          className="cracker-particle"
          style={{
            left: p.x,
            fontSize: `${p.size}px`,
            top: p.startY,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}>
          {p.emoji}
        </div>
      ))}
    </div>
  )
}

function Screen6({ onBack }) {
  return (
    <motion.div className="screen screen6" key="s6"
      variants={cinematicVariants} initial="initial" animate="animate" exit="exit">

      {/* Love cracker burst background */}
      <LoveCracker />

      {/* Radial glow blob behind header */}
      <div className="s6-glow-blob" />

      {/* Header */}
      <motion.div className="s6-header-wrap"
        initial={{ opacity: 0, y: -30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}>
        <h1 className="s6-header">HAPPY<br />MOTHER'S DAY MUMMA</h1>
      </motion.div>

      {/* Subtitle */}
      <motion.p className="s6-subtitle"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.7 }}>
        with every heartbeat, always 💗
      </motion.p>

      {/* QR Code */}
      <motion.div className="s6-qr-wrap"
        initial={{ opacity: 0, scale: 0.7, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}>
        <a href="https://digibouquet.vercel.app/bouquet/9627b845-1b7e-4096-962a-59df9307a721"
          target="_blank" rel="noopener noreferrer"
          aria-label="Open surprise link" className="s6-qr-link">
          <img src="/qrcode.png" alt="QR Code" className="s6-qr-img" />
          <span className="s6-qr-caption">click me 🎁</span>
        </a>
      </motion.div>

      <BackBtn onClick={onBack} />
    </motion.div>
  )
}

/* ════════════════════════════════════════
   ROOT APP
════════════════════════════════════════ */
export default function App() {
  const [screen, setScreen] = useState('landing')

  const goTo = (s) => setScreen(s)

  return (
    <div className="phone-shell">
      <AnimatePresence mode="wait">
        {screen === 'landing' && <Screen1 key="landing" onNext={() => goTo('menu')} />}
        {screen === 'menu' && <Screen2 key="menu" onNav={goTo} />}
        {screen === 'gallery' && <Screen3 key="gallery" onBack={() => goTo('menu')} />}
        {screen === 'bouquet' && <Screen4 key="bouquet" onBack={() => goTo('menu')} />}
        {screen === 'letter' && <Screen5 key="letter" onBack={() => goTo('menu')} />}
        {screen === 'finale' && <Screen6 key="finale" onBack={() => goTo('menu')} />}
      </AnimatePresence>
    </div>
  )
}
