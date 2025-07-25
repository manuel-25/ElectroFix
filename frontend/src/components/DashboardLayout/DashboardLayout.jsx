import React from 'react'
import './DashboardLayout.css'
import Sidebar from '../SideBar/SideBar.jsx'

const DashboardLayout = ({ children }) => {
  return (
    <div className="layout-container">
      <Sidebar />
      {children}
    </div>
  )
}

export default DashboardLayout
