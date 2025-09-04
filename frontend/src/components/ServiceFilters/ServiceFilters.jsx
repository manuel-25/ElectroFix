import React from 'react'
import './ServiceFilters.css'

const uniqueValues = (arr, key) =>
  [...new Set(arr.map(item => item[key]).filter(Boolean))]

const ServiceFilters = ({
  services,
  filters,
  onChange,
  onClear
}) => {
  const months = [...new Set(services.map(s => new Date(s.createdAt).toISOString().slice(0, 7)))].sort()

  return (
    <div className="filters-wrapper">
      <select value={filters.code} onChange={e => onChange('code', e.target.value)}>
        <option value="">Todos los códigos</option>
        {['Q', 'B', 'W'].map(code => (
          <option key={code} value={code}>{code}</option>
        ))}
      </select>

      <select value={filters.branch} onChange={e => onChange('branch', e.target.value)}>
        <option value="">Todas las sucursales</option>
        <option value="null">No recibido</option>
        {['Quilmes', 'Barracas'].map(branch => (
          <option key={branch} value={branch}>{branch}</option>
        ))}
      </select>

      <select value={filters.createdBy} onChange={e => onChange('createdBy', e.target.value)}>
        <option value="">Todos los creadores</option>
        {uniqueValues(services, 'createdByEmail').map(email => (
          <option key={email} value={email}>{email}</option>
        ))}
      </select>

      <select value={filters.equipment} onChange={e => onChange('equipment', e.target.value)}>
        <option value="">Todos los equipos</option>
        {uniqueValues(services, 'equipmentType').map(eq => (
          <option key={eq} value={eq}>{eq}</option>
        ))}
      </select>

      <select value={filters.month} onChange={e => onChange('month', e.target.value)}>
        <option value="">Todos los meses</option>
        {months.map(m => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>

      <select value={filters.status} onChange={e => onChange('status', e.target.value)}>
        <option value="">Todos los estados</option>
        {['Pendiente', 'Recibido', 'En Revisión', 'En Reparación', 'En Pruebas', 'Listo para retirar', 'Entregado', 'Garantía', 'Devolución'].map(st => (
          <option key={st} value={st}>{st}</option>
        ))}
      </select>

      <button onClick={onClear}>Limpiar filtros</button>
    </div>
  )
}

export default ServiceFilters
