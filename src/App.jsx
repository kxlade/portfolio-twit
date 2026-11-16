import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import ProfileCard from './components/ProfileCard'
import BottomNav from './components/BottomNav'
import Home from './pages/Home'
import AboutMe from './pages/AboutMe'
import PostPage from './pages/PostPage'

import './styles/global.css'
import './styles/layout.css'
import './styles/posts.css'
import './styles/glass.css'
import './styles/mobile.css'

// Buttons that get the light that follows your finger / cursor (see glass.css ::after)
const GLOW_TARGETS = '.btn, .tab, .build-filter, .nav-link, .engagement-action, .about-back'

function useGlassPointerGlow() {
  useEffect(() => {
    const update = (event) => {
      const el = event.target instanceof Element ? event.target.closest(GLOW_TARGETS) : null
      if (!el) return
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${event.clientX - rect.left}px`)
      el.style.setProperty('--my', `${event.clientY - rect.top}px`)
    }
    document.addEventListener('pointermove', update, { passive: true })
    document.addEventListener('pointerdown', update, { passive: true })
    return () => {
      document.removeEventListener('pointermove', update)
      document.removeEventListener('pointerdown', update)
    }
  }, [])
}

export default function App() {
  useGlassPointerGlow()

  return (
    <BrowserRouter>
      <div className="shell">
        <Sidebar />
        <main className="feed-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutMe />} />
            <Route path="/posts/:slug" element={<PostPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <div className="rail">
          <ProfileCard />
        </div>
        <BottomNav />
      </div>
    </BrowserRouter>
  )
}
