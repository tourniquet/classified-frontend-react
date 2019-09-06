export const getCookies = name => {
  const cookies = window.document.cookie.split('; ')

  return cookies.filter(el => el.split('=')[0] === name)
}

export const checkIfUserIsLogged = () => {
  const email = getCookies('email').toString().replace('email=', '')
  const id = getCookies('id').toString().replace('id=', '')

  if (email && id) {
    return { email, id }
  }

  return false
}
