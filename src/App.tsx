import { useEffect, useRef, useState } from 'react'
import './App.css'
import logo from '/logo.png'

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePosition = useRef({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const particles = useRef<Array<{
    x: number
    y: number
    size: number
    baseX: number
    baseY: number
    density: number
    color: string
    speedX: number
    speedY: number
    angle: number
    amplitude: number
    frequency: number
    brightness: number
  }>>([])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const colors = [
      'rgba(255, 255, 255, ', // Parlak beyaz
      'rgba(200, 200, 200, ', // Açık gri
      'rgba(180, 180, 180, '  // Orta gri
    ]

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      init()
    }

    const init = () => {
      particles.current = []
      const numberOfParticles = (canvas.width * canvas.height) / 6000
      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 2.5 + 1.5
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const color = colors[Math.floor(Math.random() * colors.length)]
        particles.current.push({
          x,
          y,
          size,
          baseX: x,
          baseY: y,
          density: Math.random() * 20 + 1,
          color,
          speedX: (Math.random() * 2 - 1) * 0.7,
          speedY: (Math.random() * 2 - 1) * 0.7,
          angle: Math.random() * Math.PI * 2,
          amplitude: Math.random() * 1.5 + 0.5,
          frequency: Math.random() * 0.01 + 0.02,
          brightness: Math.random() * 0.3 + 1
        })
      }
    }

    const drawConnections = () => {
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i; j < particles.current.length; j++) {
          const dx = particles.current[i].x - particles.current[j].x
          const dy = particles.current[i].y - particles.current[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            const opacity = (120 - distance) / 120 * 0.6
            ctx.beginPath()
            ctx.strokeStyle = particles.current[i].color + opacity + ')'
            ctx.lineWidth = 0.2
            ctx.moveTo(particles.current[i].x, particles.current[i].y)
            ctx.lineTo(particles.current[j].x, particles.current[j].y)
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.current.forEach(particle => {
        // Dalgalanma hareketi
        particle.angle += particle.frequency
        const waveY = Math.sin(particle.angle) * particle.amplitude
        const waveX = Math.cos(particle.angle * 0.5) * particle.amplitude

        // Mouse interaction
        let dx = mousePosition.current.x - particle.x
        let dy = mousePosition.current.y - particle.y
        let distance = Math.sqrt(dx * dx + dy * dy)
        let forceDirectionX = dx / distance
        let forceDirectionY = dy / distance
        let maxDistance = 180
        let force = (maxDistance - distance) / maxDistance
        let directionX = forceDirectionX * force * particle.density * 0.2
        let directionY = forceDirectionY * force * particle.density * 0.2

        if (distance < maxDistance) {
          particle.x -= directionX
          particle.y -= directionY
        } else {
          if (particle.x !== particle.baseX) {
            dx = particle.x - particle.baseX
            particle.x -= dx/35
          }
          if (particle.y !== particle.baseY) {
            dy = particle.y - particle.baseY
            particle.y -= dy/35
          }
        }

        // Sabit hızlı hareket
        particle.x += particle.speedX * 0.5 + waveX * 0.05
        particle.y += particle.speedY * 0.5 + waveY * 0.05

        // Ekran sınırlarında sekme
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1
          particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1
          particle.y = Math.max(0, Math.min(canvas.height, particle.y))
        }

        // Draw particle with gradient and breathing effect
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * (1 + Math.sin(particle.angle * 0.5) * 0.1)
        )
        gradient.addColorStop(0, particle.color + particle.brightness + ')')
        gradient.addColorStop(1, particle.color + '0)')
        
        ctx.beginPath()
        ctx.fillStyle = gradient
        ctx.arc(particle.x, particle.y, 
          particle.size * (1 + Math.sin(particle.angle * 0.5) * 0.1), 
          0, Math.PI * 2)
        ctx.fill()
      })

      drawConnections()
      requestAnimationFrame(animate)
    }

    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current.x = event.x
      mousePosition.current.y = event.y
    }

    const handleTouchMove = (event: TouchEvent) => {
      mousePosition.current.x = event.touches[0].clientX
      mousePosition.current.y = event.touches[0].clientY
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove)
    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  return (
    <div className={`coming-soon-container ${isMobile ? 'mobile' : ''}`}>
      <canvas ref={canvasRef} className="background-canvas" />
      <div className={`coming-soon-content ${isMobile ? 'mobile' : ''}`}>
        <img src={logo} alt="LutrAI Logo" className="coming-soon-logo" />
        <div className="title-container">
          <h1 className="elegant-text">Coming Soon</h1>
          <div className="title-accent"></div>
        </div>
        <div className="text-container">
          <div className="text-line">
            <span className="text-highlight">LutrAI</span>
            <span className="text-fade">is currently under development</span>
          </div>
          <div className="text-line delayed">
            <span className="text-fade">Stay tuned for smarter</span>
            <span className="text-highlight">DeFi</span>
            <span className="text-fade">decisions</span>
          </div>
        </div>
        <div className="social-links">
          <a href="https://x.com/Lutrdotai" className="elegant-button" target="_blank" rel="noopener noreferrer">
            <span className="button-content">
              Twitter
              <svg className="button-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default App
