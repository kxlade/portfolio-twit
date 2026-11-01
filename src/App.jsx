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

export default function App() {
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
