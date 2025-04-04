import styled from 'styled-components'

export const HomeContainer = styled.div`
  background-color: ${({theme}) => (theme === 'light' ? '#f9f9f9' : '#181818')};
  color: ${({theme}) => (theme === 'light' ? '#181818' : '#f9f9f9')};
  padding: 20px;
  position: relative; /* Make sure the container has relative positioning for absolute positioning inside */
`

export const Banner = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  background-position: center;
  height: 200px;
  width: 100%;
`

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`

export const SearchInput = styled.input`
  width: 300px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`

export const SearchButton = styled.button`
  padding: 10px 20px;
  background-color: #4f46e5;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin-left: 10px;
  font-size: 16px;

  &:hover {
    background-color: #3b82f6;
  }
`

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
`

export const FailureView = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  img {
    width: 250px;
  }
`

export const NoVideosView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;

  img {
    width: 250px;
  }

  p {
    font-size: 18px;
    color: ${({theme}) => (theme === 'light' ? '#181818' : '#f9f9f9')};
    margin-top: 20px;
  }
`

export const VideoList = styled.ul`
  list-style: none;
  padding: 0;
`

export const VideoItem = styled.li`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`

export const VideoThumbnail = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`

export const VideoTitle = styled.h3`
  font-size: 18px;
  color: ${({theme}) => (theme === 'light' ? '#181818' : '#f9f9f9')};
  margin: 10px 0;
`

export const VideoChannel = styled.div`
  display: flex;
  align-items: center;
  span {
    margin-left: 10px;
    font-size: 14px;
  }
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
`

// Position buttons in the top-right corner
export const HeaderButtonsContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: row;
  gap: 10px; /* Creates space between the buttons */
`

// Button Styling
export const LogoutButton = styled.button`
  background-color: #ff0b37;
  color: white;
  border: none;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin: 10px;

  &:hover {
    background-color: #d50032;
  }
`

export const DarkModeButton = styled.button`
  background-color: #4f46e5;
  color: white;
  border: none;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin: 10px;

  &:hover {
    background-color: #3b82f6;
  }
`

export const ProfileButton = styled.button`
  background-color: #4f46e5;
  color: white;
  border: none;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin: 10px;

  &:hover {
    background-color: #3b82f6;
  }
`
