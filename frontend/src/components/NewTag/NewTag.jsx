import React from 'react'
import './NewTag.css'

const NewTag = ({ text, color }) => {
  return (
    <span className="new-tag" style={{ backgroundColor: color }}>
      {text}
    </span>
  )
}

export default NewTag
