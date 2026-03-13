import { NavLink, useNavigate, useLocation, Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import styles from './TopNav.module.css'

const navItems = [
  { path: '/dashboard', icon: '/icons/home.svg', iconActive: '/icons/home-active.svg', label: 'Home' },
  { path: '/family', icon: '/icons/family.svg', iconActive: '/icons/family-active.svg', label: 'My Family' },
  { path: '/tree', icon: '/icons/treemap.svg', iconActive: '/icons/treemap-active.svg', label: 'Tree Map' },
  { path: '/events', icon: '/icons/events.svg', iconActive: '/icons/events-active.svg', label: 'Events', badge: 3 },
  { path: '/messages', icon: '/icons/messages.svg', iconActive: '/icons/messages-active.svg', label: 'Messages', badge: 5 },
  { path: '/notifications', icon: '/icons/notification.svg', iconActive: '/icons/notification-active.svg', label: 'Notifications', badge: 2 },
]

export default function TopNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const hideTopNav =
    location.pathname === '/login' || location.pathname === '/register'

  if (hideTopNav) return null

  const initials = user?.fullName
    ? user.fullName
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
    : 'FO'

  return (
    <header className={styles.topnavOuter}>
      <div className={styles.topnav}>
        <div className={styles.navLeft}>
          <Link className={styles.logo} to="/dashboard">
            <img
              src="/treelook-icon.png"
              alt="Treelook"
              className={styles.logoImg}
            />
          </Link>

          <div className={styles.searchBar}>
            <span className={styles.searchIcon}>🔍</span>
            <input type="text" placeholder="Search family members…" />
          </div>
        </div>

        <div className={styles.mainNav}>
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              end
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ''}`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={styles.iconWrap}>
                    <img
                      src={isActive ? item.iconActive : item.icon}
                      alt={item.label}
                      className={`${styles.navIcon} ${isActive ? styles.navIconActive : ''}`}
                    />
                    {item.badge && (
                      <span className={styles.badge}>{item.badge}</span>
                    )}
                  </div>
                  <span className={`${styles.navLabel} ${isActive ? styles.navLabelActive : ''}`}>
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className={styles.navRight} ref={menuRef}>
          <button
            type="button"
            className={styles.profileTrigger}
            onClick={() => setMenuOpen((prev) => !prev)}
            title="Open profile menu"
          >
            <div className={styles.userAvatar}>{initials}</div>
          </button>

          {menuOpen && (
            <div className={styles.profileDropdown}>
              <div className={styles.profileDropdownHeader}>
                <div className={styles.profileDropdownAvatar}>{initials}</div>
                <div>
                  <div className={styles.profileDropdownName}>
                    {user?.fullName || 'Treelook User'}
                  </div>
                  <div className={styles.profileDropdownEmail}>
                    {user?.email || ''}
                  </div>
                </div>
              </div>

              <button
                type="button"
                className={styles.dropdownItem}
                onClick={() => {
                  setMenuOpen(false)
                  navigate('/profile/1')
                }}
              >
                👤 Profile
              </button>

              <button
                type="button"
                className={`${styles.dropdownItem} ${styles.logoutItem}`}
                onClick={handleLogout}
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}