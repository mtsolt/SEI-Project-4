import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
// useHistory, Link
import axios from 'axios'
// import { getTokenFromLocalStorage, getPayload } from '../../helpers/auth'

// import { Form, Button, Container, Col } from 'react-bootstrap'
// import axios from 'axios'
// import { useHistory } from 'react-router-dom'
// import { getTokenFromLocalStorage } from '../helpers/auth'
// import { ImageUploadField } from '../ImageUploadField'


const SingleSurvey = () => {
  const { pk } = useParams()
  const [survey, setSurvey] = useState('')
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/surveys/${pk}`)
        setSurvey(data)
        console.log('SURVEY...', survey)
      } catch (err) {
        setHasError(true)
        console.log('ERROR>>>', err)
      }
    }
    getData()
  }, [pk])

  console.log('EXTERIOR SURVEY....', survey)
  console.log('EXTERIOR ERROR....', hasError)


  return (
    <>
      SINGLE Survey
    </>
  )
}

export default SingleSurvey