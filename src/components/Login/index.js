import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import useTheme from '../../hooks/useTheme'
import {
  LoginPageContainer,
  LoginForm,
  Input,
  Button,
  ErrorMessage,
  CheckboxLabel,
  Checkbox,
  LogoHeading,
  LoginHeading,
} from './styledComponents'

const Login = () => {
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const {isDarkTheme} = useTheme()

  const handleLogin = async event => {
    event.preventDefault()
    setIsLoading(true)
    const loginApiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    }
    const response = await fetch(loginApiUrl, options)
    const data = await response.json()
    setIsLoading(false)

    if (response.ok) {
      const {jwt_token: jwtToken} = data
      Cookies.set('jwt_token', jwtToken)
      history.replace('/')
    } else {
      setError(data.error_msg)
    }
  }

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev)
  }

  return (
    <LoginPageContainer theme={isDarkTheme ? 'dark' : 'light'}>
      <LoginForm onSubmit={handleLogin} theme={isDarkTheme ? 'dark' : 'light'}>
        <LogoHeading>NXT WATCH</LogoHeading>
        <LoginHeading>Login</LoginHeading>

        <label htmlFor="username">USERNAME</label>
        <Input
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          theme={isDarkTheme ? 'dark' : 'light'}
        />

        <label htmlFor="password">PASSWORD</label>
        <Input
          id="password"
          type={isPasswordVisible ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          theme={isDarkTheme ? 'dark' : 'light'}
        />

        <CheckboxLabel
          htmlFor="show-password"
          theme={isDarkTheme ? 'dark' : 'light'}
        >
          <Checkbox
            id="show-password"
            type="checkbox"
            onChange={handlePasswordVisibility}
          />
          Show Password
        </CheckboxLabel>

        <Button type="submit">Login</Button>

        {error && (
          <ErrorMessage data-testid="error-message">{error}</ErrorMessage>
        )}
        {isLoading && (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
          </div>
        )}
      </LoginForm>
    </LoginPageContainer>
  )
}

export default Login
