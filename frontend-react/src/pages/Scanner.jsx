import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import { useThreatScanner } from '@/hooks/useThreatScanner'

const Scanner = () => {
  const [url, setUrl] = useState('')
  const [question, setQuestion] = useState('')
  const {
    scanResult,
    aiAnalysis,
    isScanning,
    isAnalyzing,
    error,
    scanUrl,
    analyzeThreat,
    clearResults,
  } = useThreatScanner()

  const handleScan = async (e) => {
    e.preventDefault()
    try {
      await scanUrl(url)
    } catch (err) {
      // Error handled by hook
    }
  }

  const handleAnalyze = async (e) => {
    e.preventDefault()
    try {
      await analyzeThreat(question)
    } catch (err) {
      // Error handled by hook
    }
  }

  return (
    <>
      <Navbar />
      <div className="container" style={{ gridTemplateColumns: '1fr' }}>
        <main className="main-content" style={{ padding: '2rem' }}>
          <h1>Cybersecurity Threat Tools</h1>
          <p style={{ color: '#666', marginBottom: '2rem' }}>
            Use our AI-powered tools to check for malicious links or analyze suspicious messages.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {/* URL Scanner */}
            <section className="widget" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <h3 className="widget-title">URL Vulnerability Scanner</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
                Enter a suspicious URL to check it against our security database.
              </p>
              <form onSubmit={handleScan}>
                <div className="input-group">
                  <input
                    type="url"
                    className="login-input"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    style={{ background: '#f8f9fa', border: '1px solid #ddd' }}
                  />
                </div>
                <button type="submit" className="create-btn" style={{ width: '100%' }} disabled={isScanning}>
                  {isScanning ? 'Scanning...' : 'Scan URL'}
                </button>
              </form>

              {scanResult && (
                <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#e7f1ff', borderRadius: '8px' }}>
                  <h4 style={{ color: '#0d6efd', marginBottom: '0.5rem' }}>Scan Result:</h4>
                  <p><strong>Status:</strong> {scanResult.status}</p>
                  <p><strong>Safety Score:</strong> {scanResult.safety_score}%</p>
                  <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>{scanResult.details}</p>
                </div>
              )}
            </section>

            {/* AI Assistant */}
            <section className="widget" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <h3 className="widget-title">AI Threat Assistant</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
                Describe a suspicious situation or message to get an AI analysis.
              </p>
              <form onSubmit={handleAnalyze}>
                <div className="input-group">
                  <textarea
                    className="login-input"
                    rows="3"
                    placeholder="e.g., I received a voice note that sounds like my boss asking for money..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    required
                    style={{ background: '#f8f9fa', border: '1px solid #ddd', resize: 'none' }}
                  />
                </div>
                <button type="submit" className="create-btn" style={{ width: '100%' }} disabled={isAnalyzing}>
                  {isAnalyzing ? 'Analyzing...' : 'Analyze with AI'}
                </button>
              </form>

              {aiAnalysis && (
                <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#fff3cd', borderRadius: '8px' }}>
                  <h4 style={{ color: '#fd7e14', marginBottom: '0.5rem' }}>AI Insights:</h4>
                  <p style={{ fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>{aiAnalysis.analysis}</p>
                  <div style={{ marginTop: '1rem', borderTop: '1px solid #ffe69c', paddingTop: '0.5rem' }}>
                    <strong>Risk Level:</strong> {aiAnalysis.risk_level}
                  </div>
                </div>
              )}
            </section>
          </div>

          {error && (
            <div style={{ marginTop: '2rem', padding: '1rem', background: '#ffe6e6', color: '#d63384', borderRadius: '8px', textAlign: 'center' }}>
              <strong>Error:</strong> {error}
            </div>
          )}

          {(scanResult || aiAnalysis) && (
            <button
              className="nav-link"
              onClick={clearResults}
              style={{ display: 'block', margin: '2rem auto 0', color: '#6c757d', cursor: 'pointer', background: 'none', border: 'none' }}
            >
              Clear All Results
            </button>
          )}
        </main>
      </div>
    </>
  )
}

export default Scanner
