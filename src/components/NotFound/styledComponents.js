import styled from 'styled-components'

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({theme}) => (theme.isDark ? '#181818' : '#f9f9f9')};
`

export const NotFoundImage = styled.img`
  width: 300px;
  max-width: 100%;
  margin-bottom: 20px;
`

export const NotFoundTitle = styled.h1`
  font-size: 24px;
  font-family: 'Roboto';
  color: ${({theme}) => (theme.isDark ? '#ffffff' : '#181818')};
  margin-bottom: 10px;
`

export const NotFoundDescription = styled.p`
  font-size: 16px;
  font-family: 'Roboto';
  color: ${({theme}) => (theme.isDark ? '#94a3b8' : '#64748b')};
  text-align: center;
  max-width: 400px;
`
