import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import PostFeed from '@/components/PostFeed'
import Modal from '@/components/Modal'
import { usePosts } from '@/hooks/usePosts'
import { useHomeData } from '@/hooks/useHomeData'
import { useAuth } from '@/context/AuthContext'
import { Link } from 'react-router-dom'

const Home = () => {
  const { posts, isLoading: postsLoading, error: postsError, addPost } = usePosts()
  const { dashboardData, isLoading: dashLoading } = useHomeData()
  const { user } = useAuth()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newPost, setNewPost] = useState({ title: '', body: '', type: 'Scam Alert' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCreatePost = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await addPost(newPost)
      setIsModalOpen(false)
      setNewPost({ title: '', body: '', type: 'Scam Alert' })
    } catch (err) {
      alert(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <main className="main-content">
          <div className="tabs">
            <button className="tab active">All Posts</button>
            <button className="tab">Community</button>
            <button className="tab">News Reports</button>
          </div>

          <div className="tab-section">
            <div className="create-post" onClick={() => setIsModalOpen(true)}>
              <h3>Share Your Experience or Ask a Question</h3>
              <p>Help protect your community by reporting AI scams or asking about suspicious activity</p>
              <button className="create-btn">+ Create New Post</button>
            </div>

            <PostFeed posts={posts} isLoading={postsLoading} error={postsError} />
          </div>
        </main>

        <aside className="sidebar">
          <div className="widget">
            <h3 className="widget-title">Trending Threats</h3>
            {dashLoading ? (
              <p>Loading...</p>
            ) : (
              dashboardData?.trending_threats?.map((threat, i) => (
                <div key={i} className="trending-item">
                  <span className="trending-text">{threat.threat_type}</span>
                  <span className="trending-count">{threat.report_count} reports</span>
                </div>
              ))
            )}
          </div>

          <div className="widget">
            <h3 className="widget-title">Daily Safety Tip</h3>
            {dashLoading ? (
              <p>Loading...</p>
            ) : (
              <div className="safety-tip">
                <div className="tip-title">{dashboardData?.safety_tip?.title}</div>
                <div className="tip-text">{dashboardData?.safety_tip?.content}</div>
              </div>
            )}
          </div>

          <div className="widget">
            <h3 className="widget-title">Quick Tools</h3>
            <Link to="/tools/scanner" className="create-btn" style={{ display: 'block', textDecoration: 'none', textAlign: 'center', marginBottom: '1rem' }}>
              Check Suspicious Link
            </Link>
            <button className="create-btn" style={{ width: '100%', marginBottom: '1rem' }}>
              Analyze Voice Message
            </button>
            <button className="create-btn" style={{ width: '100%' }}>Report Scam</button>
          </div>
        </aside>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Post"
      >
        <form onSubmit={handleCreatePost}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Type</label>
            <select
              style={{ width: '100%', padding: '0.7rem', borderRadius: '6px', border: '1px solid #ddd' }}
              value={newPost.type}
              onChange={(e) => setNewPost({ ...newPost, type: e.target.value })}
            >
              <option value="Scam Alert">Scam Alert</option>
              <option value="Question">Question</option>
              <option value="Warning">Warning</option>
            </select>
          </div>
          <input
            type="text"
            id="postTitle"
            placeholder="Enter a headline..."
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            required
          />
          <textarea
            id="postBody"
            rows="6"
            placeholder="Describe your experience or question..."
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
            required
          />
          <button type="submit" className="create-btn" style={{ width: '100%' }} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Post'}
          </button>
        </form>
      </Modal>
    </>
  )
}

export default Home
