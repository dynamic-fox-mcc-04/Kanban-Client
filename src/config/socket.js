import io from 'socket.io-client'

// const BASEURL = 'http://localhost:3001'
const BASEURL = 'https://desolate-ocean-86590.herokuapp.com'

export default io(BASEURL)