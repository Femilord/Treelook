import { NavLink, useNavigate } from 'react-router-dom'
import styles from './TopNav.module.css'

const navItems = [
  { path: '/dashboard',     icon: '/icons/home.svg',         iconActive: '/icons/home-active.svg',         label: 'Home' },
  { path: '/family',        icon: '/icons/family.svg',       iconActive: '/icons/family-active.svg',       label: 'My Family' },
  { path: '/tree',          icon: '/icons/treemap.svg',      iconActive: '/icons/treemap-active.svg',      label: 'Tree Map' },
  { path: '/events',        icon: '/icons/events.svg',       iconActive: '/icons/events-active.svg',       label: 'Events',        badge: 3 },
  { path: '/messages',      icon: '/icons/messages.svg',     iconActive: '/icons/messages-active.svg',     label: 'Messages',      badge: 5 },
  { path: '/notifications', icon: '/icons/notification.svg', iconActive: '/icons/notification-active.svg', label: 'Notifications', badge: 2 },
]

export default function TopNav() {
  const navigate = useNavigate()

  return (
    <header className={styles.topnavOuter}>
      <div className={styles.topnav}>

        {/* LEFT — Logo + Search */}
        <div className={styles.navLeft}>
          <a className={styles.logo} href="/dashboard">
            <img
              src="/treelook-icon.png"
              alt="Treelook"
              className={styles.logoImg}
            />
          </a>
          <div className={styles.searchBar}>
            <span className={styles.searchIcon}>🔍</span>
            <input type="text" placeholder="Search family members…" />
          </div>
        </div>

        {/* CENTER — Nav items */}
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

        {/* RIGHT — User avatar */}
        <div className={styles.navRight}>
          <div
            className={styles.userAvatar}
            onClick={() => navigate('/profile/1')}
            title="View my profile"
          >
            FO
          </div>
        </div>

      </div>
    </header>
  )
}
