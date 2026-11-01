import { useState } from 'react'
import Icon from './Icons'
import { profile } from '../data/posts'
import ProjectPost from './posts/ProjectPost'
import BookPost from './posts/BookPost'
import DevLogPost from './posts/DevLogPost'
import DevelopmentPost from './posts/DevelopmentPost'
import ResourcePost from './posts/ResourcePost'
import { Link } from 'react-router-dom'

export function TagList({ tags = [], className = 'post-tags' }) {
  if (!tags.length) return null
  return <div className={className}>{tags.map((tag) => <span className="chip" key={tag}>{tag}</span>)}</div>
}

function PostContent({ post }) {
  switch (post.type) {
    case 'project': return <ProjectPost post={post} />
    case 'book': return <BookPost post={post} />
    case 'resource': return <ResourcePost post={post} />
    case 'development': return <DevelopmentPost post={post} />
    case 'dev-log': return <DevLogPost post={post} />
    default: return <p className="post-text thought-text">{post.content}</p>
  }
}

export function EngagementActions({ post }) {
  // These local states are a temporary UI preview; backend requests will replace them later.
  const [liked, setLiked] = useState(Boolean(post.engagement?.isLiked))
  const [reposted, setReposted] = useState(false)
  const [bookmarked, setBookmarked] = useState(Boolean(post.engagement?.isBookmarked))
  const [shareMessage, setShareMessage] = useState('')
  const postUrl = `${window.location.origin}/posts/${post.slug}`
  const count = (field) => post.engagement?.[field]

  async function sharePost() {
    setShareMessage('')
    try {
      if (navigator.share) {
        await navigator.share({ title: post.title || 'Post', text: post.content, url: postUrl })
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(postUrl)
        setShareMessage('Link copied')
      } else {
        throw new Error('Clipboard unavailable')
      }
    } catch (error) {
      if (error.name !== 'AbortError') setShareMessage('Unable to share this link')
    }
  }

  return (
    <div className="post-engagement" aria-label="Post actions">
      <Link className="engagement-action" to={`/posts/${post.slug}`} aria-label="Reply" title="Reply">
        <Icon name="reply" /><span>{count('commentsCount') ?? 'Reply'}</span>
      </Link>
      <button className={`engagement-action${reposted ? ' is-active' : ''}`} type="button" aria-label="Repost" aria-pressed={reposted} title="Repost" onClick={() => setReposted((value) => !value)}>
        <Icon name="repost" /><span>{count('repostsCount') ?? ''}</span>
      </button>
      <button className={`engagement-action like-action${liked ? ' is-liked' : ''}`} type="button" aria-label={liked ? 'Unlike' : 'Like'} aria-pressed={liked} title={liked ? 'Unlike' : 'Like'} onClick={() => setLiked((value) => !value)}>
        <Icon name="heart" /><span>{count('likesCount') ?? ''}</span>
      </button>
      <span className="engagement-action view-count" aria-label={count('viewsCount') == null ? 'Views unavailable' : `${count('viewsCount')} views`} title="Views">
        <Icon name="chart" /><span>{count('viewsCount') ?? 'N/A'}</span>
      </span>
      <button className={`engagement-action${bookmarked ? ' is-active' : ''}`} type="button" aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark'} aria-pressed={bookmarked} title={bookmarked ? 'Remove bookmark' : 'Bookmark'} onClick={() => setBookmarked((value) => !value)}>
        <Icon name="bookmark" />
      </button>
      <button className="engagement-action" type="button" aria-label="Share post" title="Share" onClick={sharePost}>
        <Icon name="share" />
      </button>
      {shareMessage && <span className="share-feedback" role="status">{shareMessage}</span>}
    </div>
  )
}

export default function Post({ post, detail = false }) {
  const postType = { 'dev-log': 'Dev Log', development: 'Development', project: 'Project', thought: 'Thought', book: 'Book', resource: 'Resource' }[post.type] || 'Post'
  return (
    <article className={`post post-${post.type}${post.pinned ? ' is-pinned' : ''}${detail ? ' post-detail' : ''}`}>
      <div className="avatar" aria-hidden="true">{profile.handle[0]}</div>
      <div className="post-body">
        {post.pinned && <div className="pinned"><Icon name="pin" size={14} /> Pinned</div>}
        <div className="post-head">
          <span className="post-name">{profile.name}</span>
          <Link className="post-meta post-open-link" to={`/posts/${post.slug}`} aria-label={`Open ${post.title || postType} post`}>
            @{profile.handle} · {postType} · {post.timestamp || post.subcategory || post.category}
          </Link>
        </div>
        {post.draft && <span className="post-draft-badge">Draft copy</span>}
        <PostContent post={post} />
        <EngagementActions post={post} />
      </div>
    </article>
  )
}
