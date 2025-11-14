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

      {/* Código */}
      <select
        value={filters.code}
        onChange={e => onChange('code', e.target.value)}
        className={`filter-select ${filters.code ? 'active' : ''}`}
      >
        <option value="">Todos los códigos</option>
        {['Q', 'B', 'W'].map(code => (
          <option key={code} value={code}>{code}</option>
        ))}
      </select>

      {/* Sucursal */}
      <select
        value={filters.branch}
        onChange={e => onChange('branch', e.target.value)}
        className={`filter-select ${filters.branch ? 'active' : ''}`}
      >
        <option value="">Todas las sucursales</option>
        <option value="null">No recibido</option>
        {['Quilmes', 'Barracas'].map(branch => (
          <option key={branch} value={branch}>{branch}</option>
        ))}
      </select>

      {/* Creado por */}
      <select
        value={filters.createdBy}
        onChange={e => onChange('createdBy', e.target.value)}
        className={`filter-select ${filters.createdBy ? 'active' : ''}`}
      >
        <option value="">Todos los creadores</option>
        {uniqueValues(services, 'createdByEmail').map(email => (
          <option key={email} value={email}>{email}</option>
        ))}
      </select>

      {/* Equipos */}
      <select
        value={filters.equipment}
        onChange={e => onChange('equipment', e.target.value)}
        className={`filter-select ${filters.equipment ? 'active' : ''}`}
      >
        <option value="">Todos los equipos</option>
        {uniqueValues(services, 'equipmentType').map(eq => (
          <option key={eq} value={eq}>{eq}</option>
        ))}
      </select>

      {/* Mes */}
      <select
        value={filters.month}
        onChange={e => onChange('month', e.target.value)}
        className={`filter-select ${filters.month ? 'active' : ''}`}
      >
        <option value="">Todos los meses</option>
        {months.map(m => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>

      {/* Estado */}
      <select
        value={filters.status}
        onChange={e => onChange('status', e.target.value)}
        className={`filter-select ${filters.status ? 'active' : ''}`}
      >
        <option value="">Todos los estados</option>
        {[
          'Pendiente',
          'Recibido',
          'En Revisión',
          'En Reparación',
          'En Pruebas',
          'Listo para retirar',
          'Entregado',
          'Garantía',
          'Devolución'
        ].map(st => (
          <option key={st} value={st}>{st}</option>
        ))}
      </select>

      <button onClick={onClear}>Limpiar filtros</button>
    </div>
  )
}

export default ServiceFilters
