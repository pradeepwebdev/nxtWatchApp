import styled from 'styled-components'

export const GamingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${({theme}) => (theme.isDark ? '#0f0f0f' : '#f9f9f9')};
`

export const Banner = styled.div`
  width: 100%;
  margin-bottom: 20px;
  img {
    width: 100%;
  }
`

export const VideoList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`

export const VideoItem = styled.li`
  list-style-type: none;
  width: 200px;
  margin-bottom: 20px;
`

export const VideoThumbnail = styled.img`
  width: 100%;
  border-radius: 10px;
`

export const VideoDetails = styled.div`
  display: flex;
  margin-top: 10px;
  align-items: center;
`

export const ChannelLogo = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`

export const ChannelName = styled.p`
  font-size: 14px;
  font-weight: bold;
`

export const ViewCount = styled.p`
  font-size: 12px;
  color: #64748b;
`

export const PublishedAt = styled.p`
  font-size: 12px;
  color: #64748b;
`

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`

export const FailureView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  img {
    width: 200px;
    margin-bottom: 20px;
  }
`

export const RetryButton = styled.button`
  background-color: #4f46e5;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`

export const LogoutPopup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h3 {
    margin-bottom: 20px;
  }
  .cancel-button {
    background-color: #ebebeb;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    margin-right: 10px;
    cursor: pointer;
  }
  .confirm-button {
    background-color: #ff0b37;
    color: #ffffff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`
