import { useState } from 'react'
import Icon from './Icons'
import { profile } from '../data/posts'

function hostname(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

function ProjectPost({ post }) {
  const [imageFailed, setImageFailed] = useState(false)
  const hasImage = post.image && !imageFailed

  return (
    <>
      <h2 className="post-title">{post.title}</h2>
      <p className="post-text">{post.content}</p>
      <div className={`project-preview${hasImage ? ' has-image' : ''}`}>
        {hasImage
          ? <img src={post.image} alt={`Screenshot of ${post.title}`} loading="lazy" onError={() => setImageFailed(true)} />
          : <span>{post.title} · Screenshot not provided</span>}
      </div>
      <TagList tags={post.technologies} className="post-tags" />
      <div className="post-links">
        {post.live && <a className="btn post-cta" href={post.live} target="_blank" rel="noreferrer">Visit website</a>}
        {post.github && <a className="post-text-link" href={post.github} target="_blank" rel="noreferrer">View source</a>}
      </div>
    </>
  )
}

function TagList({ tags = [], className = 'post-tags' }) {
  if (!tags.length) return null
  return <div className={className}>{tags.map((tag) => <span className="chip" key={tag}>{tag}</span>)}</div>
}

function BookPost({ post }) {
  return (
    <div className="book-post">
      <div className="book-heading">
        <span className="book-kicker">Reading candidate</span>
        <h2>{post.title}</h2>
        <p>by {post.author}</p>
      </div>
      <div className="book-details">
        <span><strong>Area</strong>{post.bookCategory}</span>
        <span><strong>Reading status</strong>{post.readingStatus}</span>
        <span><strong>Recommendation</strong>{post.recommendation}</span>
      </div>
      <p className="post-text">{post.subject}</p>
      <div className="book-draft">
        <strong>{post.reviewDraftLabel}</strong>
        <p>{post.reviewDraft}</p>
      </div>
    </div>
  )
}

function ResourcePost({ post }) {
  return (
    <>
      <h2 className="post-title">{post.title}</h2>
      {post.content && <p className="post-text">{post.content}</p>}
      {post.whyUseful && <p className="post-text"><strong>Why it’s useful:</strong> {post.whyUseful}</p>}
      <TagList tags={post.tags} />
      {post.url && (
        <a className="resource-preview" href={post.url} target="_blank" rel="noreferrer">
          <span>{hostname(post.url)}</span>
          <strong>Open resource ↗</strong>
        </a>
      )}
    </>
  )
}

function DevelopmentPost({ post }) {
  return (
    <>
      {post.title && <h2 className="post-title">{post.title}</h2>}
      {post.content && <p className="post-text">{post.content}</p>}
      {post.whatLearned && <p className="post-text"><strong>Exploring:</strong> {post.whatLearned}</p>}
      <TagList tags={post.tags} />
    </>
  )
}

function DevLogPost({ post }) {
  const entries = [
    ['Worked on', post.workedOn],
    ['Learned', post.learned],
    ['Challenge', post.challenge],
    ['Next', post.nextExplore],
  ].filter(([, value]) => value)

  return (
    <>
      {post.title && <h2 className="post-title">{post.title}</h2>}
      {post.content && <p className="post-text">{post.content}</p>}
      <dl className="dev-log-details">
        {entries.map(([label, value]) => (
          <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
        ))}
      </dl>
    </>
  )
}

function PostContent({ post }) {
  switch (post.type) {
    case 'project':
      return <ProjectPost post={post} />
    case 'book':
      return <BookPost post={post} />
    case 'resource':
      return <ResourcePost post={post} />
    case 'development':
      return <DevelopmentPost post={post} />
    case 'dev-log':
      return <DevLogPost post={post} />
    case 'thought':
    default:
      return <p className="post-text thought-text">{post.content}</p>
  }
}

export default function Post({ post }) {
  const postType = {
    'dev-log': 'Dev Log',
    development: 'Development',
    project: 'Project',
    thought: 'Thought',
    book: 'Book',
    resource: 'Resource',
  }[post.type] || 'Post'

  return (
    <article className={`post post-${post.type}${post.pinned ? ' is-pinned' : ''}`}>
      <div className="avatar" aria-hidden="true">{profile.handle[0]}</div>
      <div className="post-body">
        {post.pinned && <div className="pinned"><Icon name="pin" size={14} /> Pinned</div>}
        <div className="post-head">
          <span className="post-name">{profile.name}</span>
          <span className="post-meta">@{profile.handle} · {postType} · {post.timestamp || post.subcategory || post.category}</span>
        </div>
        {post.draft && <span className="post-draft-badge">Draft copy</span>}
        <PostContent post={post} />
      </div>
    </article>
  )
}
