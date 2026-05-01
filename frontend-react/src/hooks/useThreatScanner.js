import { useState } from 'react'
import { toolProvider } from '@/api/providers/toolProvider'

export const useThreatScanner = () => {
  const [scanResult, setScanResult] = useState(null)
  const [aiAnalysis, setAiAnalysis] = useState(null)
  const [isScanning, setIsScanning] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState(null)

  const scanUrl = async (url) => {
    setIsScanning(true)
    setError(null)
    try {
      const result = await toolProvider.scanUrl(url)
      setScanResult(result)
      return result
    } catch (err) {
      setError(err.message || 'URL scan failed')
      throw err
    } finally {
      setIsScanning(false)
    }
  }

  const analyzeThreat = async (question) => {
    setIsAnalyzing(true)
    setError(null)
    try {
      const result = await toolProvider.analyzeThreat(question)
      setAiAnalysis(result)
      return result
    } catch (err) {
      setError(err.message || 'AI analysis failed')
      throw err
    } finally {
      setIsAnalyzing(false)
    }
  }

  const clearResults = () => {
    setScanResult(null)
    setAiAnalysis(null)
    setError(null)
  }

  return {
    scanResult,
    aiAnalysis,
    isScanning,
    isAnalyzing,
    error,
    scanUrl,
    analyzeThreat,
    clearResults,
  }
}
