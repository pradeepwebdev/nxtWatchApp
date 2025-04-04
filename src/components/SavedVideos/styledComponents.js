// src/components/SavedVideos/styledComponents.js

import styled from 'styled-components'

export const SavedVideosContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({theme}) => theme.background};
  color: ${({theme}) => theme.text};
`

export const VideoList = styled.ul`
  width: 100%;
  padding: 20px;
  list-style-type: none;
`

export const VideoItem = styled.li`
  display: flex;
  flex-direction: column;
  margin: 15px 0;
  cursor: pointer;
`

export const VideoThumbnail = styled.img`
  width: 100%;
  height: auto;
`

export const VideoTitle = styled.h3`
  color: ${({theme}) => theme.text};
`

export const VideoChannel = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  color: ${({theme}) => theme.text};
  span {
    margin-left: 10px;
  }
`

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`

export const NoSavedVideosView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  img {
    width: 50%;
    height: auto;
  }
  p {
    margin-top: 20px;
    font-size: 18px;
  }
`

export const SaveButton = styled.button`
  margin-top: 10px;
  background-color: #ff0000;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #e60000;
  }
`
