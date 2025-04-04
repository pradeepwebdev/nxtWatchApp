import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: ${({theme}) => (theme.isDark ? '#181818' : '#ffffff')};
  display: flex;
  flex-direction: column;
  padding: 16px;
  justify-content: flex-start;
`

export const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

export const MenuItem = styled.li`
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`

export const MenuLink = styled(Link)`
  text-decoration: none;
  font-size: 18px;
  color: ${({theme}) => (theme.isDark ? '#ffffff' : '#000000')};
  display: block;

  &:hover {
    text-decoration: underline;
  }
`

export const ContactUsHeading = styled.h3`
  font-size: 18px;
  color: ${({theme}) => (theme.isDark ? '#ffffff' : '#000000')};
  margin-top: auto;
  margin-bottom: 16px;
`

export const SocialMediaContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 10px;
`

export const SocialMediaLogo = styled.img`
  width: 30px;
  height: 30px;
`

export const EnjoyText = styled.p`
  font-size: 16px;
  color: ${({theme}) => (theme.isDark ? '#ffffff' : '#000000')};
  margin-top: auto;
  margin-bottom: 10px;
  text-align: center;
`
