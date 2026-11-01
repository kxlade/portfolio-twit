import { TagList } from '../Post'

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

export default DevelopmentPost
