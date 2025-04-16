import {useState} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import Cookies from 'js-cookie'
import {ThemeProvider} from 'styled-components'
import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import VideoItemDetails from './components/VideoItemDetails'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import SavedVideosContext from './context/SavedVideosContext'

import './App.css'

const lightTheme = {
  isDark: false,
  background: '#f9f9f9',
  text: '#181818',
}

const darkTheme = {
  isDark: true,
  background: '#181818',
  text: '#ffffff',
}

const ProtectedRoute = ({children}) => {
  const jwtToken = Cookies.get('jwt_token') // Checking if JWT token exists in cookies
  console.log(`Get Token: ${jwtToken}`)
  return jwtToken ? children : <Redirect to="/login" />
}

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [savedVideos, setSavedVideos] = useState([])

  const toggleTheme = () => {
    setIsDarkTheme(prevState => !prevState)
  }

  const login = token => {
    Cookies.set('jwt_token', token) // Store JWT token in cookies
  }

  const logout = () => {
    Cookies.remove('jwt_token') // Remove JWT token from cookies
  }

  const addVideo = video => {
    setSavedVideos(prevVideos => [...prevVideos, video])
  }

  const removeVideo = id => {
    setSavedVideos(prevVideos => prevVideos.filter(video => video.id !== id))
  }

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <div className="app-container">
        <Header toggleTheme={toggleTheme} logout={logout} />
        <div className="content-container">
          <Sidebar />
          <div className="route-container">
            <SavedVideosContext.Provider
              value={{savedVideos, addVideo, removeVideo}}
            >
              <Router>
                <Switch>
                  <Route
                    path="/login"
                    render={props => <Login {...props} login={login} />}
                  />
                  <Route
                    exact
                    path="/"
                    render={() => (
                      <ProtectedRoute>
                        <Home />
                      </ProtectedRoute>
                    )}
                  />
                  <Route
                    path="/trending"
                    render={() => (
                      <ProtectedRoute>
                        <Trending />
                      </ProtectedRoute>
                    )}
                  />
                  <Route
                    path="/gaming"
                    render={() => (
                      <ProtectedRoute>
                        <Gaming />
                      </ProtectedRoute>
                    )}
                  />
                  <Route
                    path="/saved-videos"
                    render={() => (
                      <ProtectedRoute>
                        <SavedVideos />
                      </ProtectedRoute>
                    )}
                  />
                  <Route
                    path="/videos/:id"
                    render={() => (
                      <ProtectedRoute>
                        <VideoItemDetails />
                      </ProtectedRoute>
                    )}
                  />
                  <Route path="*" component={NotFound} />
                </Switch>
              </Router>
            </SavedVideosContext.Provider>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
