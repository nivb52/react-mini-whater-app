import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { LocationList } from '../cmps/Location/LocationList'
import { queryLocations } from '../actions/WeatherActions'


export const Favorites = () => {

    const { favoriteLocations, isDark } = useSelector(state => state.weatherModule)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(queryLocations())
    }, [])
    
    return (
        <section className={isDark ? 'dark main-container' : 'main-container'}>
            <div className="home-container flex column">
                <LocationList locations={favoriteLocations} />
            </div>
        </section>
    )
}