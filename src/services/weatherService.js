import axios from "axios";
import { storageService } from "./storageService";

// const KEY = 'tBiJIiEX3QUH4wlV1eGDeGPi6evLzjSs'
// const KEY = '6TvuqkQbGVyr8Jxem9hLBmHQkVhCj23y'
// const KEY = 'jFNMdQo1pBiVUtWdeO2EFPfHAX7wAJNX'
const KEY = 'dKKw50ewg2TV00RDzBmObRNk3e1wybJo'
// const KEY = ''

async function getFiveDaysWeather(key) {
    try {
        const resp = await axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${KEY}`)
        return resp.data.DailyForecasts
    }
    catch (err) {
        throw err
    }
}
async function getAutocomplete(q) {
    try {
        const resp = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${KEY}&q=${q}`)
        return resp.data
    }
    catch (err) {
        throw err
    }
}
async function getWeatherByHour(locationKey) {
    try {
        const resp = await axios.get(`https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${locationKey}?apikey=${KEY}`)
        return resp.data
    }
    catch (err) {
        throw console.error(err, 'err get Weather By Hour');
    }
}

async function getGeolocation(position) {
    try {
        const resp = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${KEY}&q=${position.lat}%2C${position.lon}`
            ,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT"

                }
            }
        )
        return resp.data
    }
    catch (err) {
        throw err
    }
}

const _getCurrentLocationKey = () => {
    const currLocationKey = storageService.loadFromStorage('currentLocation')
    return currLocationKey.info.Key
}

const fToC = (tempature) => {
    return ((tempature - 32) * 5 / 9).toFixed(0);
}

const setIcon = (icon) => {
    return (icon < 10) ? `0${icon}` : icon
}

export const weatherService = {
    getFiveDaysWeather,
    getAutocomplete,
    getGeolocation,
    getWeatherByHour,
    setIcon,
    fToC
}
