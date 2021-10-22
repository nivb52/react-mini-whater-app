import React from 'react'
import { useEffect, useState } from "react";
import { storageService } from '../services/storageService';
import { WeatherPreview } from "./WeatherPreview";

export const WeatherList = () => {

    const [weather, setWeather] = useState([])

    useEffect(() => {
        (async () => {
            setWeather(storageService.loadFromStorage('currentWeather'))
        })()

    }, [])

    return (
        <section className="weather-list">
            {weather?.map((dailyForecast) => { return (<WeatherPreview dailyForecast={dailyForecast} key={Math.random()} />) })}
        </section>
    )
}