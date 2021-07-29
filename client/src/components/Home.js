import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Col, Row, Image } from 'react-bootstrap'


const Home = () => {
  const [surveys, setSurveys] = useState('')
  const [errors, setErrors] = useState('')

  useEffect(() => {
    const getData = async () => {
      console.log('attempting to pull')
      try {
        const { data } = await axios.get('/api/amphibians/')
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
        <Col className="mainPageSpace"></Col>
      </Row>
      <Row className="justify-content-md-center">
        {/* <Col></Col> */}
        <Col xs="2" sm="9" >
          <Row>
          <Col className="mainPageHero" xs="2" sm="5">
          <div className="mainPageHeroSpace"></div>
            <h1>Welcome to AmphibiHunt! </h1>
            <h1>Are <span className="mainPageSpan">you</span> ready to help? </h1>
            <div className="mainPageHeroSpace"></div>
            <h4>With a photograph and the push of a button <span className="mainPageSpan">you</span> can help us to assess the health of the UK environment, simply by finding and reporting the incredle species of amphibians that we find around us?</h4>
          <div className="mainPageHeroSpace"></div>
          </Col>
          <Col xs="0" sm="1"></Col>
          <Col  xs="4" sm="6">
            <div className ="mainPageImage">
              <Image src="https://imgur.com/KUk6utj.jpeg" rounded sm="8" />
            </div>
          </Col>
          </Row>
        </Col>
        {/* <Col></Col> */}
      </Row>
      <Row className="justify-content-md-center">
        <Col className="mainPageSpace"></Col>
      </Row>
      <Row>
        <Col md={{ span: 3, offset: 1 }}>
          <h1> Why amphibians? </h1>
          <div className="mainPageContentSpace"></div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs="4" sm="9">
            <h4>Amphibians are <span className="mainPageSpan">incredibly important</span> wetlands animals. 
            They act as both <span className="mainPageSpan">predator and prey</span>, eating pest insects and invertebrates like slugs and snails, as well as providing <span className="mainPageSpan">vital food</span> for birds and other animals like otters, badgers and even hedgehogs.</h4>
            <div className="mainPageContentSpace"></div>
            <h4>The loss and degradation of wetland habitat has hit amphibians hard, with 40% of species declining worldwide according to a 2019 UN report, and the UK is no exception. Unfortunately, we just <span className="mainPageSpan"> don't know </span> what the status of amphibians in the UK really is.</h4>
        </Col>
      </Row>
    </Container>

  )
}

export default Home