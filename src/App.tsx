import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // Target date: January 17, 2026 at 01:00
  const targetDate = new Date('2026-01-17T01:00:00').getTime()
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference <= 0) {
        setIsExpired(true)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0')
  }

  return (
    <div className="app-container">
      <div className="countdown-wrapper">
        <h1 className="title">Geri Sayım</h1>
        <p className="target-date">17 Ocak 2026 - Saat 01:00</p>
        
        {isExpired ? (
          <div className="expired-message">
            <h2>Süre Doldu</h2>
          </div>
        ) : (
          <div className="countdown-grid">
            <div className="time-box">
              <div className="time-value">{formatNumber(timeLeft.days)}</div>
              <div className="time-label">Gün</div>
            </div>
            <div className="time-box">
              <div className="time-value">{formatNumber(timeLeft.hours)}</div>
              <div className="time-label">Saat</div>
            </div>
            <div className="time-box">
              <div className="time-value">{formatNumber(timeLeft.minutes)}</div>
              <div className="time-label">Dakika</div>
            </div>
            <div className="time-box">
              <div className="time-value">{formatNumber(timeLeft.seconds)}</div>
              <div className="time-label">Saniye</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
