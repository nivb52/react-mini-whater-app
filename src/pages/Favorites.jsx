import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { LocationList } from '../cmps/Location/LocationList'
import { queryLocations } from '../actions/WeatherActions'


export const Favorites = () => {

    const { favoriteLocations,isDark } = useSelector(state => state.weatherModule)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(queryLocations())
    }, [])

    useEffect(() => {
        dispatch(queryLocations())
    }, [favoriteLocations])

    return (
        <section className={isDark ? 'dark main-container' : 'main-container'}>
            <LocationList locations={favoriteLocations} />
        </section>
    )
}