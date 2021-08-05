/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import axios from 'axios'

const Map = () => {
  console.log('MAP TOKEN', process.env.REACT_APP_MAPBOX_ACCESS_TOKEN)
  const [viewPort, setViewPort] = useState(null)
  const [surveys, setSurveys] = useState(null)
  const [errors, setErrors] = useState('')



  // this is using the browser to find the current location of the user
  // you can also hard code the latitude and longitude in the return instead
  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(position => {
      const { longitude, latitude } = position.coords
      setViewPort({ longitude, latitude })
    })
  }, [])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/surveys/')
        console.log(data)
        setSurveys(data)
        // setSurveyLength(data.length)
      } catch (err) {
        setErrors(err)
      }

    }
    getData()
  }, [])

  useEffect(() => {
    const createMapData = async () => {
      console.log('Create Map activated')
      for (let i = 0; i < surveys.length; i++)
        console.log('instance')
    }
    if (surveys) createMapData()
  }, [surveys])

  console.log('errors', errors)
  return (
    <div className="map-container" style={{
      maxHeight: '300px',
    }}>
      {viewPort ?
        <ReactMapGL
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          height='100%'
          width='100%'
          mapStyle='mapbox://styles/mapbox/streets-v11'
          latitude={viewPort.latitude}
          longitude={viewPort.longitude}
          zoom={10}

        >
          <Marker latitude={viewPort.latitude} longitude={viewPort.longitude}>
            👩🏻‍💻
          </Marker>
        </ReactMapGL>
        :
        <h1>Loading your location...</h1>
      }
    </div>
  )
}

export default Map
