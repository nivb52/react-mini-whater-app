import { storageService } from "./storageService"

const LOCATIONS_KEY = 'favoriteLocations'
const CURRENT_LOCATION_KEY = 'currentLocation'

let defualtLocation = {
    "Version": 1,
    "Key": "215854",
    "Type": "Location",
    "Rank": 31,
    "LocalizedName": "Tel Aviv",
    "Country": {
        "ID": "IL",
        "LocalizedName": "Israel"
    },
    "AdministrativeArea": {
        "ID": "TA",
        "LocalizedName": "Tel Aviv"
    }
}

let defualtWeatherByHour = [
    {
        "DateTime": "2021-10-23T00:00:00+03:00",
        "EpochDateTime": 1634936400,
        "WeatherIcon": 33,
        "IconPhrase": "Clear",
        "HasPrecipitation": false,
        "IsDaylight": false,
        "Temperature": {
            "Value": 73,
            "Unit": "F",
            "UnitType": 18
        },
        "PrecipitationProbability": 0,
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/hourly-weather-forecast/215854?day=2&hbhhour=0&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/hourly-weather-forecast/215854?day=2&hbhhour=0&lang=en-us"
    },
    {
        "DateTime": "2021-10-23T01:00:00+03:00",
        "EpochDateTime": 1634940000,
        "WeatherIcon": 33,
        "IconPhrase": "Clear",
        "HasPrecipitation": false,
        "IsDaylight": false,
        "Temperature": {
            "Value": 73,
            "Unit": "F",
            "UnitType": 18
        },
        "PrecipitationProbability": 0,
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/hourly-weather-forecast/215854?day=2&hbhhour=1&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/hourly-weather-forecast/215854?day=2&hbhhour=1&lang=en-us"
    },
    {
        "DateTime": "2021-10-23T02:00:00+03:00",
        "EpochDateTime": 1634943600,
        "WeatherIcon": 34,
        "IconPhrase": "Mostly clear",
        "HasPrecipitation": false,
        "IsDaylight": false,
        "Temperature": {
            "Value": 72,
            "Unit": "F",
            "UnitType": 18
        },
        "PrecipitationProbability": 0,
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/hourly-weather-forecast/215854?day=2&hbhhour=2&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/hourly-weather-forecast/215854?day=2&hbhhour=2&lang=en-us"
    },
    {
        "DateTime": "2021-10-23T03:00:00+03:00",
        "EpochDateTime": 1634947200,
        "WeatherIcon": 34,
        "IconPhrase": "Mostly clear",
        "HasPrecipitation": false,
        "IsDaylight": false,
        "Temperature": {
            "Value": 71,
            "Unit": "F",
            "UnitType": 18
        },
        "PrecipitationProbability": 0,
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/hourly-weather-forecast/215854?day=2&hbhhour=3&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/hourly-weather-forecast/215854?day=2&hbhhour=3&lang=en-us"
    },
    {
        "DateTime": "2021-10-23T04:00:00+03:00",
        "EpochDateTime": 1634950800,
        "WeatherIcon": 34,
        "IconPhrase": "Mostly clear",
        "HasPrecipitation": false,
        "IsDaylight": false,
        "Temperature": {
            "Value": 71,
            "Unit": "F",
            "UnitType": 18
        },
        "PrecipitationProbability": 0,
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/hourly-weather-forecast/215854?day=2&hbhhour=4&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/hourly-weather-forecast/215854?day=2&hbhhour=4&lang=en-us"
    },
    {
        "DateTime": "2021-10-23T05:00:00+03:00",
        "EpochDateTime": 1634954400,
        "WeatherIcon": 35,
        "IconPhrase": "Partly cloudy",
        "HasPrecipitation": false,
        "IsDaylight": false,
        "Temperature": {
            "Value": 70,
            "Unit": "F",
            "UnitType": 18
        },
        "PrecipitationProbability": 0,
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/hourly-weather-forecast/215854?day=2&hbhhour=5&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/hourly-weather-forecast/215854?day=2&hbhhour=5&lang=en-us"
    },
    {
        "DateTime": "2021-10-23T06:00:00+03:00",
        "EpochDateTime": 1634958000,
        "WeatherIcon": 35,
        "IconPhrase": "Partly cloudy",
        "HasPrecipitation": false,
        "IsDaylight": false,
        "Temperature": {
            "Value": 71,
            "Unit": "F",
            "UnitType": 18
        },
        "PrecipitationProbability": 0,
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/hourly-weather-forecast/215854?day=2&hbhhour=6&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/hourly-weather-forecast/215854?day=2&hbhhour=6&lang=en-us"
    },
    {
        "DateTime": "2021-10-23T07:00:00+03:00",
        "EpochDateTime": 1634961600,
        "WeatherIcon": 3,
        "IconPhrase": "Partly sunny",
        "HasPrecipitation": false,
        "IsDaylight": true,
        "Temperature": {
            "Value": 71,
            "Unit": "F",
            "UnitType": 18
        },
        "PrecipitationProbability": 0,
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/hourly-weather-forecast/215854?day=2&hbhhour=7&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/hourly-weather-forecast/215854?day=2&hbhhour=7&lang=en-us"
    },
    {
        "DateTime": "2021-10-23T08:00:00+03:00",
        "EpochDateTime": 1634965200,
        "WeatherIcon": 3,
        "IconPhrase": "Partly sunny",
        "HasPrecipitation": false,
        "IsDaylight": true,
        "Temperature": {
            "Value": 71,
            "Unit": "F",
            "UnitType": 18
        },
        "PrecipitationProbability": 0,
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/hourly-weather-forecast/215854?day=2&hbhhour=8&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/hourly-weather-forecast/215854?day=2&hbhhour=8&lang=en-us"
    },
    {
        "DateTime": "2021-10-23T09:00:00+03:00",
        "EpochDateTime": 1634968800,
        "WeatherIcon": 3,
        "IconPhrase": "Partly sunny",
        "HasPrecipitation": false,
        "IsDaylight": true,
        "Temperature": {
            "Value": 73,
            "Unit": "F",
            "UnitType": 18
        },
        "PrecipitationProbability": 0,
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/hourly-weather-forecast/215854?day=2&hbhhour=9&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/hourly-weather-forecast/215854?day=2&hbhhour=9&lang=en-us"
    },
    {
        "DateTime": "2021-10-23T10:00:00+03:00",
        "EpochDateTime": 1634972400,
        "WeatherIcon": 2,
        "IconPhrase": "Mostly sunny",
        "HasPrecipitation": false,
        "IsDaylight": true,
        "Temperature": {
            "Value": 75,
            "Unit": "F",
            "UnitType": 18
        },
        "PrecipitationProbability": 0,
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/hourly-weather-forecast/215854?day=2&hbhhour=10&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/hourly-weather-forecast/215854?day=2&hbhhour=10&lang=en-us"
    },
    {
        "DateTime": "2021-10-23T11:00:00+03:00",
        "EpochDateTime": 1634976000,
        "WeatherIcon": 2,
        "IconPhrase": "Mostly sunny",
        "HasPrecipitation": false,
        "IsDaylight": true,
        "Temperature": {
            "Value": 77,
            "Unit": "F",
            "UnitType": 18
        },
        "PrecipitationProbability": 0,
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/hourly-weather-forecast/215854?day=2&hbhhour=11&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/hourly-weather-forecast/215854?day=2&hbhhour=11&lang=en-us"
    }
]

