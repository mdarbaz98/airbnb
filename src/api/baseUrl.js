let hostname = window.location.hostname
let baseURL = ''
if (hostname === 'localhost') {
//   baseURL = process.env.REACT_APP_LOCAL_SERVER
  baseURL = `http://localhost:5000/`
} else {
  baseURL = process.env.REACT_APP_LIVE_SERVER
}
baseURL += 'api'

export default baseURL