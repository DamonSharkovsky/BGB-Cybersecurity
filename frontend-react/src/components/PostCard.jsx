const PostCard = ({ post }) => {
  const { title, body, type, author_name, created_at, likes, comments_count } = post

  const getTypeClass = (type) => {
    switch (type?.toLowerCase()) {
      case 'scam alert':
        return 'scam-alert'
      case 'question':
        return 'question'
      case 'warning':
        return 'warning'
      default:
        return ''
    }
  }

  return (
    <div className="post">
      <div className="post-header">
        <span className={`post-type ${getTypeClass(type)}`}>{type || 'Post'}</span>
        <div className="post-meta">
          Posted by {author_name || 'Anonymous'} • {new Date(created_at).toLocaleDateString()}
        </div>
      </div>
      <div className="post-body">
        <h3 className="post-title">{title}</h3>
        <p className="post-preview">{body}</p>
      </div>
      <div className="post-footer">
        <div className="post-stats">
          <div className="stat">
            <span>👍</span> {likes || 0}
          </div>
          <div className="stat">
            <span>💬</span> {comments_count || 0}
          </div>
        </div>
        <button className="nav-link" style={{ color: '#667eea', fontWeight: '600' }}>
          Read More →
        </button>
      </div>
    </div>
  )
}

export default PostCard
