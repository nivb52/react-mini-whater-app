import React from 'react'
import { Box, Card } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { queryLocations,removeFromFavorites, setCurrentLocation } from '../../actions/WeatherActions'
import { weatherService } from '../../services/weatherService';
import { locationService } from '../../services/locationService';
import { ReactComponent as Trash } from '../../assets/svg/trash.svg'
import { useHistory } from "react-router-dom";


export const LocationPreview = ({ location }) => {
    const { isCelsius, isDark } = useSelector(state => state.weatherModule)
    const dispatch = useDispatch()
    let history = useHistory();

    const setBackground = () => {
        return isDark ? '#4c5055' : '#fff'
    }

    const onRemove = async (ev) => {
        ev.stopPropagation()
        const isLocationExist = await locationService.getById(location.info.Key)
        if (isLocationExist !== undefined) { // Is favorite
            dispatch(removeFromFavorites(location.info))
        }
        dispatch(queryLocations())
    }

    const { fToC, setIcon } = weatherService


    const onSetCurrentLocation = (ev) => {
        ev.preventDefault()
        console.log('onSetCurrentLocation');
        dispatch(setCurrentLocation(location))
        history.push("/");
    }


    return (
        <Box
            className="location-preview pointer"
            key={location.info.Key}
          
        >
            <Card
              onClick={(ev) => { 
                onSetCurrentLocation(ev) }}
                style={{
                    backgroundColor: setBackground()
                }}
                className="location-card "  >
                <div className="card-container flex column align-center">
                    <p className="title">{location.info.LocalizedName}</p>
                    <img src={`https://www.accuweather.com/images/weathericons/${setIcon(location?.currWeather[0]?.Day?.Icon)}.svg`} alt="" />
                    <div className="tempature-container flex">
                        <div className="tempature max">
                            {!isCelsius && <p>{location?.currWeather[0]?.Temperature?.Maximum?.Value} </p>}
                            {isCelsius && <p>{fToC(location?.currWeather[0]?.Temperature?.Maximum?.Value)} </p>}
                        </div>
                        <div className="tempature min">
                            {!isCelsius && <p>{location?.currWeather[0]?.Temperature?.Minimum?.Value} </p>}
                            {isCelsius && <p>{fToC(location?.currWeather[0]?.Temperature?.Minimum?.Value)} </p>}
                        </div>
                    </div>
                    <Trash
                        className='delete-btn pointer'
                        onClick={(ev) => {onRemove(ev)}}
                    />
                </div>
            </Card>
        </Box >
    )
}