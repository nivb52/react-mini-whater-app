
const initialState = {
    currentLocation: {
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
    },
    filterBy: null,
    favoriteLocations: [],
    isDark: false,
    isCelsius: false,
}

export default function WeatherReducer(state = initialState, action) {
    switch (action.type) {
        case 'TOGGLE_DARK':
            console.log('toggle');
            return {
                ...state,
                isDark: !state.isDark
            }
        case 'TOGGLE_CELSIUS':
            return {
                ...state,
                isCelsius: action.status
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