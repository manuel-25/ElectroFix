import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import './WhatsAppBranchSelector.css'

const branches = [
  {
    name: 'Barracas',
    address: 'Rocha 1752',
    whatsapp: 'https://wa.me/5491139148766?text=Hola,%20me%20comunico%20desde%20la%20web%20de%20Electrosafe%20(Barracas)'
  },
  {
    name: 'Quilmes',
    address: 'Av. Vicente López 770',
    whatsapp: 'https://wa.me/5491170664306?text=Hola,%20me%20comunico%20desde%20la%20web%20de%20Electrosafe%20(Quilmes)'
  }
]

const WhatsAppBranchSelector = ({ onSelect }) => {
  const handleClick = (url) => {
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-16673611004/49hxCIfl_aUbEPy5zI4-'
      })
    }
    window.open(url, '_blank')
    onSelect()
  }

  return (
    <div className="wa-branch-selector">
      {branches.map(branch => (
        <button
          key={branch.name}
          className="wa-branch-card"
          onClick={() => handleClick(branch.whatsapp)}
        >
          <FontAwesomeIcon icon={faHome} className="wa-branch-icon" />
          <div>
            <strong>{branch.name}</strong>
            <span>{branch.address}</span>
          </div>
        </button>
      ))}
    </div>
  )
}

export default WhatsAppBranchSelector
