
import React, { useEffect, useState } from 'react'
import { ReactComponent as Heart } from '../assets/svg/heart.svg'
import { ReactComponent as FilledHeart } from '../assets/svg/filled-heart.svg'
import { useDispatch, useSelector } from 'react-redux'
// import { favoriteLocationService } from '../services/favoriteLocationService'
import { saveToFavorites, removeFromFavorites, toggleCelsius, setCurrentLocation } from '../actions/WeatherActions'
import { locationService } from '../services/locationService'
import { storageService } from '../services/storageService'
import { weatherService } from '../services/weatherService'
import { SearchBar } from './SearchBar'

export const CurrentLocationWeather = () => {
    const [isLiking, setIsLiking] = useState(false)
    const { currentLocation, isCelsius, isDark, isMobile } = useSelector(state => state.weatherModule)
    const dispatch = useDispatch()

    useEffect(() => {
        isFavorite()
    }, [currentLocation])

    useEffect(() => {
        (async () => {
            if (currentLocation) {
                const isLocationExist = await locationService.getById(currentLocation.info.Key)
                if (isLocationExist === undefined) { // Is not favorite
                    if (isLiking) saveToFavorites(currentLocation)
                }
                else {
                    if (!isLiking) removeFromFavorites(currentLocation) // REVERT
                }
            }
        })()
    }, [isLiking])


    const onSetIsLiking = (status) => {
        setIsLiking(status)
    }
    const isFavorite = async () => {
        if (currentLocation) {
            const isLocationExist = await locationService.getById(currentLocation.info.Key)
            if (isLocationExist !== undefined) { // Is favorite
                setIsLiking(true)
            }
            else {
                setIsLiking(false)
            }
        }
    }

    return (
        <section className="current-location-container flex select">
            <div className="info-container flex">
                {!isDark && currentLocation && <img src={`https://www.accuweather.com/images/weathericons/${weatherService.setIcon(currentLocation?.currWeather[0]?.Day?.Icon)}.svg`} alt="" />}
                {isDark && currentLocation && <img src={`https://www.accuweather.com/images/weathericons/${weatherService.setIcon(currentLocation?.currWeather[0]?.Night?.Icon)}.svg`} alt="" />}
                {!isDark&&isCelsius && <p>{weatherService.fToC(currentLocation?.currWeather[0]?.Temperature?.Maximum?.Value)}</p>}
                {!isDark&&!isCelsius && <p>{currentLocation?.currWeather[0]?.Temperature?.Maximum?.Value}</p>}
                {isDark&&isCelsius && <p>{weatherService.fToC(currentLocation?.currWeather[0]?.Temperature?.Minimum?.Value)}</p>}
                {isDark&&!isCelsius && <p>{currentLocation?.currWeather[0]?.Temperature?.Minimum?.Value}</p>}
                <div className="unit-selector pointer">
                    <span className={isCelsius ? 'bold' : ''} onClick={() => { dispatch(toggleCelsius(true)) }} >°C</span> |
                    <span className={!isCelsius ? 'bold' : ''} onClick={() => { dispatch(toggleCelsius(false)) }}> °F</span>
                </div>
            </div>
            {!isMobile && <SearchBar />}

            <div className="right-container flex">
                <div className="current-info">
                    <p>{currentLocation?.info?.LocalizedName}</p>
                    {!isDark && <p>{currentLocation && currentLocation?.currWeather[0]?.Day?.IconPhrase}</p>}
                    {isDark && <p>{currentLocation && currentLocation?.currWeather[0]?.Night?.IconPhrase}</p>}
                </div>

                <div className="heart-container pointer">
                    {!isLiking && <Heart onClick={() => { onSetIsLiking(true) }} className="heart " />}
                    {isLiking && <FilledHeart onClick={() => { onSetIsLiking(false) }} className="heart " />}
                </div>
            </div>
        </section>
    )
}
