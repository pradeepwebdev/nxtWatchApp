import {useState, useEffect} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import {ThemeProvider} from 'styled-components'
import Cookies from 'js-cookie'
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

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [jwtToken, setJwtToken] = useState(Cookies.get('jwt_token'))

  const toggleTheme = () => {
    setIsDarkTheme(prevState => !prevState)
  }

  useEffect(() => {
    // Update the token state if the cookie changes (for example, after login)
    const token = Cookies.get('jwt_token')
    setJwtToken(token)
  }, [jwtToken])

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <div className="app-container">
        <Header toggleTheme={toggleTheme} />
        <div className="content-container">
          <Sidebar />
          <div className="route-container">
            <SavedVideosContext.Provider
              value={{
                savedVideos: [], // Replace with actual logic
                addVideo: () => {},
                removeVideo: () => {},
              }}
            >
              <Router>
                <Switch>
                  <Route path="/login" component={Login} />
                  <Route
                    exact
                    path="/"
                    render={() =>
                      jwtToken ? <Home /> : <Redirect to="/login" />
                    }
                  />
                  <Route
                    path="/trending"
                    render={() =>
                      jwtToken ? <Trending /> : <Redirect to="/login" />
                    }
                  />
                  <Route
                    path="/gaming"
                    render={() =>
                      jwtToken ? <Gaming /> : <Redirect to="/login" />
                    }
                  />
                  <Route
                    path="/saved-videos"
                    render={() =>
                      jwtToken ? <SavedVideos /> : <Redirect to="/login" />
                    }
                  />
                  <Route
                    path="/videos/:id"
                    render={() =>
                      jwtToken ? <VideoItemDetails /> : <Redirect to="/login" />
                    }
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
