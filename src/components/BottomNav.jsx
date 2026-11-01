import Icon from './Icons'
import { NavLink } from 'react-router-dom'

const mobileNavItems = [
  { label: 'Home', icon: 'home', href: '/' },
  { label: 'Github', icon: 'github', href: 'https://github.com/kxlade' },
  { label: 'About', icon: 'user', href: '/about' },
]

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Main">
      {mobileNavItems.map((item) => (
        <NavLink key={item.label} to={item.href} end={item.href === '/'} aria-label={item.label}>
          <Icon name={item.icon} size={24} />
        </NavLink>
      ))}
    </nav>
  )
}
