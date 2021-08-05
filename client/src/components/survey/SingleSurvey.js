import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
// useHistory, Link
import axios from 'axios'
// import { getTokenFromLocalStorage, getPayload } from '../../helpers/auth'

import { Container } from 'react-bootstrap'
import SightingsForm from './SightingsForm'
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
        const { data } = await axios.get(`/api/surveys/${pk}/`)
        setSurvey(data)
        console.log('SURVEY...', survey)
      } catch (err) {
        setHasError(true)
        console.log('ERROR>>>', err)
      }
    }
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pk])

  console.log('EXTERIOR SURVEY....', survey)
  console.log('EXTERIOR ERROR....', hasError)


  return (
    <>
      You submitted a survey in {survey.county}, on {survey.spotted_on}
      <Container>
        <SightingsForm />
      </Container>
    </>
  )
}

export default SingleSurvey