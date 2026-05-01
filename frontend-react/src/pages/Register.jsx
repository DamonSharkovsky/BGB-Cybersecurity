import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirm_password: '',
    dob: '',
    gender: '',
  })
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      await signup(formData)
      alert('Registration successful! Please login.')
      navigate('/login')
    } catch (err) {
      setError(err.message || 'Registration failed.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="signup-bg">
      <div
        className="login-container"
        style={{ width: '450px', maxHeight: '90vh', overflowY: 'auto' }}
      >
        <h2 className="login-title">Create Account</h2>
        {error && (
          <p style={{ color: '#d63384', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              name="name"
              type="text"
              className="login-input"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label className={`login-label ${formData.name ? 'active' : ''}`}>First Name</label>
          </div>
          <div className="input-group">
            <input
              name="surname"
              type="text"
              className="login-input"
              value={formData.surname}
              onChange={handleChange}
              required
            />
            <label className={`login-label ${formData.surname ? 'active' : ''}`}>Surname</label>
          </div>
          <div className="input-group">
            <input
              name="email"
              type="email"
              className="login-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label className={`login-label ${formData.email ? 'active' : ''}`}>Email Address</label>
          </div>
          <div className="input-group">
            <input
              name="password"
              type="password"
              className="login-input"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label className={`login-label ${formData.password ? 'active' : ''}`}>Password</label>
          </div>
          <div className="input-group">
            <input
              name="confirm_password"
              type="password"
              className="login-input"
              value={formData.confirm_password}
              onChange={handleChange}
              required
            />
            <label className={`login-label ${formData.confirm_password ? 'active' : ''}`}>
              Confirm Password
            </label>
          </div>
          <div className="input-group">
            <input
              name="dob"
              type="date"
              className="login-input"
              value={formData.dob}
              onChange={handleChange}
              required
            />
            <label className="login-label active">Date of Birth</label>
          </div>
          <div className="input-group">
            <select
              name="gender"
              className="login-input"
              value={formData.gender}
              onChange={handleChange}
              required
              style={{ appearance: 'none' }}
            >
              <option value=""></option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="nonbinary">Non-binary</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
            <label className={`login-label ${formData.gender ? 'active' : ''}`}>Gender</label>
          </div>
          <button type="submit" className="login-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Sign Up'}
          </button>
        </form>
        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem' }}>
          <span>Already have an account? </span>
          <Link to="/login" style={{ color: '#66a6ff', fontWeight: 'bold' }}>
            Login here
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
