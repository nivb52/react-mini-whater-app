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

export const useForm = (initialState, cb = () => { }) => {
  const [fields, setFields] = useState(initialState)

  useEffect(() => {
    cb(fields)
  }, [fields])

  return [
    fields,
    function (ev) {
      const field = ev.target.name
      const value = (ev.target.type === 'number') ? +ev.target.value : ev.target.value
      setFields(prevFields => ({ ...prevFields, [field]: value }))
    },
    setFields
  ]
}


export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading('loading...')
    setData(null);
    setError(null);
    const source = axios.CancelToken.source();
    axios.get(url, { cancelToken: source.token })
      .then(res => {
        setLoading(false);
        //checking for multiple responses for more flexibility 
        //with the url we send in.
        res.data.content && setData(res.data.content);
        res.content && setData(res.content);
      })
      .catch(err => {
        setLoading(false)
        setError('An error occurred. Awkward..')
      })
    return () => {
      source.cancel();
    }
  }, [url])

  return { data, loading, error }
}
