export const getCookies = name => {
  const cookies = window.document.cookie.split('; ')

  return cookies.filter(el => el.split('=')[0] === name)
}
