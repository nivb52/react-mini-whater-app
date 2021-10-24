import { useEffect, useState } from 'react'
import axios from 'axios';

export const useGeolocation = () => {

  const [location, setLocation] = useState({
    isReady: false,
    coordinates: {
      lon: '', lat: ''
    }
  })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSucsess, onError)
  },[])

  const onSucsess = (position) => {
    setLocation({
      isReady: true,
      coordinates: {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      }
    })
  }

  const onError = (err) => {
    setLocation({
      isReady: true,
      err
    })

  };

  return location
}
