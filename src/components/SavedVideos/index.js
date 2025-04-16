import {useState, useEffect, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {formatDistanceToNow} from 'date-fns'
import Cookies from 'js-cookie'
import {
  VideoList,
  VideoItem,
  VideoThumbnail,
  VideoTitle,
  VideoChannel,
  LoaderContainer,
  NoSavedVideosView,
  SaveButton,
} from './styledComponents'

import SavedVideosContext from '../../context/SavedVideosContext'

const SavedVideos = () => {
  const [isLoading, setIsLoading] = useState(true)
  const history = useHistory()

  // Use the SavedVideosContext to access savedVideos and removeVideo
  const {savedVideos, removeVideo} = useContext(SavedVideosContext)

  useEffect(() => {
    setIsLoading(false) // Simulate data loading, you can replace this with actual API calls if needed
  }, [])

  const handleVideoClick = id => {
    history.push(`/videos/${id}`) // Redirect to individual video page
    console.log(history.push(`/videos/${id}`))
  }

  const handleRemoveVideo = async videoId => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${videoId}/remove`

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${jwtToken}`, // JWT token for authentication
        },
      })

      if (response.ok) {
        removeVideo(videoId) // Remove video from saved videos context
      } else {
        console.error('Error removing video')
      }
    } catch (error) {
      console.error('Error removing video', error)
    }
  }

  // Render the component based on loading state or content
  if (isLoading) {
    return (
      <LoaderContainer>
        <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
      </LoaderContainer>
    )
  }

  if (savedVideos.length === 0) {
    return (
      <NoSavedVideosView>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-light-theme-lg-output-v0.png"
          alt="no saved videos"
        />
        <p>No saved videos found.</p>
      </NoSavedVideosView>
    )
  }

  return (
    <VideoList>
      {savedVideos.map(video => (
        <VideoItem key={video.id} onClick={() => handleVideoClick(video.id)}>
          <VideoThumbnail src={video.thumbnail_url} alt="video thumbnail" />
          <VideoTitle>{video.title}</VideoTitle>
          <VideoChannel>
            <img src={video.channel.profile_image_url} alt="channel logo" />
            <span>{video.channel.name}</span>
            <span>{formatDistanceToNow(new Date(video.published_at))} ago</span>
          </VideoChannel>
          <SaveButton
            onClick={e => {
              e.stopPropagation() // Prevent video item click
              handleRemoveVideo(video.id) // Call remove video function
            }}
          >
            Remove Video
          </SaveButton>
        </VideoItem>
      ))}
    </VideoList>
  )
}

export default SavedVideos
