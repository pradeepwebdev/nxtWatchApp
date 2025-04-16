import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import Loader from 'react-loader-spinner' // keep this as it's being used
import Cookies from 'js-cookie'
import {
  LoginPageContainer,
  LoginForm,
  Input,
  Button,
  ErrorMessage,
  CheckboxLabel,
  Checkbox,
  ThemeButton,
} from './styledComponents'

const Login = () => {
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [theme, setTheme] = useState('light')

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
      console.log(`Data: ${JSON.stringify(data)}`)
      const {jwt_token: jwtToken} = data // Destructure and rename

      Cookies.set('jwt_token', jwtToken)
      history.replace('/')
    } else {
      setError(data.error_msg)
    }
  }

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(prevState => !prevState)
  }

  const handleThemeToggle = () => {
    setTheme(prevState => (prevState === 'light' ? 'dark' : 'light'))
  }

  return (
    <LoginPageContainer theme={theme}>
      <LoginForm onSubmit={handleLogin}>
        <h1>Login</h1>

        <label htmlFor="username">USERNAME</label>
        <Input
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          theme={theme}
        />

        <label htmlFor="password">PASSWORD</label>
        <Input
          id="password"
          type={isPasswordVisible ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          theme={theme}
        />

        <CheckboxLabel htmlFor="show-password">
          <Checkbox
            id="show-password"
            type="checkbox"
            onChange={handlePasswordVisibility}
            theme={theme}
          />
          Show Password
        </CheckboxLabel>

        <Button type="submit">Login</Button>

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </LoginForm>
      <ThemeButton data-testid="theme" onClick={handleThemeToggle}>
        {theme === 'light' ? 'Dark' : 'Light'} Theme
      </ThemeButton>
      {isLoading && (
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
        </div>
      )}
    </LoginPageContainer>
  )
}

export default Login
