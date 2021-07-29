import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Col, Row } from 'react-bootstrap'


const Home = () => {
  const [surveys, setSurveys] = useState('')
  const [errors, setErrors] = useState('')

  useEffect(() => {
    const getData = async () => {
      console.log('attempting to pull')
      try {
        const { data } = await axios.get('/api/surveys/')
        console.log(data)
        setSurveys(data)
      } catch (err) {
        setErrors(err)
      }
    }
    getData()
  }, [])

  console.log('surveys', surveys)
  console.log('errors', errors)
  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Col></Col>
        <Col className="justify-content-center"><h2>Welcome to Amphibihunt!</h2></Col>
        <Col></Col>
      </Row>
    </Container>

  )
}

export default Home