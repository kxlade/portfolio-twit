import Post from './Post'

export default function PostFeed({ posts }) {
  if (posts.length === 0) {
    return <p style={{ padding: 32, color: 'var(--muted)' }}>Projects in this category is still in progress.</p>
  }
  return (
    <section aria-label="Projects">
      {posts.map((p) =>
        <Post key={p.id} post={p} />
      )}
    </section>
  )
}