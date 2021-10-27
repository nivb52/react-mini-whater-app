import { width } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import useWindowSize from "../services/customHooks";
import { locationService } from '../services/locationService';
import { weatherService } from '../services/weatherService';


export const WeatherByHour = () => {

    const [weatherByHour, setWeatherByHour] = useState([])
    const [chartData, setChartData] = useState(null)
    const [chartLabel, setChartLabel] = useState(null)
    const { isDark, isCelsius, currentLocation, isMobile } = useSelector(state => state.weatherModule)

    const data = {
        labels: chartLabel,
        datasets: [
            {
                label: '',
                data: chartData,
                fill: true,
                backgroundColor: isDark ? '#3c341b' : '#fff',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        customTooltips: false,
        scaleShowLabels: false,
        elements: {
            point: {
                radius: 0
            }
        },
        title: {
            display: false
        },
        plugins: {
            legend: {
                labels: {
                    boxWidth: 0
                }
            }
        },
        scales: {
            y: {
                grid: {
                    display: false,
                    drawBorder: false
                }
                ,
                beginAtZero: false
            },
            x: {
                grid: {
                    display: false,
                    drawBorder: false
                }
            }
        }
    };


    useEffect(() => {
        setWeatherByHour(locationService.getDefualtWeatherByHour())
    }, [])

    useEffect(() => {
        (async () => {
            if (currentLocation) {
                const resp = await weatherService.getWeatherByHour(currentLocation)
                setWeatherByHour(resp)
            }
        })()
    }, [currentLocation])

    useEffect(() => {
        onSetData()
        onSetLabel()
    }, [weatherByHour])

    useEffect(() => {
        onSetData()
    }, [isCelsius])

    const getCurrentHour = (time, idx) => {
        var dateNow = new Date().getHours()
        return (dateNow + idx) % 24
    }

    const onSetData = () => {
        let data = weatherByHour.map(hour => {
            if (isCelsius) return weatherService.fToC(hour.Temperature.Value)
            else return hour.Temperature.Value
        })
        setChartData(data)
    }
    const onSetLabel = () => {
        let data = weatherByHour.map((hour, idx) => {
            return (`${getCurrentHour(hour.EpochDateTime, idx)}:00`)
        })
        setChartLabel(data)
    }


    return (
        <section
            className="weather-by-hour flex">
                {chartLabel && chartData &&
                    <Line
                        data={data}
                        options={options} />}
        </section>
    )
}