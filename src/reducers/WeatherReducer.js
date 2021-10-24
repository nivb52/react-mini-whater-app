
const initialState = {
    currentLocation: null,
    filterBy: null,
    favoriteLocations: [],
    isDark: false,
    isCelsius: false,
    isMobile: false,
    isHome: false,
}

export default function WeatherReducer(state = initialState, action) {
    switch (action.type) {
        case 'TOGGLE_DARK':
            return {
                ...state,
                isDark: !state.isDark
            }
        case 'TOGGLE_CELSIUS':
            return {
                ...state,
                isCelsius: action.status
            }
        case 'IS_MOBILE':
            return {
                ...state,
                isMobile: action.status
            }
        case 'IS_HOME':
            return {
                ...state,
                isHome: action.status
            }
        case 'SET_FILTER':
            return {
                ...state,
                filterBy: action.filterBy
            }
        case 'SET_LOCATION':
            return {
                ...state,
                currentLocation: action.location
            }
        case 'ADD_LOCATION':
            return {
                ...state,
                favoriteLocations: [...state.favoriteLocations, action.location]
            }
        case 'SET_LOCATIONS':
            return {
                ...state,
                favoriteLocations: action.locations
            }
        case 'REMOVE_LOCATION':
            return {
                ...state,
                favoriteLocations: state.favoriteLocations.filter(location => location.Key !== action.locationKey)
            }
        default:
            return state;
    }
}