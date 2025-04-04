import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background-color: ${({theme}) => (theme.isDark ? '#181818' : '#ffffff')};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

export const Logo = styled.img`
  width: 120px;
`

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const NavItem = styled.div`
  display: flex;
  align-items: center;
`

export const LogoutButton = styled.button`
  background-color: ${({theme}) => (theme.isDark ? '#ffffff' : '#181818')};
  color: ${({theme}) => (theme.isDark ? '#181818' : '#ffffff')};
  font-size: 14px;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({theme}) => (theme.isDark ? '#f0f0f0' : '#333333')};
  }
`

export const LogoutPopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 24px;
  background-color: ${({theme}) => (theme.isDark ? '#333333' : '#ffffff')};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
  z-index: 1000;

  p {
    margin-bottom: 16px;
    color: ${({theme}) => (theme.isDark ? '#ffffff' : '#000000')};
  }
`

export const PopupButtons = styled.div`
  display: flex;
  justify-content: space-around;

  button {
    padding: 8px 16px;
    font-size: 14px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s;

    &:first-child {
      background-color: #ccc;
    }

    &:last-child {
      background-color: ${({theme}) => (theme.isDark ? '#1e90ff' : '#4CAF50')};
      color: #fff;
    }

    &:hover {
      opacity: 0.8;
    }
  }
`

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({theme}) => (theme.isDark ? '#ffffff' : '#000000')};
  font-size: 24px;

  &:hover {
    opacity: 0.8;
  }
`
