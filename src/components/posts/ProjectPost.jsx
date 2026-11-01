import { useState } from 'react'
import { TagList } from '../Post'


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
                {post.liveUrl && <a className="btn post-cta" href={post.liveUrl} target="_blank" rel="noreferrer">Visit website</a>}
                {post.githubUrl && <a className="post-text-link" href={post.githubUrl} target="_blank" rel="noreferrer">View source</a>}
            </div>
        </>
    )
}

export default ProjectPost
