import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="signup-bg">
      <div className="login-container">
        <h2 className="login-title">Welcome Back</h2>
        {error && (
          <p style={{ color: '#d63384', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className={`login-label ${email ? 'active' : ''}`}>Email</label>
          </div>
          <div className="input-group">
            <input
              type="password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className={`login-label ${password ? 'active' : ''}`}>Password</label>
          </div>
          <button type="submit" className="login-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem' }}>
          <span>Don't have an account? </span>
          <Link to="/register" style={{ color: '#66a6ff', fontWeight: 'bold' }}>
            Sign up here
          </Link>
        </div>
        <button
          className="create-btn"
          onClick={() => navigate('/')}
          style={{ width: '100%', marginTop: '1rem', background: 'rgba(255,255,255,0.2)' }}
        >
          ← Back to Home
        </button>
      </div>
    </div>
  )
}

export default Login
