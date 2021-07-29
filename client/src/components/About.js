import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Col, Row, Container } from 'react-bootstrap'


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
          <Container fluid>
     <Row className="justify-content-md-center">
        <Col className="mainPageSpace"></Col>
      </Row>
      <Row>
        <Col md={{ span: 4, offset: 1 }}>
          <h1> Did you know? </h1>
          <div className="mainPageContentSpace"></div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs="4" sm="9">
            <h4>Amphibians are incredibly important wetlands animals. They act as both predator and prey, eating pest insects and invertebrates like slugs and snails, as well as providing vital food for birds and other animals like otters, badgers and even hedgehogs.</h4>
        </Col>
      </Row>
      
    </Container>
    </>

  )
}

export default About