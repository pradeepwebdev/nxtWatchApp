import {
  SidebarContainer,
  SidebarMenu,
  MenuItem,
  MenuLink,
  ContactUsHeading,
  SocialMediaContainer,
  SocialMediaLogo,
  EnjoyText,
} from './styledComponents'

const Sidebar = () => {
  const menuItems = [
    {id: 'home', label: 'Home', path: '/'},
    {id: 'trending', label: 'Trending', path: '/trending'},
    {id: 'gaming', label: 'Gaming', path: '/gaming'},
    {id: 'savedVideos', label: 'Saved Videos', path: '/saved-videos'},
  ]

  return (
    <SidebarContainer>
      <SidebarMenu>
        {menuItems.map(item => (
          <MenuItem key={item.id}>
            <MenuLink to={item.path}>{item.label}</MenuLink>
          </MenuItem>
        ))}
      </SidebarMenu>

      {/* Contact Us Section */}
      <ContactUsHeading>Contact Us</ContactUsHeading>

      {/* Social Media Logos */}
      <SocialMediaContainer>
        <SocialMediaLogo
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
          alt="facebook logo"
        />
        <SocialMediaLogo
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
          alt="twitter logo"
        />
        <SocialMediaLogo
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
          alt="linked in logo"
        />
      </SocialMediaContainer>

      {/* Enjoy Text */}
      <EnjoyText>
        Enjoy! Now to see your channels and recommendations!
      </EnjoyText>
    </SidebarContainer>
  )
}

export default Sidebar
