export const formatDate = (input, withTime = false) => {
  if (!input) return 'N/A'

  const date = new Date(input)
  if (isNaN(date.getTime())) return 'Fecha inválida'

  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    ...(withTime && {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
  }

  return date.toLocaleString('es-AR', options)
}