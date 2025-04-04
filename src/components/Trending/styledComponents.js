import styled from 'styled-components'

export const TrendingContainer = styled.div`
  padding: 20px;
  background-color: ${({theme}) => (theme === 'dark' ? '#181818' : '#f9f9f9')};
`

export const VideoList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`

export const VideoCard = styled.div`
  width: 300px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  background-color: ${({theme}) => (theme === 'dark' ? '#3b3b3b' : '#ffffff')};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: scale(1.05);
    transition: transform 0.2s ease-in-out;
  }
`

export const ChannelLogo = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`

export const VideoThumbnail = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`

export const VideoTitle = styled.h3`
  font-size: 16px;
  color: ${({theme}) => (theme === 'dark' ? '#ffffff' : '#181818')};
  margin: 10px 0 5px;
`

export const ViewCount = styled.p`
  font-size: 14px;
  color: ${({theme}) => (theme === 'dark' ? '#a1a1a1' : '#616e7c')};
`

export const PublishedAt = styled.p`
  font-size: 12px;
  color: ${({theme}) => (theme === 'dark' ? '#cbd5e1' : '#94a3b8')};
`

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

export const FailureView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;

  button {
    padding: 10px 20px;
    background-color: #3b82f6;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }

  img {
    width: 250px;
    margin-bottom: 20px;
  }
`
