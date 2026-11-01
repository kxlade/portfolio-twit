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

export default BookPost;