import styled from 'styled-components'

export const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${({theme}) => (theme === 'light' ? '#f9f9f9' : '#181818')};
  color: ${({theme}) => (theme === 'light' ? '#000' : '#fff')};
`

export const LoginForm = styled.form`
  background-color: ${({theme}) => (theme === 'light' ? '#ffffff' : '#212121')};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`
export const LogoHeading = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
  color: #4f46e5;
`

export const LoginHeading = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
  color: inherit;
`
export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid ${({theme}) => (theme === 'light' ? '#d7dfe9' : '#475569')};
  border-radius: 5px;
  background-color: ${({theme}) => (theme === 'light' ? '#f1f5f9' : '#2c3e50')};
  color: ${({theme}) => (theme === 'light' ? '#000' : '#fff')};
`

export const Button = styled.button`
  background-color: #4f46e5;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  margin-top: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3b82f6;
  }
`

export const ErrorMessage = styled.p`
  data-testid: "error-message";
  color: #ff0b37;
  font-size: 14px;
  margin-top: 10px;
`

export const CheckboxLabel = styled.label`
  display: inline-block;
  margin-top: 10px;
  color: ${({theme}) => (theme === 'light' ? '#000' : '#fff')};
`

export const Checkbox = styled.input`
  margin-right: 5px;
`

export const ThemeButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${({theme}) => (theme === 'light' ? '#000' : '#fff')};
  font-size: 14px;
  margin-top: 10px;
  cursor: pointer;
  padding: 8px;
  transition: color 0.3s ease;

  &:hover {
    color: #3b82f6;
  }
`
