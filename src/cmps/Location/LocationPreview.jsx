import React from 'react'
import { Box, Card } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { removeFromFavorites } from '../../actions/WeatherActions'
import { weatherService } from '../../services/weatherService';
import { locationService } from '../../services/locationService';
import { ReactComponent as Trash } from '../../assets/svg/trash.svg'


export const LocationPreview = ({ location }) => {

    const { isCelsius, isDark } = useSelector(state => state.weatherModule)
    const dispatch = useDispatch()
    useEffect(() => {

    }, [])


    const setBackground = () => {
        return isDark ? '#4c5055' : '#fff'
    }

    const onRemove = async () => {
        const isLocationExist = await locationService.getById(location.info.Key)
        console.log("🚀 ~ file: LocationPreview.jsx ~ line 26 ~ onRemove ~ isLocationExist", isLocationExist)
        if (isLocationExist !== undefined) { // Is favorite
            dispatch(removeFromFavorites(location.info))
        }
    }

    const { fToC,setIcon } = weatherService
    const { Minimum,Maximum } = location.currWeather.Temperature


    return (
        <Box className="location-preview" key={location.info.Key}>
            <Card
                style={{
                    backgroundColor: setBackground()

                }}
                className="location-card "  >
                <div className="card-container flex column align-center relative">
                    <p>{location.info.LocalizedName}</p>
                    <img src={`https://www.accuweather.com/images/weathericons/${setIcon(location.currWeather.Day.Icon)}.svg`} alt="" />
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
                    
                    <Trash 
                        className='delete-btn pointer'
                        onClick={() => { onRemove() }}
                    />
                </div>
            </Card>
        </Box >
    )
}