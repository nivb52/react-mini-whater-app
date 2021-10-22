import React from 'react'
import { Box, Card } from "@material-ui/core";
import { useSelector } from 'react-redux';
import { weatherService } from '../services/weatherService';

export const WeatherPreview = ({ dailyForecast }) => {
    const { isCelsius, isDark } = useSelector(state => state.weatherModule)

    const getCurrentDate = (time) => {
        var date = new Date(0)
        date.setUTCSeconds(time)
        return daysToSrting(date.getDay())
    }

    const daysToSrting = (today) => {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return daysOfWeek[today]
    }



    const setBackground = () => {
        return isDark ? '#4c5055' : '#fff'
    }

    const { fToC,setIcon } = weatherService
    const { Minimum,Maximum } = dailyForecast.Temperature

    
    return (
        <Box className="weather-preview" key={dailyForecast.EpochDate}>
            <Card
                className="weather-card"
                variant='elevation'
                color='black'
                style={{
                    backgroundColor: setBackground()
                }}  >
                <div className="card-container flex column align-center">
                    <p >{getCurrentDate(dailyForecast?.EpochDate).slice(0, 3)}</p>
                    {!isDark && <img src={`https://www.accuweather.com/images/weathericons/${setIcon(dailyForecast.Day.Icon)}.svg`} alt="" />}
                    {isDark && <img src={`https://www.accuweather.com/images/weathericons/${setIcon(dailyForecast.Night.Icon)}.svg`} alt="" />}
                    <div className="tempature-container flex">
                        <div className="tempature max">
                            {!isCelsius && <p>{Maximum.Value} </p>}
                            {isCelsius && <p>{fToC(Maximum.Value)} </p>}
                        </div>
                        <div className="tempature min">
                            {!isCelsius && <p>{Minimum.Value} </p>}
                            {isCelsius && <p>{fToC(Minimum.Value)} </p>}
                        </div>
                    </div>
                </div>
            </Card>
        </Box>
    )
}