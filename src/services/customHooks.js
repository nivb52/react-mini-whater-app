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
export default function useWindowSize() {
  const isClient = typeof window === 'object';

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}