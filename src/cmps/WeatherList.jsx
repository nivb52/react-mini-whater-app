import React from 'react'
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { storageService } from '../services/storageService';
import { WeatherPreview } from "./WeatherPreview";

export const WeatherList = () => {
    const { currentLocation } = useSelector(state => state.weatherModule)

    const [weather, setWeather] = useState([])

    useEffect(() => {
        (async () => {
            setWeather(storageService.loadFromStorage('currentWeather'))
        })()

    }, [])

    return (
        <section className="weather-list">
            {currentLocation?.currWeather?.map((dailyForecast) => { return (<WeatherPreview dailyForecast={dailyForecast} key={Math.random()} />) })}
        </section>
    )
}