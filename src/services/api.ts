import axios from 'axios'
import Constants from 'expo-constants'

const baseUrl = Constants.manifest.extra?.BASE_API_URI

if (!baseUrl) {
    throw Error("You must to provide 'BASE_API_URI' on your extra environment variables!")
}

console.log(baseUrl);

const API = axios.create({
    baseURL: baseUrl
})

export {
    API
}