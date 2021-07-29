import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Col } from 'react-bootstrap'


const About = () => {
  const [amphib, setAmphib] = useState('')
  const [errors, setErrors] = useState('')

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/surveys/')
        console.log(data)
        setAmphib(data)
      } catch (err) {
        setErrors(err)
      }
    }
    getData()
  }, [])

  console.log('errors>>>>', errors)
  console.log('AMPHIBIANS', amphib)
  return (
    <>
      <Col></Col>
      <Col md='1'><h1>THIS IS WHY WE DO WHAT WE DOOOOOOO</h1></Col>
      <Col></Col>
    </>

  )
}

export default About