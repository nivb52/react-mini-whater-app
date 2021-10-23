import React, { useEffect } from 'react'
import { LocationPreview } from "./LocationPreview";

export const LocationList = ({ locations }) => {
    useEffect(() => {
    }, [locations])
    // useEffect(() => {
    //     const getFiveDaysWeather = async () => {
    //         // const resp = await weatherService.getFiveDaysWeather()
    //         // storageService.saveToStorage('currentWeather', resp)
    //         // setWeather(resp)
    //         setWeather(storageService.loadFromStorage('currentWeather'))
    //     }
    //     getFiveDaysWeather()
    // }, [])


    return (
        <section className="location-list flex">
            { locations?.map((location) => { return (<LocationPreview location={location} key={location.info.Key} />) })}
            { (locations?.length === 0) &&
                <div className="no-favorites">
                    <h1>No Favorites to show</h1>
                </div>}
        </section>
    )

}