import PostCard from './PostCard'

const PostFeed = ({ posts, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="posts">
        <p className="placeholder">Loading posts...</p>
        {/* We could add skeletons here later */}
      </div>
    )
  }

  if (error) {
    return (
      <div className="posts">
        <p className="placeholder" style={{ color: '#d63384' }}>
          Error: {error}
        </p>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="posts">
        <p className="placeholder">No posts found. Be the first to share!</p>
      </div>
    )
  }

  return (
    <div className="posts">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

export default PostFeed
