import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('http://localhost:8080/api/hello')
      const data = await res.json()
      setMessage(data)
    } catch (err) {
      setError('Failed to connect to backend')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="container">
      <h1>React + Gin Demo</h1>

      <div className="card">
        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}
        {message && (
          <>
            <p className="message">{message.message}</p>
            <p className="timestamp">
              Timestamp: {new Date(message.timestamp).toLocaleString()}
            </p>
          </>
        )}
      </div>

      <button className="refresh-btn" onClick={fetchData}>
        Refresh
      </button>
    </div>
  )
}

export default App
