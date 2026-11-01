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

export default DevLogPost