let gFavoriteLocations = _loadLocations()

const setCurrentLocation = (location) => {
    storageService.saveToStorage(CURRENT_LOCATION_KEY, location)
    defualtLocation = { ...location }
    return Promise.resolve(location)
}

const getDefaultLocation = async () => {
    return { ...defualtLocation }
}

const getDefualtWeatherByHour = () => {
    return [...defualtWeatherByHour]
}

const getById = (key) => {
    const location = gFavoriteLocations.find(location => location.info.Key === key)
    return Promise.resolve(location)
}

function query() {
    const locations = storageService.loadFromStorage(LOCATIONS_KEY)
    return Promise.resolve(locations);
}

function remove(locationToRemove) {
    if (gFavoriteLocations.length === 0) return
    const key = (locationToRemove.Key) ? locationToRemove.Key : locationToRemove.info.Key
    const idx = gFavoriteLocations.findIndex(location => location.info.Key === key)
    gFavoriteLocations.splice(idx, 1)
    storageService.saveToStorage(LOCATIONS_KEY, gFavoriteLocations)
    return Promise.resolve()
}

const save = (locationToSave) => {
    gFavoriteLocations.push(locationToSave) // Save location
    storageService.saveToStorage(LOCATIONS_KEY, gFavoriteLocations)
    return Promise.resolve(locationToSave);
}

function _loadLocations() {
    let locations = storageService.loadFromStorage(LOCATIONS_KEY)
    if (!locations || !locations.length) locations = []
    storageService.saveToStorage(LOCATIONS_KEY, locations)
    return locations
}

export const locationService = {
    query,
    save,
    getById,
    remove,
    setCurrentLocation,
    getDefaultLocation,
    getDefualtWeatherByHour
}