import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CurrentLocationWeather } from '../cmps/CurrentLocationWeather'
import { SearchBar } from '../cmps/SearchBar'
import { WeatherList } from '../cmps/WeatherList'
import { useGeolocation } from '../services/customHooks'
import { weatherService } from '../services/weatherService'
import { toggleIsHome } from '../actions/WeatherActions'
import { WeatherByHour } from '../cmps/WeatherByHour'
import { toggleIsMobile } from '../actions/WeatherActions'


export const Home = () => {

    const { isDark, isHome } = useSelector(state => state.weatherModule)
    // const location = useGeolocation()
    const dispatch = useDispatch()

    useEffect(() => {
        checkScreenWidth()
        dispatch(toggleIsHome(true))
    }, [])

    useEffect(() => {
        console.log(isHome, 'isHome');
    }, [isHome])


    // useEffect(() => {
    //     if (!location.isReady) return
    //     (async () => {
    //         console.log(location.isReady);
    //         const resp = await weatherService.getGeolocation(location.coordinates)
    //         console.log("🚀 ~ file: Home.jsx ~ line 22 ~ resp", resp)
    //         setCurrentLocation(resp)
    //     })()
    // }, [location])



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