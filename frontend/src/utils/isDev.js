const isDev = () =>
  !process.env.NODE_ENV ||
  process.env.NODE_ENV === 'development' ||
  window.location.hostname === 'localhost'

export default isDev