import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CurrentLocationWeather } from '../cmps/CurrentLocationWeather'
import { WeatherList } from '../cmps/WeatherList'
import { toggleIsHome } from '../actions/WeatherActions'
import { WeatherByHour } from '../cmps/WeatherByHour'
import { toggleIsMobile } from '../actions/WeatherActions'
import useWindowSize from '../services/customHooks'
import { size } from 'lodash'

export const Home = () => {

    const { isDark } = useSelector(state => state.weatherModule)
    const dispatch = useDispatch()
    const windowSize= useWindowSize()

    useEffect(() => {
        checkScreenWidth()
        dispatch(toggleIsHome(true))
    }, [])

    useEffect(() => {
        checkScreenWidth()
    }, [windowSize])

    const checkScreenWidth = () => {
        console.log('in');
        if (windowSize.width > 485) {
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