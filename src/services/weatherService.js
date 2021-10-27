import axios from "axios";


const KEY = 'txGU35grWfEjLU7tK0Jof9uwRGoWit3D'


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

async function getWeatherByHour(location) {
    const key = (location.Key) ? location.Key : location.info.Key

    try {
        const resp = await axios.get(`https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${key}?apikey=${KEY}`)
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
