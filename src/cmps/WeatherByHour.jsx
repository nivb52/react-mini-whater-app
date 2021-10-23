import { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { locationService } from '../services/locationService';
import { weatherService } from '../services/weatherService';

export const WeatherByHour = () => {

    const [weatherByHour, setWeatherByHour] = useState([])
    const [chartData, setChartData] = useState(null)
    const [chartLabel, setChartLabel] = useState(null)
    const { currentLocation, isDark, isCelsius, isMobile } = useSelector(state => state.weatherModule)

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
                    // width={isMobile ? 100 : ''}
                    data={data}
                    options={options} />}

        </section>
    )
}