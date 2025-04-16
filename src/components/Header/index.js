import {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaMoon, FaSun, FaUserCircle} from 'react-icons/fa'

import {
  HeaderContainer,
  Logo,
  Nav,
  NavItem,
  LogoutButton,
  LogoutPopup,
  PopupButtons,
  IconButton,
} from './styledComponents'

const Header = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false)
  const history = useHistory()

  // Check if theme preference is saved in localStorage
  useEffect(() => {
    const savedTheme = Cookies.get('theme')
    if (savedTheme === 'dark') {
      setIsDarkTheme(true)
      document.body.classList.add('dark-theme') // Apply dark theme to the entire body
    } else {
      document.body.classList.remove('dark-theme') // Apply light theme to the entire body
    }
  }, [])

  const toggleTheme = () => {
    setIsDarkTheme(prev => {
      const newTheme = !prev
      if (newTheme) {
        Cookies.set('theme', 'dark')
        document.body.classList.add('dark-theme')
      } else {
        Cookies.set('theme', 'light')
        document.body.classList.remove('dark-theme')
      }
      return newTheme
    })
  }

  const handleLogout = () => {
    setIsLogoutPopupOpen(true)
  }

  const handleCancel = () => {
    setIsLogoutPopupOpen(false)
  }

  const handleConfirmLogout = () => {
    Cookies.remove('jwt_token')
    history.push('/login')
  }

  const handleProfileClick = () => {
    history.push('/profile')
  }

  return (
    <HeaderContainer>
      <Link to="/">
        <Logo
          src={
            isDarkTheme
              ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
              : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          }
          alt="app logo"
        />
      </Link>
      <Nav>
        <NavItem>
          <IconButton onClick={toggleTheme} data-testid="theme">
            {isDarkTheme ? <FaSun size={24} /> : <FaMoon size={24} />}
          </IconButton>
        </NavItem>
        <NavItem>
          <IconButton onClick={handleProfileClick}>
            <FaUserCircle size={24} />
          </IconButton>
        </NavItem>
        <NavItem>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </NavItem>
      </Nav>

      {isLogoutPopupOpen && (
        <LogoutPopup>
          <p>Are you sure you want to logout?</p>
          <PopupButtons>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
            <button type="button" onClick={handleConfirmLogout}>
              Confirm
            </button>
          </PopupButtons>
        </LogoutPopup>
      )}
    </HeaderContainer>
  )
}

export default Header
