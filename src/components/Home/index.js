import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {formatDistanceToNow} from 'date-fns'

import {
  HomeContainer,
  VideoList,
  VideoItem,
  VideoThumbnail,
  VideoTitle,
  VideoChannel,
  LoaderContainer,
  NoVideosView,
  SearchContainer,
  SearchInput,
  SearchButton,
  Banner,
} from './styledComponents'

import 'reactjs-popup/dist/index.css'

// Function to get the JWT token from cookies
const getCookieValue = name => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))
  return match ? match[2] : null
}

const Home = () => {
  const [videos, setVideos] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const history = useHistory()
  const jwtToken = getCookieValue('jwt_token')

  // Fetch videos whenever the search query changes
  useEffect(() => {
    const fetchVideos = async () => {
      const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchQuery}`

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
          setVideos(data.videos || [])
        } else {
          setIsError(true)
        }
      } catch (error) {
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
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
    <HomeContainer>
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

      {videos.length === 0 && !isLoading && !isError && (
        <NoVideosView>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
            alt="no videos"
          />
          <h1>No search Result Found</h1>
          <p>Try different key words or remove search filter.</p>
          <SearchButton onClick={handleSearch}>Retry</SearchButton>
        </NoVideosView>
      )}

      {!isLoading && !isError && videos.length > 0 && (
        <VideoList>
          {videos.map(video => (
            <VideoItem
              key={video.id}
              onClick={() => handleVideoClick(video.id)}
            >
              <VideoThumbnail src={video.thumbnail_url} alt="video thumbnail" />
              <VideoTitle>{video.title}</VideoTitle>
              <VideoChannel>
                <img src={video.channel.profile_image_url} alt="channel logo" />
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
  )
}

export default Home
