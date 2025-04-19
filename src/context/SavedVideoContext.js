import React from 'react'

const SavedVideoContext = React.createContext({
  savedVideos: [],
  addVideo: () => {},
  removeVideo: () => {},
})

export default SavedVideoContext
