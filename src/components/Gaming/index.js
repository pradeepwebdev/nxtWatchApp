import {useState, useEffect, useCallback} from 'react'
import {Link} from 'react-router-dom'
import {useTheme} from 'styled-components'
import Loader from 'react-loader-spinner'
import {formatDistanceToNow} from 'date-fns'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import {gamingVideosApiUrl} from '../../utils/apiUrls'

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
  const theme = useTheme()
  const [videos, setVideos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [showLogoutPopup, setShowLogoutPopup] = useState(false)

  const fetchVideos = useCallback(async () => {
    try {
      const jwtToken = Cookies.get('jwt_token')
      const response = await fetch(gamingVideosApiUrl, {
        headers: {Authorization: `Bearer ${jwtToken}`},
      })

      if (!response.ok) {
        throw new Error('Failed to fetch')
      }

      const data = await response.json()
      setVideos(data.videos)
      setIsLoading(false)
    } catch (error) {
      setHasError(true)
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchVideos()
  }, [fetchVideos])

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
              <ChannelLogo
                src={
                  video.channel?.profile_image_url ||
                  'https://via.placeholder.com/30'
                }
                alt="channel logo"
              />
              <div>
                <ChannelName>{video.channel?.name}</ChannelName>
                <ViewCount>{video.view_count} views</ViewCount>
                <PublishedAt>
                  {video.published_at
                    ? `${formatDistanceToNow(new Date(video.published_at))} ago`
                    : 'Unknown'}
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
              Cookies.remove('jwt_token')
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
