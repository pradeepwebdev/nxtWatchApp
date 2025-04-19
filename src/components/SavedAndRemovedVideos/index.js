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

import SavedVideoContext from '../../context/SavedVideoContext'

const SavedAndRemovedVideos = () => {
  const [isLoading, setIsLoading] = useState(true)
  const history = useHistory()

  const {savedVideos, removeVideo} = useContext(SavedVideoContext)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const handleVideoClick = id => {
    history.push(`/videos/${id}`)
  }

  const handleRemoveVideo = async videoId => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${videoId}/remove`

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })

      if (response.ok) {
        removeVideo(videoId)
      } else {
        console.error('Error removing video')
      }
    } catch (error) {
      console.error('Error removing video', error)
    }
  }

  let content

  if (isLoading) {
    content = (
      <LoaderContainer>
        <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
      </LoaderContainer>
    )
  } else if (savedVideos.length === 0) {
    content = (
      <NoSavedVideosView>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
          alt="no saved videos"
        />
        <p>No saved videos found</p>
      </NoSavedVideosView>
    )
  } else {
    content = (
      <VideoList>
        {savedVideos.map(video => (
          <VideoItem key={video.id} onClick={() => handleVideoClick(video.id)}>
            <VideoThumbnail src={video.thumbnail_url} alt="video thumbnail" />
            <VideoTitle>{video.title}</VideoTitle>
            <VideoChannel>
              {video.channel && (
                <>
                  <img
                    src={video.channel.profile_image_url}
                    alt="channel logo"
                  />
                  <span>{video.channel.name}</span>
                </>
              )}
              <span>{video.view_count} views</span>
            </VideoChannel>
            <SaveButton
              onClick={e => {
                e.stopPropagation()
                handleRemoveVideo(video.id)
              }}
            >
              Remove Video
            </SaveButton>
          </VideoItem>
        ))}
      </VideoList>
    )
  }

  return <div data-testid="savedVideos">{content}</div>
}

export default SavedAndRemovedVideos
