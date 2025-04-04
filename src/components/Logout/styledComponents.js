import styled from 'styled-components'

export const LogoutContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
`

export const LogoutButton = styled.button`
  background-color: transparent;
  border: 1px solid #3b82f6;
  color: #3b82f6;
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #3b82f6;
    color: #ffffff;
  }
`

export const PopupContent = styled.div`
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  text-align: center;
`

export const PopupMessage = styled.p`
  font-size: 16px;
  color: #1e293b;
  margin-bottom: 20px;
`

export const PopupActions = styled.div`
  display: flex;
  justify-content: space-around;
`

export const ConfirmButton = styled.button`
  background-color: #ff0b37;
  border: none;
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #d7002c;
  }
`

export const CancelButton = styled.button`
  background-color: transparent;
  border: 1px solid #616e7c;
  color: #616e7c;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #ebebeb;
  }
`
