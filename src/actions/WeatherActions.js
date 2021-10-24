import { locationService } from "../services/locationService";
import { weatherService } from "../services/weatherService";


// Dispatchers
const _setFilter = (filterBy) => ({ type: 'SET_FILTER', filterBy });
const _toggleDark = () => ({ type: 'TOGGLE_DARK' });
const _toggleCelsius = (status) => ({ type: 'TOGGLE_CELSIUS', status });
const _toggleIsMobile = (status) => ({ type: 'IS_MOBILE', status });
const _setCurrentLocation = (location) => ({ type: 'SET_LOCATION', location });
const _saveToFavorites = (location) => ({ type: 'ADD_LOCATION', location });
const _queryLocations = (locations) => ({ type: 'SET_LOCATIONS', locations });
const _removeFromFavorites = (locationKey) => ({ type: 'REMOVE_LOCATION', locationKey });


// THUNK
export function setCurrentLocation(currentLocation) {
    console.log("🚀 ~ file: WeatherActions.js ~ line 18 ~ setCurrentLocation ~ currentLocation", currentLocation)
    return async (dispatch) => {
        if (currentLocation) {
            const currentLocationObject = {}
            const locationWeather = await weatherService.getFiveDaysWeather(currentLocation.Key)
            currentLocationObject.currWeather = locationWeather
            currentLocationObject.info = currentLocation
            locationService.setCurrentLocation(currentLocationObject)
            dispatch(_setCurrentLocation(currentLocationObject))
        }
    }

}
export function saveToFavorites(location) {
    locationService.save(location)
    return (dispatch) => dispatch(_saveToFavorites(location))
}
export function queryLocations() {
    return async (dispatch) => {
        const locations = await locationService.query()
        dispatch(_queryLocations(locations))
    }
}
export function removeFromFavorites(location) {
    locationService.remove(location)
    return (dispatch) => dispatch(_removeFromFavorites(location.Key))
}
export function setFilter(filterBy) {
    return (dispatch) => dispatch(_setFilter(filterBy))
}
export function toggleDark() {
    return (dispatch) => dispatch(_toggleDark())
}
export function toggleCelsius(status) {
    return (dispatch) => dispatch(_toggleCelsius(status))
}
export function toggleIsMobile(status) {
    return (dispatch) => dispatch(_toggleIsMobile(status))
}

