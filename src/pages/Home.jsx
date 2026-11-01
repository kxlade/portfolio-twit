import { useState } from 'react'
import Navbar from '../components/Navbar'
import PostFeed from '../components/PostFeed'
import { getPosts } from '../data/posts'

export default function Home() {
  const [active, setActive] = useState('All')
  const [activeBuildFilter, setActiveBuildFilter] = useState(null)

  const changeCategory = (category) => {
    setActive(category)
    setActiveBuildFilter(null)
  }

const visible = [...getPosts()]
  .filter((post) =>
    (active === 'All' || post.category === active) &&
    (active !== 'Builds' || !activeBuildFilter || post.subcategory === activeBuildFilter)
  )
  .sort((a, b) => {
    if (a.pinned !== b.pinned) {
      return Number(b.pinned) - Number(a.pinned)
    }

    const aDate = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
    const bDate = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
    return bDate - aDate
  })

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
