import {
  NotFoundContainer,
  NotFoundImage,
  NotFoundTitle,
  NotFoundDescription,
} from './styledComponents'
import useTheme from '../../hooks/useTheme'

const NotFound = () => {
  const {isDarkTheme} = useTheme()

  const notFoundImageUrl = isDarkTheme
    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'

  return (
    <NotFoundContainer data-testid="not-found">
      <NotFoundImage src={notFoundImageUrl} alt="not found" />
      <NotFoundTitle>Page Not Found</NotFoundTitle>
      <NotFoundDescription>
        We are sorry, the page you requested could not be found.
      </NotFoundDescription>
    </NotFoundContainer>
  )
}

export default NotFound
