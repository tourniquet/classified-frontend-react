const hostname = window && window.location && window.location.hostname

export const apiHost = hostname === 'http://example.com'
  ? 'http://api.example.com'
  : 'api'
