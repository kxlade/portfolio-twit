import { TagList } from "../Post"

function hostname(url) {
    try {
        return new URL(url).hostname.replace(/^www\./, '')
    } catch {
        return url
    }
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

export default ResourcePost