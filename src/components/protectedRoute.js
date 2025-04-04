// src/components/ProtectedRoute.js
import {Redirect, Route} from 'react-router-dom'

const ProtectedRoute = ({component: Component, ...rest}) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated')

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
