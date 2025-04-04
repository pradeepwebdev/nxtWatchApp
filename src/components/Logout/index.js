import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import Cookies from 'js-cookie'
import {
  LogoutContainer,
  LogoutButton,
  PopupContent,
  PopupMessage,
  PopupActions,
  ConfirmButton,
  CancelButton,
} from './styledComponents'

const Logout = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const navigate = useNavigate()

  const handleConfirmLogout = () => {
    // Clear user session data (e.g., JWT token)
    Cookies.remove('jwt_token')
    navigate('/login') // Navigate to login route
  }

  return (
    <LogoutContainer>
      <Popup
        modal
        open={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        className="popup-content"
      >
        <PopupContent>
          <PopupMessage>Are you sure you want to logout?</PopupMessage>
          <PopupActions>
            <CancelButton type="button" onClick={() => setIsPopupOpen(false)}>
              Cancel
            </CancelButton>
            <ConfirmButton type="button" onClick={handleConfirmLogout}>
              Confirm
            </ConfirmButton>
          </PopupActions>
        </PopupContent>
      </Popup>
      <LogoutButton onClick={() => setIsPopupOpen(true)}>Logout</LogoutButton>
    </LogoutContainer>
  )
}

export default Logout
