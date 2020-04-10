import axios from 'axios'
const BASEURL = 'http://localhost:3000'
// const BASEURL = 'https://desolate-ocean-86590.herokuapp.com'

const instance = axios.create({
    baseURL: BASEURL
})

export default instance