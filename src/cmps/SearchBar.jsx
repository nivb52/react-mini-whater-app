import React, { useEffect, useState } from 'react'
import { weatherService } from '../services/weatherService'
import { debounce } from 'lodash'
import { storageService } from '../services/storageService';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentLocation } from '../actions/WeatherActions'
import { locationService } from '../services/locationService';
import { ReactComponent as Loupe } from '../assets/svg/loupe.svg'



export const SearchBar = () => {

    const [display, setDisplay] = useState(true)
    const [search, setSearch] = useState('')
    const [location, setLocation] = useState('')
    const [options, setOptions] = useState([])
    const dispatch = useDispatch()
    const { isDark } = useSelector(state => state.weatherModule)



    useEffect(() => {
        
        // const currLocation = locationService.getDefaultLocation()
        // setLocation(currLocation)

        setOptions(storageService.loadFromStorage('locationOptions'))

    }, [])

    useEffect(() => {
        setDisplay(false)
        // dispatch(setCurrentLocation(location))
    }, [location])



    useEffect(() => {
        // (async () => {
        //     const res = await weatherService.getAutocomplete(search)
        //     setOptions(res)
        //     storageService.saveToStorage('locationOptions',res)
        // })();
    }, [search])

    const handleChange = (e) => {
        setDisplay(true)
        let { value } = e.target
        debouncedChangeHandler(value)
    }

    const debouncedChangeHandler = debounce((val) => {
        setSearch(val)
    }, 1500)

    return (
        <section className="search-container">
            <div className="searchbar flex">
                <input
                    onChange={handleChange}
                    type="text"
                    placeholder="Search City"
                    className={isDark?"dark":""}
                    />
                    
                    <Loupe className={isDark?"loupe fill-dark":"loupe"} />
            </div>
            {display && //REVERT
                <div
                    className={isDark ? ' options-container dark' : 'options-container'}>
                    {options && options?.map(option => {
                        return (
                            <div
                                onClick={() => { setLocation(option) }}
                                className={isDark ? 'dark location-option' : 'light location-option'}
                                key={option.Key}>
                                <span>{option.LocalizedName}</span>
                            </div>)
                    })}
                </div>}
        </section>
    )
}