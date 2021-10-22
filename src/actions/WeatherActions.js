import { locationService } from "../services/locationService";


// Dispatchers
const _setFilter = (filterBy) => ({ type: 'SET_FILTER', filterBy });
const _toggleDark = () => ({ type: 'TOGGLE_DARK' });
const _toggleCelsius = (status) => ({ type: 'TOGGLE_CELSIUS',status });
const _setCurrentLocation = (location) => ({ type: 'SET_LOCATION', location });
const _saveToFavorites = (location) => ({ type: 'ADD_LOCATION', location });
const _queryLocations = (locations) => ({ type: 'SET_LOCATIONS', locations });
const _removeFromFavorites = (locationKey) => ({ type: 'REMOVE_LOCATION', locationKey });


// THUNK
export function setCurrentLocation(currentLocation) {
    return async (dispatch) =>{
        const location = await locationService.setCurrentLocation(currentLocation)
        dispatch(_setCurrentLocation(location))}
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

