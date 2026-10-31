import Post from './Post'

export default function PostFeed({ posts, category }) {
  if (posts.length === 0) {
    return (
      <p className="feed-empty" role="status">
        No posts in {category === 'All' ? 'the feed' : category} yet. New entries can be added in the portfolio data.
      </p>
    )
  }

  return (
    <section className="post-feed" aria-label="Portfolio feed">
      {posts.map((post) => <Post key={post.id} post={post} />)}
    </section>
  )
}
