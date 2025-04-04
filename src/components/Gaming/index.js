import {useState, useEffect, useCallback} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {formatDistanceToNow} from 'date-fns'
import Popup from 'reactjs-popup'

import {
  GamingContainer,
  Banner,
  VideoList,
  VideoItem,
  VideoThumbnail,
  VideoDetails,
  ChannelLogo,
  ChannelName,
  ViewCount,
  PublishedAt,
  LoaderContainer,
  FailureView,
  RetryButton,
  LogoutPopup,
} from './styledComponents'

const Gaming = () => {
  const [videos, setVideos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [showLogoutPopup, setShowLogoutPopup] = useState(false)
  const [theme, setTheme] = useState('light')

  // Function to get JWT token from cookies/localStorage
  const getAuthToken = () =>
    localStorage.getItem('jwt_token') || document.cookie.split('jwt_token=')[1]

  // Fetching the gaming videos from the API
  const fetchVideos = useCallback(async () => {
    try {
      const jwtToken = getAuthToken()
      if (!jwtToken) {
        setHasError(true)
        setIsLoading(false)
        return
      }

      const response = await fetch('https://apis.ccbp.in/videos/gaming', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })

      if (!response.ok) {
        setHasError(true)
        setIsLoading(false)
        return
      }

      const data = await response.json()
      setVideos(data.videos)
      setIsLoading(false)
    } catch (error) {
      setHasError(true)
      setIsLoading(false)
    }
  }, []) // Empty dependency array ensures that the function is stable

  // Set theme color for background based on user preference or system
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light' // Set default theme
    setTheme(savedTheme)
  }, [])

  useEffect(() => {
    fetchVideos()
  }, [fetchVideos]) // Added fetchVideos as a dependency

  const handleRetry = () => {
    setHasError(false)
    setIsLoading(true)
    fetchVideos()
  }

  if (isLoading) {
    return (
      <LoaderContainer data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </LoaderContainer>
    )
  }

  if (hasError) {
    return (
      <FailureView>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
          alt="failure view"
        />
        <RetryButton onClick={handleRetry}>Retry</RetryButton>
      </FailureView>
    )
  }

  return (
    <GamingContainer data-testid="gaming" theme={theme}>
      <Banner data-testid="banner">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png"
          alt="banner"
        />
      </Banner>
      <VideoList>
        {videos.map(video => (
          <VideoItem key={video.id}>
            <Link to={`/videos/${video.id}`}>
              <VideoThumbnail src={video.thumbnail_url} alt="video thumbnail" />
            </Link>
            <VideoDetails>
              {/* Ensure that channel and profile_image_url are valid */}
              {video.channel && video.channel.profile_image_url ? (
                <ChannelLogo
                  src={video.channel.profile_image_url}
                  alt="channel logo"
                />
              ) : (
                <ChannelLogo
                  src="https://via.placeholder.com/30"
                  alt="placeholder"
                />
              )}
              <div>
                <ChannelName>{video.channel?.name}</ChannelName>
                <ViewCount>{video.view_count} views</ViewCount>
                <PublishedAt>
                  {video.published_at
                    ? `${formatDistanceToNow(new Date(video.published_at))} ago`
                    : 'Invalid date'}
                </PublishedAt>
              </div>
            </VideoDetails>
          </VideoItem>
        ))}
      </VideoList>
      <Popup
        open={showLogoutPopup}
        onClose={() => setShowLogoutPopup(false)}
        modal
      >
        <LogoutPopup>
          <h3>Are you sure you want to logout?</h3>
          <button
            type="button"
            onClick={() => setShowLogoutPopup(false)}
            className="cancel-button"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              window.location.href = '/login'
            }}
            className="confirm-button"
          >
            Confirm
          </button>
        </LogoutPopup>
      </Popup>
    </GamingContainer>
  )
}

export default Gaming
