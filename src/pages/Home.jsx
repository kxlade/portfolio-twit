import { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import PostFeed from '../components/PostFeed'
import { nonProjectPosts } from '../data/posts'
import { fetchProjects } from '../services/projectService'

export default function Home() {
  const [active, setActive] = useState('All')
  const [activeBuildFilter, setActiveBuildFilter] = useState(null)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isCurrent = true
    fetchProjects()
      .then((items) => { if (isCurrent) setProjects(items) })
      .catch((requestError) => { if (isCurrent) setError(requestError.message) })
      .finally(() => { if (isCurrent) setLoading(false) })
    return () => { isCurrent = false }
  }, [])

  const changeCategory = (category) => {
    setActive(category)
    setActiveBuildFilter(null)
  }

  const visible = useMemo(() => [...nonProjectPosts, ...projects]
    .filter((post) =>
      (active === 'All' || post.category === active) &&
      (active !== 'Builds' || !activeBuildFilter || post.subcategory === activeBuildFilter)
    )
    .sort((a, b) => {
      if (a.pinned !== b.pinned) {
        return Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)) ||
          new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0)
      }

      const aDate = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
      const bDate = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
      return bDate - aDate
    }), [active, activeBuildFilter, projects])

  return (
    <>
      <Navbar
        active={active}
        onChange={changeCategory}
        activeBuildFilter={activeBuildFilter}
        onBuildFilterChange={setActiveBuildFilter}
      />
      {loading && <p className="feed-empty" role="status">Loading projects…</p>}
      {error && <p className="feed-empty" role="alert">Projects could not be loaded: {error}. Check that the API server is running, then refresh.</p>}
      {!loading && !error && <PostFeed posts={visible} category={active} />}
    </>
  )
}
