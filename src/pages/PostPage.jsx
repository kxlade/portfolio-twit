import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Post from '../components/Post'
import { getNonProjectPostBySlug } from '../data/posts'
import { fetchProjects } from '../services/projectService'

export default function PostPage() {
  const { slug } = useParams()
  const [projectResult, setProjectResult] = useState({ slug: null, project: null, error: '' })
  const localPost = getNonProjectPostBySlug(slug)

  useEffect(() => {
    if (localPost) return undefined

    let isCurrent = true
    fetchProjects()
      .then((projects) => {
        if (isCurrent) setProjectResult({ slug, project: projects.find((item) => item.slug === slug) || null, error: '' })
      })
      .catch((requestError) => {
        if (isCurrent) setProjectResult({ slug, project: null, error: requestError.message })
      })
    return () => { isCurrent = false }
  }, [slug, localPost])

  const post = localPost || (projectResult.slug === slug ? projectResult.project : null)

  if (!localPost && projectResult.slug !== slug) return <section className="post-page-state" role="status"><h1>Loading post…</h1></section>
  if (!localPost && projectResult.error) return <section className="post-page-state" role="alert"><h1>Could not load project</h1><p>{projectResult.error}. Check that the API server is running, then refresh.</p><Link className="post-text-link" to="/">Back to feed</Link></section>

  if (!post) {
    return <section className="post-page-state"><h1>Post not found</h1><p>That post may have moved or does not exist.</p><Link className="post-text-link" to="/">Back to feed</Link></section>
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
        <p>Comments will be available when this portfolio is connected to its backend.</p>
      </section>
    </section>
  )
}
