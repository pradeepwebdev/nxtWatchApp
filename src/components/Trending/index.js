import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {
  TrendingContainer,
  VideoList,
  VideoCard,
  ChannelLogo,
  VideoThumbnail,
  VideoTitle,
  ViewCount,
  PublishedAt,
  LoaderContainer,
  FailureView,
} from './styledComponents'

const Trending = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const history = useHistory()

  const fetchTrendingVideos = async () => {
    try {
      const jwtToken = Cookies.get('jwt_token')
      const response = await fetch('https://apis.ccbp.in/videos/trending', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const data = await response.json()
      console.log(`Get Response in trending:, ${JSON.stringify(data)}`)
      setVideos(data.videos || [])
      setLoading(false)
    } catch (error) {
      setHasError(true)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTrendingVideos()
  }, [])

  const onRetry = () => {
    setLoading(true)
    setHasError(false)
    fetchTrendingVideos()
  }

  const navigateToVideoItemDetails = videoId => {
    console.log(`VideoId : , ${videoId}`)
    history.push(`/videos/${videoId}`)
    console.log(history.push(`/videos/${videoId}`))
  }

  if (loading) {
    return (
      <LoaderContainer data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
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
        <button type="button" onClick={onRetry}>
          Retry
        </button>
      </FailureView>
    )
  }

  return (
    <TrendingContainer>
      <h1>Trending</h1>
      <VideoList>
        {videos.map(video => (
          <VideoCard
            key={video.id}
            onClick={() => navigateToVideoItemDetails(video.id)}
          >
            <VideoThumbnail src={video.thumbnail_url} alt="video thumbnail" />
            <div>
              <ChannelLogo
                src={video.channel.profile_image_url}
                alt="channel logo"
              />
              <VideoTitle>{video.title}</VideoTitle>
              <ViewCount>{video.view_count} views</ViewCount>
              <PublishedAt>
                {formatDistanceToNow(new Date(video.published_at))} ago
              </PublishedAt>
            </div>
          </VideoCard>
        ))}
      </VideoList>
    </TrendingContainer>
  )
}

export default Trending
