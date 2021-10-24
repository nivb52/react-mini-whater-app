import React, { useEffect } from 'react'
import { LocationPreview } from "./LocationPreview";

export const LocationList = ({ locations }) => {
    useEffect(() => {
    }, [locations])

    return (
        <section className="location-list flex">
            {locations?.map((location) => { return (<LocationPreview location={location} key={location.info.Key} />) })}
        </section>
    )
}