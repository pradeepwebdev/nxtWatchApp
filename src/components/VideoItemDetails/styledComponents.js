import styled from 'styled-components'

export const VideoItemContainer = styled.div`
  background-color: ${({theme}) => (theme === 'light' ? '#f9f9f9' : '#181818')};
  color: ${({theme}) => (theme === 'light' ? '#181818' : '#f9f9f9')};
  padding: 20px;
`

export const VideoPlayerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const VideoDetails = styled.div`
  margin-top: 20px;
  text-align: center;
`

export const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`

export const ChannelInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
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

export const Description = styled.p`
  font-size: 16px;
  color: ${({theme}) => (theme === 'light' ? '#181818' : '#f9f9f9')};
  max-width: 600px;
  margin: 0 auto;
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
  button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #4f46e5;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
`

export const Button = styled.button`
  background-color: ${({active}) => (active ? '#4f46e5' : '#ccc')};
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  margin: 10px;

  &:hover {
    background-color: ${({active}) => (active ? '#3b82f6' : '#999')};
  }
`
