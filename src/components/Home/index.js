import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'

import {
  HomeContainer,
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

import useTheme from '../../hooks/useTheme'
import SavedVideoContext from '../../context/SavedVideoContext'
import 'reactjs-popup/dist/index.css'

const getTokenFromLocalStorage = () => {
  return Cookies.get('jwt_token') || null
}

const Home = () => {
  const {isDarkTheme} = useTheme()
  const [videos, setVideos] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const history = useHistory()
  const jwtToken = getTokenFromLocalStorage()

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

      try {
        const response = await fetch(apiUrl, options)
        if (response.ok) {
          const data = await response.json()
          setVideos(data.videos)
        } else {
          setIsError(true)
        }
      } catch {
        setIsError(true)
      }
      setIsLoading(false)
    }

    fetchVideos()
  }, [searchQuery])

  const handleSearch = () => {
    setSearchQuery(searchInput.trim())
  }

  const handleVideoClick = id => {
    history.push(`/videos/${id}`)
  }

  return (
    <SavedVideoContext.Consumer>
      {() => (
        <div>
          <HomeContainer
            data-testid="home"
            theme={isDarkTheme ? 'dark' : 'light'}
          >
            <Banner data-testid="banner" />
            <SearchContainer>
              <SearchInput
                type="text"
                placeholder="Search"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
              />
              <SearchButton data-testid="searchButton" onClick={handleSearch}>
                Search
              </SearchButton>
            </SearchContainer>

            {isLoading && (
              <LoaderContainer data-testid="loader">
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height={50}
                  width={50}
                />
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
          </HomeContainer>
        </div>
      )}
    </SavedVideoContext.Consumer>
  )
}

export default Home
