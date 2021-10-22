
import React, { useEffect, useState } from 'react'
import { ReactComponent as Heart } from '../assets/svg/heart.svg'
import { ReactComponent as FilledHeart } from '../assets/svg/filled-heart.svg'
import { useDispatch, useSelector } from 'react-redux'
// import { favoriteLocationService } from '../services/favoriteLocationService'
import { saveToFavorites, removeFromFavorites, toggleCelsius } from '../actions/WeatherActions'
import { locationService } from '../services/locationService'
import { storageService } from '../services/storageService'
import { weatherService } from '../services/weatherService'

export const CurrentLocationWeather = () => {
    const [isLiking, setIsLiking] = useState(false)
    const { currentLocation, isCelsius, isDark } = useSelector(state => state.weatherModule)
    const dispatch = useDispatch()
    const [weather, setWeather] = useState([])

    useEffect(() => {
        (async () => {
            // if (!storageService.loadFromStorage('currLocation')) await weatherService.getFiveDaysWeather('215854')
            // const resp = await weatherService.getFiveDaysWeather()
            // storageService.saveToStorage('currentWeather', resp)
            // setWeather(resp)
            setWeather(storageService.loadFromStorage('currentWeather'))
        })()

    }, [])


    useEffect(() => {
        isFavorite()
    }, [currentLocation])

    useEffect(() => {
        console.log('save');
        (async () => {
            const isLocationExist = await locationService.getById(currentLocation.Key)
            if (isLocationExist === undefined) { // Is not favorite
                if (isLiking) saveToFavorites(currentLocation)
            }
            else {
                if (!isLiking) removeFromFavorites(currentLocation)
            }
        })()
    }, [isLiking])


    const onSetIsLiking = (status) => {
        setIsLiking(status)
    }
    const isFavorite = async () => {
        const isLocationExist = await locationService.getById(currentLocation.Key)
        if (isLocationExist !== undefined) { // Is favorite
            setIsLiking(true)
        }
        else {
            setIsLiking(false)
        }
    }

    return (
        <section className="current-location-container flex">
            <div className="info-container flex">
                {!isDark && weather && <img src={`https://www.accuweather.com/images/weathericons/${weatherService.setIcon(weather[0]?.Day?.Icon)}.svg`} alt="" />}
                {isDark && weather && <img src={`https://www.accuweather.com/images/weathericons/${weatherService.setIcon(weather[0]?.Night?.Icon)}.svg`} alt="" />}
                {isCelsius && <p>{weatherService.fToC(weather[0]?.Temperature?.Minimum.Value)}</p>}
                {!isCelsius && <p>{weather[0]?.Temperature?.Minimum.Value}</p>}
                <div className="unit-selector pointer">
                    <span className={isCelsius ? 'bold' : ''} onClick={() => { dispatch(toggleCelsius(true)) }} >°C</span> |
                    <span className={!isCelsius ? 'bold' : ''} onClick={() => { dispatch(toggleCelsius(false)) }}> °F</span>
                </div>
            </div>
            <div className="flex">
                <div className="current-info">
                    <p>{currentLocation.LocalizedName}</p>
                    {!isDark && <p>{weather && weather[0]?.Day?.IconPhrase}</p>}
                    {isDark && <p>{weather && weather[0]?.Night?.IconPhrase}</p>}
                </div>

                <div className="heart-container pointer">
                    {!isLiking && <Heart onClick={() => { onSetIsLiking(true) }} className="heart " />}
                    {isLiking && <FilledHeart onClick={() => { onSetIsLiking(false) }} className="heart " />}
                </div>
            </div>
        </section>
    )
}
