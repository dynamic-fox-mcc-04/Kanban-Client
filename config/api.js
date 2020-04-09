import axios from 'axios'
const BASEURL = 'http://localhost:3001'

const instance = axios.create({
    baseURL: BASEURL
})

export default instance