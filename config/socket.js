import io from 'socket.io-client'

const BASEURL = 'http://localhost:3001'

export default io(BASEURL)