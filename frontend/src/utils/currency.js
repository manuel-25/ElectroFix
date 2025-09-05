export const formatCurrency = (value) => {
  if (typeof value !== 'number') return '—'

  const [int, dec] = value.toFixed(2).split('.') // fuerza 2 decimales

  const formattedInt = int.replace(/\B(?=(\d{3})+(?!\d))/g, '.') // separador de miles
  return `$ ${formattedInt},${dec}`
}