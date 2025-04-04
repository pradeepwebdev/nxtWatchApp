/* eslint-disable import/prefer-default-export */
export const logout = () => {
  document.cookie = 'jwt_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  localStorage.clear()
  sessionStorage.clear()
  window.location.href = '/login'
}
/* eslint-enable import/prefer-default-export */
