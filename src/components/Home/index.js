import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'
import {
  VideoList,
  VideoItem,
  VideoThumbnail,
  VideoTitle,
  VideoChannel,
  LoaderContainer,
  SearchContainer,
  SearchInput,
  SearchButton,
  Banner,
} from './styledComponents'
import SavedVideosContext from '../../context/SavedVideosContext'
import 'reactjs-popup/dist/index.css'

// Function to get the JWT token from cookies
const getTokenFromLocalStorage = () => {
  const token = Cookies.get('jwt_token') // Correct key name
  return token || null // Use simple default assignment instead of ternary
}

const Home = () => {
  const [videos, setVideos] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const history = useHistory()
  const jwtToken = getTokenFromLocalStorage() // Use the function to get the token

  // Fetch videos whenever the search query changes
  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true)
      setIsError(false)

      const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchQuery}`
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const data = await response.json()
        console.log('Data:', JSON.stringify(data))
        setVideos(data.videos)
      } else {
        console.log('DataError:', JSON.stringify(response))
        setIsError(true)
      }
      setIsLoading(false)
    }

    fetchVideos()
  }, [searchQuery, jwtToken])

  // Handle the search functionality
  const handleSearch = () => {
    setSearchQuery(searchQuery.trim())
  }

  // Handle click on video
  const handleVideoClick = id => {
    history.push(`/videos/${id}`)
  }

  return (
    <SavedVideosContext.Consumer>
      {() => (
        <div>
          <Banner data-testid="banner" />
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <SearchButton data-testid="searchButton" onClick={handleSearch}>
              Search
            </SearchButton>
          </SearchContainer>

          {isLoading && (
            <LoaderContainer data-testid="loader">
              <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
            </LoaderContainer>
          )}

          {!isLoading && !isError && videos.length > 0 && (
            <VideoList>
              {videos.map(video => (
                <VideoItem
                  key={video.id}
                  onClick={() => handleVideoClick(video.id)}
                >
                  <VideoThumbnail
                    src={video.thumbnail_url}
                    alt="video thumbnail"
                  />
                  <VideoTitle>{video.title}</VideoTitle>
                  <VideoChannel>
                    <img
                      src={video.channel.profile_image_url}
                      alt="channel logo"
                    />
                    <span>{video.channel.name}</span>
                    <span>
                      {formatDistanceToNow(new Date(video.published_at))} ago
                    </span>
                  </VideoChannel>
                </VideoItem>
              ))}
            </VideoList>
          )}
        </div>
      )}
    </SavedVideosContext.Consumer>
  )
}

export default Home
