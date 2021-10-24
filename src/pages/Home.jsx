import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CurrentLocationWeather } from '../cmps/CurrentLocationWeather'
import { WeatherList } from '../cmps/WeatherList'
import { useGeolocation } from '../services/customHooks'
import { toggleIsHome } from '../actions/WeatherActions'
import { WeatherByHour } from '../cmps/WeatherByHour'
import { toggleIsMobile } from '../actions/WeatherActions'

export const Home = () => {

    const { isDark } = useSelector(state => state.weatherModule)
    const location = useGeolocation()
    const dispatch = useDispatch()

    useEffect(() => {
        checkScreenWidth()
        dispatch(toggleIsHome(true))
    }, [])

   
    useEffect(() => {
        if (!location.isReady) return
        (async () => {
            // const resp = await weatherService.getGeolocation(location.coordinates)
            // console.log("🚀 ~ file: Home.jsx ~ line 22 ~ resp", resp)
            // dispatch(setCurrentLocation)(resp)
        })()
    }, [location])

    const checkScreenWidth = () => {
        if (window.innerWidth > 485) {
            dispatch(toggleIsMobile(false))
        } else {
            dispatch(toggleIsMobile(true))
        }
    }

    return (
        <section className={isDark ? 'dark main-container' : 'main-container'} >
            <div className="home-container flex column">
                <CurrentLocationWeather />
                <WeatherList />
                <WeatherByHour />
            </div>
        </section>
    )
}