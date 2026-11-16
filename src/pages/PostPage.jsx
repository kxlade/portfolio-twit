import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Post from '../components/Post'
import { getNonProjectPostBySlug } from '../data/posts'
import { fetchProjects } from '../services/projectApi'
import { getFallbackProjectBySlug } from '../services/projectService'

export default function PostPage() {
  const { slug } = useParams()
  const localNonProject = getNonProjectPostBySlug(slug)
  const fallbackProject = getFallbackProjectBySlug(slug)
  const initialPost = localNonProject || fallbackProject

  const [projectResult, setProjectResult] = useState({
    slug: initialPost ? slug : null,
    project: fallbackProject || null,
    error: '',
  })

  useEffect(() => {
    // If this is a non-project post, all content is already local and verified
    if (localNonProject) return undefined

    let isCurrent = true
    fetchProjects()
      .then((projects) => {
        if (isCurrent && Array.isArray(projects)) {
          const matched = projects.find((item) => item.slug === slug || item.id === slug) || null
          setProjectResult({ slug, project: matched, error: '' })
        }
      })
      .catch((requestError) => {
        if (isCurrent) {
          setProjectResult((prev) => ({
            slug,
            project: prev.project || fallbackProject || null,
            error: prev.project || fallbackProject ? '' : requestError.message,
          }))
        }
      })
    return () => { isCurrent = false }
  }, [slug, localNonProject, fallbackProject])

  const post = localNonProject || (projectResult.slug === slug ? projectResult.project : fallbackProject)

  if (!post && projectResult.slug !== slug && !projectResult.error) {
    return (
      <section className="post-page-state" role="status">
        <h1>Loading post…</h1>
      </section>
    )
  }

  if (!post && projectResult.error) {
    return (
      <section className="post-page-state" role="alert">
        <h1>Could not load post</h1>
        <p>{projectResult.error}. Check that the API server is running, then refresh.</p>
        <Link className="post-text-link" to="/">Back to feed</Link>
      </section>
    )
  }

  if (!post) {
    return (
      <section className="post-page-state">
        <h1>Post not found</h1>
        <p>That post may have moved or does not exist.</p>
        <Link className="post-text-link" to="/">Back to feed</Link>
      </section>
    )
  }

  return (
    <section className="individual-post-page">
      <header className="about-header">
        <Link className="about-back" to="/" aria-label="Back to feed">←</Link>
        <div><h1>Post</h1><span>Conversation</span></div>
      </header>
      <Post post={post} detail />
      <section className="discussion-placeholder" aria-labelledby="discussion-title">
        <h2 id="discussion-title">Discussion</h2>
        <p>Comments will be available soon!</p>
      </section>
    </section>
  )
}
