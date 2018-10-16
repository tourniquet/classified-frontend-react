const hostname = window && window.location && window.location.hostname

export const apiHost = hostname === 'http://example.com'
  ? 'http://api.example.com'
  : '/api/'

// links to social buttons, eg facebook, skype, etc
export const socials = {
  // Faceebook page
  facebook: 'https://www.facebook.com/',

  // ok.ru page
  ok: 'https://ok.ru/',

  // skype
  skype: 'skype'
}
