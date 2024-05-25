import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY
// variable api_key ahora tiene el valor configurado

const getWheather = (country) => {
    let url = `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${country}&aqi=no`
    const request = axios.get(url)
    return request.then(response => response.data)
}

export default {getWheather}