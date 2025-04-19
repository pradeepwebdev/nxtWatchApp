// src/components/ProtectedRoute.js
import {Redirect, Route} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = ({component: Component, ...rest}) => {
  const isAuthenticated = Cookies.get('jwt_token')

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
}

export default ProtectedRoute
