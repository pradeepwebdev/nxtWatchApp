import {useState} from 'react'
import {Route, Switch, Redirect, useLocation} from 'react-router-dom'
import Cookies from 'js-cookie'
import {ThemeProvider} from 'styled-components'
import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import VideoItemDetails from './components/VideoItemDetails'
import SavedAndRemovedVideos from './components/SavedAndRemovedVideos'
import NotFound from './components/NotFound'
import Header from './components/Header'
import Sidebar from './components/Sidebar'

import SavedVideoContext from './context/SavedVideoContext'

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

const ProtectedRoute = ({component: Component, ...rest}) => {
  const jwtToken = Cookies.get('jwt_token')
  return (
    <Route
      {...rest}
      render={props =>
        jwtToken ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
}

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [savedVideos, setSavedVideos] = useState([])
  const location = useLocation()

  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev)
  }

  const login = token => {
    Cookies.set('jwt_token', token)
  }

  const logout = () => {
    Cookies.remove('jwt_token')
  }

  const addVideo = video => {
    // Prevent adding the same video if it's already saved
    if (!savedVideos.find(v => v.id === video.id)) {
      setSavedVideos(prev => [...prev, video])
    }
  }

  const removeVideo = id => {
    setSavedVideos(prev => prev.filter(video => video.id !== id))
  }

  const isLoginPage = location.pathname === '/login'

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <div className="app-container">
        {!isLoginPage && (
          <Header
            toggleTheme={toggleTheme}
            isDarkTheme={isDarkTheme}
            logout={logout}
          />
        )}
        <div className="content-container">
          {!isLoginPage && <Sidebar />}
          <div className="route-container">
            <SavedVideoContext.Provider
              value={{savedVideos, addVideo, removeVideo}}
            >
              <Switch>
                <Route
                  path="/login"
                  render={props =>
                    Cookies.get('jwt_token') ? (
                      <Redirect to="/" />
                    ) : (
                      <Login {...props} login={login} />
                    )
                  }
                />
                <ProtectedRoute exact path="/" component={Home} />
                <ProtectedRoute path="/trending" component={Trending} />
                <ProtectedRoute path="/gaming" component={Gaming} />
                <ProtectedRoute
                  path="/saved-videos"
                  component={SavedAndRemovedVideos}
                />
                <ProtectedRoute
                  path="/videos/:id"
                  component={VideoItemDetails}
                />
                <ProtectedRoute path="*" component={NotFound} />
              </Switch>
            </SavedVideoContext.Provider>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
