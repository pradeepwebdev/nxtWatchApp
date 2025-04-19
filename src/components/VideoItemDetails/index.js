import {useState, useEffect, useContext} from 'react'
import ReactPlayer from 'react-player'
import Loader from 'react-loader-spinner'
import {useParams} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import SavedVideoContext from '../../context/SavedVideoContext'
import {
  VideoItemContainer,
  VideoPlayerWrapper,
  VideoDetails,
  Title,
  ChannelInfo,
  Description,
  LoaderContainer,
  FailureView,
  Button,
} from './styledComponents'

const getCookieValue = name => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))
  return match ? match[2] : null
}

const VideoItemDetails = () => {
  const [videoDetails, setVideoDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [likeActive, setLikeActive] = useState(false)
  const [dislikeActive, setDislikeActive] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const {id} = useParams()
  const jwtToken = getCookieValue('jwt_token')

  useEffect(() => {
    const fetchVideoDetails = async () => {
      const apiUrl = `https://apis.ccbp.in/videos/${id}`

      setIsLoading(true)
      setIsError(false)

      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
          setVideoDetails(data.video_details)
        } else {
          setIsError(true)
        }
      } catch (error) {
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchVideoDetails()
  }, [id, jwtToken])

  const handleLike = () => {
    setLikeActive(!likeActive)
    if (dislikeActive) setDislikeActive(false)
  }

  const handleDislike = () => {
    setDislikeActive(!dislikeActive)
    if (likeActive) setLikeActive(false)
  }

  // Add context consumer and update handleSave
  const {addVideo, removeVideo} = useContext(SavedVideoContext)
  const handleSave = () => {
    if (isSaved) {
      removeVideo(videoDetails.id)
    } else {
      addVideo(videoDetails)
    }
    setIsSaved(!isSaved)
  }

  return (
    <VideoItemContainer>
      {isLoading && (
        <LoaderContainer>
          <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
        </LoaderContainer>
      )}

      {isError && (
        <FailureView>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-video-item-details-failure-light-theme-lg-output-v0.png"
            alt="failure view"
          />
          <button type="button" onClick={() => window.location.reload()}>
            Retry
          </button>
        </FailureView>
      )}

      {videoDetails && !isLoading && !isError && (
        <VideoPlayerWrapper>
          <ReactPlayer url={videoDetails.video_url} controls />
          <VideoDetails>
            <Title>{videoDetails.title}</Title>
            <ChannelInfo>
              <img
                src={videoDetails.channel.profile_image_url}
                alt="channel logo"
              />
              <span>{videoDetails.channel.name}</span>
              <span>{videoDetails.view_count} views</span>
              <span>
                {formatDistanceToNow(new Date(videoDetails.published_at))} ago
              </span>
            </ChannelInfo>
            <Description>{videoDetails.description}</Description>
          </VideoDetails>

          <div>
            <Button onClick={handleLike} active={likeActive}>
              Like
            </Button>
            <Button onClick={handleDislike} active={dislikeActive}>
              Dislike
            </Button>
            <Button onClick={handleSave} active={isSaved}>
              {isSaved ? 'Saved' : 'Save'}
            </Button>
          </div>
        </VideoPlayerWrapper>
      )}
    </VideoItemContainer>
  )
}

export default VideoItemDetails
