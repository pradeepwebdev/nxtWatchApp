import {useContext} from 'react'
import {ThemeContext} from 'styled-components'

// Default export
const useTheme = () => {
  const theme = useContext(ThemeContext)
  return {
    isDarkTheme: theme.isDark,
  }
}

export default useTheme
