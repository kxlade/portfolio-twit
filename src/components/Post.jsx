import { useState } from 'react'
import Icon from './Icons'
import { profile } from '../data/posts'

const compact = new Intl.NumberFormat('en', { notation: 'compact' })

// Relative time from post.date: now, 5m, 3h, 2d, then "Oct 30"
function timeAgo(iso) {
  const d = new Date(iso)
  const mins = Math.floor((Date.now() - d.getTime()) / 60000)
  if (mins < 1) return 'now'
  if (mins < 60) return `${mins}m`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h`
  const days = Math.floor(hrs / 24)
  if (days < 7) return `${days}d`
  const sameYear = d.getFullYear() === new Date().getFullYear()
  return d.toLocaleDateString('en', { month: 'short', day: 'numeric', ...(sameYear ? {} : { year: 'numeric' }) })
}

// Placeholder engagement. Add `stats: { replies, reposts, likes, views }` to a post to override.
function fakeStats(id) {
  const n = Number(id) || 1
  return { replies: (n * 3) % 9 + 1, reposts: (n * 5) % 7 + 1, likes: (n * 37) % 90 + 10, views: (n * 613) % 3000 + 400 }
}

function hostname(url) {
  try { return new URL(url).hostname.replace(/^www\./, '') } catch { return url }
}

function ProjectMedia({ post }) {
  const [failed, setFailed] = useState(false)
  const showImage = post.image && !failed
  return (
    <>
      <div className={`media${showImage ? ' has-image' : ''}`}>
        {showImage
          ? <img src={post.image} alt={`${post.title} screenshot`} loading="lazy" onError={() => setFailed(true)} />
          : <h4 className="media-title">{post.title}</h4>}
      </div>
      {post.technologies?.length > 0 && (
        <div className="post-tags">
          {post.technologies.map((t) => <span className="chip" key={t}>{t}</span>)}
        </div>
      )}
    </>
  )
}

function Body({ post }) {
  switch (post.type) {
    case 'project':
      return (
        <>
          <h3 className="post-title">{post.title}</h3>
          <p className="post-text">{post.content}</p>
          <ProjectMedia post={post} />
        </>
      )
    case 'book':
      return (
        <>
          <p className="post-text">{post.content}</p>
          <div className="media book-card">
            <h4 className="media-title">{post.title}</h4>
            <span>by {post.author}</span>
          </div>
        </>
      )
    case 'resource':
      return (
        <>
          <p className="post-text">{post.content}</p>
          <a className="link-card" href={post.link} target="_blank" rel="noreferrer">
            <strong>{post.title}</strong>
            <span>{hostname(post.link)}</span>
          </a>
        </>
      )
    default: // 'thought' and anything else
      return <p className="post-text">{post.content}</p>
  }
}

export default function Post({ post }) {
  const [liked, setLiked] = useState(false)
  const stats = post.stats ?? fakeStats(post.id)

  return (
    <article className={`post${post.pinned ? ' is-pinned' : ''}`}>
      {post.pinned && (
        <div className="pinned"><Icon name="pin" size={14} /> Pinned</div>
      )}

      <div className="avatar" aria-hidden="true">{profile.handle[0]}</div>

      <div className="post-body">
        <div className="post-head">
          <span className="post-name">{profile.name}</span>
          <span className="post-meta">@{profile.handle} · {timeAgo(post.date)}</span>
        </div>

        <Body post={post} />

        <div className="actions">
          <span className="action"><Icon name="reply" size={18} />{compact.format(stats.replies)}</span>
          <span className="action"><Icon name="repost" size={18} />{compact.format(stats.reposts)}</span>
          <button
            type="button"
            className={`action${liked ? ' is-on' : ''}`}
            aria-pressed={liked}
            aria-label="Like"
            onClick={() => setLiked((v) => !v)}
          >
            <Icon name="heart" size={18} />
            {compact.format(stats.likes + (liked ? 1 : 0))}
          </button>
          <span className="action"><Icon name="chart" size={18} />{compact.format(stats.views)}</span>
          {post.live && <a className="action action-link" href={post.live} target="_blank" rel="noreferrer">Live</a>}
          {post.github && <a className="action action-link" href={post.github} target="_blank" rel="noreferrer">Code</a>}
        </div>
      </div>
    </article>
  )
}