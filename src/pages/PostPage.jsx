import { Link, useParams } from 'react-router-dom'
import Post from '../components/Post'
import { getPostBySlug } from '../data/posts'

export default function PostPage() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

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
