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
let gFavoriteLocations = _loadLocations()

const setCurrentLocation = (location) => {
    storageService.saveToStorage(CURRENT_LOCATION_KEY, location)
    defualtLocation = { ...location }
    return Promise.resolve(location)
}

const getDefaultLocation = () => {
    return { ...defualtLocation }
}

const getById = (key) => {
    const location = gFavoriteLocations.find(location => location.info.Key === key)
    return Promise.resolve(location)
}

function query() {
    return Promise.resolve(gFavoriteLocations);
}

function remove(locationToRemove) {
    if (gFavoriteLocations.length === 0) return
    const idx = gFavoriteLocations.findIndex(location => location.info.Key === locationToRemove.Key)
    console.log("🚀 ~ file: locationService.js ~ line 45 ~ remove ~ idx", idx)
    gFavoriteLocations.splice(idx, 1)
    console.log("🚀 ~ file: locationService.js ~ line 46 ~ remove ~ gFavoriteLocations", gFavoriteLocations)
    storageService.saveToStorage(LOCATIONS_KEY, gFavoriteLocations)
    return Promise.resolve()
}

const save = (locationToSave) => {
    const currWeather = storageService.loadFromStorage('currentWeather')
    const locationObj = {}
    locationObj.info = locationToSave
    locationObj.currWeather = currWeather[0]

    gFavoriteLocations.push(locationObj) // Save location
    storageService.saveToStorage(LOCATIONS_KEY, gFavoriteLocations)
    return Promise.resolve(locationObj);
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
    getDefaultLocation
}