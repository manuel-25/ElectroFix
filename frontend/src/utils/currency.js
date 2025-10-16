export const formatCurrency = (value) => {
  if (value === null || value === undefined || isNaN(value)) return '—'

  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}
