import {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {FaMoon, FaSun} from 'react-icons/fa'
import Cookies from 'js-cookie'
import {
  HeaderContainer,
  Popup,
  Logo,
  Nav,
  NavItem,
  LogoutButton,
  LogoutPopup,
  PopupButtons,
  IconButton,
} from './styledComponents'

const Header = ({toggleTheme, isDarkTheme}) => {
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false)
  const history = useHistory()

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
      {/* Logo */}
      <Link to='/'>
        <Logo
          src={
            isDarkTheme
              ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
              : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          }
          alt='app logo'
        />
      </Link>

      {/* Navigation */}
      <Nav>
        {/* Theme Toggle Button */}
        <NavItem>
          <IconButton onClick={toggleTheme} data-testid='theme'>
            {isDarkTheme ? <FaSun size={24} /> : <FaMoon size={24} />}
          </IconButton>
        </NavItem>

        {/* Profile Icon */}
        <NavItem>
          <IconButton onClick={handleProfileClick}>
            <Logo
              src='https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png'
              alt='profile'
              size={24}
            />
          </IconButton>
        </NavItem>

        {/* Logout Button */}
        <NavItem>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </NavItem>
      </Nav>

      {/* Logout Confirmation Popup */}
      {isLogoutPopupOpen && (
        <Popup
          modal
          trigger={<LogoutButton>Logout</LogoutButton>}
          className='popup-content'
        >
          <LogoutPopup>
            <p>Are you sure you want to logout?</p>
            <PopupButtons>
              <button type='button' onClick={handleCancel}>
                Cancel
              </button>
              <button type='button' onClick={handleConfirmLogout}>
                Confirm
              </button>
            </PopupButtons>
          </LogoutPopup>
        </Popup>
      )}
    </HeaderContainer>
  )
}

export default Header
