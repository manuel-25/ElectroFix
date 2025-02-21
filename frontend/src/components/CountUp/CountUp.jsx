import React, { useState, useEffect, useRef } from 'react'

const CountUp = ({ end, duration, decimals = 0 }) => {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef(null)

  // Observador para detectar cuando el componente entra en pantalla
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
          }
        })
      },
      { threshold: 0.5 } // Se activa cuando al menos el 50% del componente es visible
    )
    if (ref.current) {
      observer.observe(ref.current)
    }
    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [hasAnimated])

  // Animación del contador
  useEffect(() => {
    if (!hasAnimated) return

    let startTimestamp = null
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = timestamp - startTimestamp
      const progressRatio = Math.min(progress / duration, 1)
      const currentCount = progressRatio * end
      setCount(currentCount)
      if (progress < duration) {
        window.requestAnimationFrame(step)
      }
    }

    window.requestAnimationFrame(step)
  }, [hasAnimated, end, duration])

  // Formateo del número usando separadores de miles y los decimales indicados
  const formattedCount = count.toLocaleString('es-AR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return <span ref={ref}>{formattedCount}</span>
}

export default CountUp
