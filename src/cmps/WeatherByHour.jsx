import { Chart } from 'chart.js';
import { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { locationService } from '../services/locationService';
import { weatherService } from '../services/weatherService';




export const WeatherByHour = () => {

    const [weatherByHour, setWeatherByHour] = useState([])
    const [chartData, setChartData] = useState(null)
    const [chartLabel, setChartLabel] = useState(null)
    const { currentLocation, isDark, isCelsius } = useSelector(state => state.weatherModule)
    const dispatch = useDispatch()

    const data = {
        labels: chartLabel,
        datasets: [
            {
                // label: '# of Votes',
                data: chartData,
                fill: true,
                backgroundColor: isDark ? '#3c341b' : '#fff',
                // backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };

    const options = {
        scales: {
            y: {
                grid: {
                    display: false
                }
                ,
                beginAtZero: false
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    };






    useEffect(() => {
        setWeatherByHour(locationService.getDefualtWeatherByHour())
    }, [])

    useEffect(() => {
        console.log(weatherByHour);
        onSetData()
        onSetLabel()
    }, [weatherByHour])

    useEffect(() => {
        // (async () => {
        //     if (currentLocation !== undefined) {
        //         const resp = await weatherService.getWeatherByHour(currentLocation.Key)
        //     }
        // })()
    }, [currentLocation])

    useEffect(() => {
        onSetData()
    }, [isCelsius])

    const getCurrentHour = (time) => {
        var date = new Date(0)
        date.setUTCSeconds(time)
        return date.getHours()
    }

    const onSetData = () => {
        let data = weatherByHour.map(hour => {
            if (isCelsius) return weatherService.fToC(hour.Temperature.Value)
            else return hour.Temperature.Value
        })
        console.log("🚀 ~ file: WeatherByHour.jsx ~ line 84 ~ onSetData ~ data", data)
        setChartData(data)
    }
    const onSetLabel = () => {
        let data = weatherByHour.map(hour => {
            return getCurrentHour(hour.EpochDateTime)
        })
        setChartLabel(data)
    }

    return (
        <section className="weather-by-hour">
            {chartLabel && chartData &&
                <Line
                    height={50}

                    data={data}
                    options={options} />}

        </section>
    )
}