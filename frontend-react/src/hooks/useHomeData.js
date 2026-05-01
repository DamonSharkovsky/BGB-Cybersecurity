import { useState, useEffect } from 'react'
import { homeProvider } from '@/api/providers/homeProvider'

export const useHomeData = () => {
  const [dashboardData, setDashboardData] = useState(null)
  const [areas, setAreas] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const [dashData, areasData] = await Promise.all([
          homeProvider.getDashboardData(),
          homeProvider.getAreas(),
        ])
        setDashboardData(dashData)
        setAreas(areasData)
      } catch (err) {
        setError(err.message || 'Failed to fetch home data')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return { dashboardData, areas, isLoading, error }
}
