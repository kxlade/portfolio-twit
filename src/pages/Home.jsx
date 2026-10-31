import { useState } from 'react'
import Navbar from '../components/Navbar'
import PostFeed from '../components/PostFeed'
import { posts } from '../data/posts'

export default function Home() {
  const [active, setActive] = useState('All')

  // pinned post always first, then newest
  const visible = [...posts]
    .filter((p) => active === 'All' || p.category === active || p.pinned)
    .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || new Date(b.date) - new Date(a.date))

  return (
    <>
      <Navbar active={active} onChange={setActive} />
      <PostFeed posts={visible} />
    </>
  )
}