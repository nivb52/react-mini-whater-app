import React from 'react'
import { useSelector } from 'react-redux';
import { WeatherPreview } from "./WeatherPreview";

export const WeatherList = () => {
    const { currentLocation } = useSelector(state => state.weatherModule)
  
    return (
        <section className="weather-list">
            {currentLocation?.currWeather?.map((dailyForecast) => { return (<WeatherPreview dailyForecast={dailyForecast} key={Math.random()} />) })}
        </section>
    )
}