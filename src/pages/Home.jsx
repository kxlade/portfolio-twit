import { useState } from 'react'
import Navbar from '../components/Navbar'
import PostFeed from '../components/PostFeed'
import { posts } from '../data/posts'

export default function Home() {
  const [active, setActive] = useState('All')
  const [activeBuildFilter, setActiveBuildFilter] = useState(null)

  const changeCategory = (category) => {
    setActive(category)
    setActiveBuildFilter(null)
  }

  const visible = posts
    .filter((post) => active === 'All' || post.category === active)
    .filter((post) => active !== 'Builds' || !activeBuildFilter || post.subcategory === activeBuildFilter)
    .map((post, index) => ({ post, index }))
    .sort((a, b) => {
      if (active !== 'All' && a.post.pinned !== b.post.pinned) return a.post.pinned ? -1 : 1
      return a.post.order - b.post.order || a.index - b.index
    })
    .map(({ post }) => post)

  return (
    <>
      <Navbar
        active={active}
        onChange={changeCategory}
        activeBuildFilter={activeBuildFilter}
        onBuildFilterChange={setActiveBuildFilter}
      />
      <PostFeed posts={visible} category={active} />
    </>
  )
}
