import { useState, useEffect } from 'react'
import './App.css'

interface Confetti {
  id: number
  left: number
  animationDuration: number
  backgroundColor: string
}

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
  const [confetti, setConfetti] = useState<Confetti[]>([])

  const createConfetti = () => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#a29bfe', '#fd79a8', '#fdcb6e']
    const newConfetti: Confetti[] = []
    
    for (let i = 0; i < 150; i++) {
      newConfetti.push({
        id: i,
        left: Math.random() * 100,
        animationDuration: 2 + Math.random() * 3,
        backgroundColor: colors[Math.floor(Math.random() * colors.length)]
      })
    }
    
    setConfetti(newConfetti)
  }

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference <= 0) {
        if (!isExpired) {
          setIsExpired(true)
          createConfetti()
        }
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
  }, [targetDate, isExpired])

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0')
  }

  return (
    <div className="app-container">
      {isExpired && confetti.map((piece) => (
        <div
          key={piece.id}
          className="confetti"
          style={{
            left: `${piece.left}%`,
            animationDuration: `${piece.animationDuration}s`,
            backgroundColor: piece.backgroundColor
          }}
        />
      ))}
      
      <div className="countdown-wrapper">
        <h1 className="title">Geri Sayım</h1>
        <p className="target-date">17 Ocak 2026 - Saat 01:00</p>
        
        {isExpired ? (
          <div className="expired-message">
            <h2>Süre Doldu! 🎉</h2>
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
