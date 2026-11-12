import Icon from './Icons'
import { NavLink } from 'react-router-dom'

const mobileNavItems = [
  { label: 'Home', icon: 'home', href: '/' },
  { label: 'About', icon: 'user', href: '/about' },
  { label: 'GitHub', icon: 'github', href: 'https://github.com/kxlade', external: true }
]

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Main">
      {mobileNavItems.map((item) => (
        item.external ? (
          <a key={item.label} href={item.href} target="_blank" rel="noreferrer" aria-label={item.label}>
            <Icon name={item.icon} size={21} />
            <span>{item.label}</span>
          </a>
        ) : (
          <NavLink key={item.label} to={item.href} end={item.href === '/'} aria-label={item.label}>
            <Icon name={item.icon} size={21} />
            <span>{item.label}</span>
          </NavLink>
        )
      ))}
    </nav>
  )
}
