import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LocationList } from '../cmps/Location/LocationList'
import { queryLocations, toggleIsHome } from '../actions/WeatherActions'

export const Favorites = () => {
    const { favoriteLocations, isDark } = useSelector(state => state.weatherModule)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(queryLocations())
        dispatch(toggleIsHome(false))
    }, [])

    return (
        <section className={isDark ? 'dark main-container' : 'main-container'}>
            <div className="home-container flex column">
                {!favoriteLocations.length &&
                    <div className="empty-favorites flex">
                        <h1>No Favorites to show</h1>
                        <img src="imgs/empty-forecast.png" alt="empty forecast" />
                    </div>}
                <LocationList locations={favoriteLocations} />
            </div>
        </section>
    )
}