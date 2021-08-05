import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Col, Row, Button, Figure } from 'react-bootstrap'
import Map from './Map'


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
              <div className="mainPageContentSpace"></div>
              <h1 >Welcome to <span className="mainPageSpan">AmphibiHunt</span> </h1>
              <h1>Are <span className="mainPageSpan">you</span> ready to help? </h1>
              <div className="mainPageHeroSpace"></div>
              <h4>With a photograph and the push of a button <span className="mainPageSpan">you</span> can help us to assess the health of the UK environment, simply by finding and reporting the <span className="mainPageSpan">incredible species</span> of amphibians that we find around us.</h4>
              <div className="mainPageHeroSpace"></div>
            </Col>
            <Col xs="0" sm="1"></Col>
            <Col xs="4" sm="6">
              <Figure>
                <Figure.Image
                  rounded
                  alt="Common Frog"
                  src="https://imgur.com/KUk6utj.jpeg"
                  style={{
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                  }}
                />
                <Figure.Caption>
                  Common Frog (Rana temporaria)
                </Figure.Caption>
              </Figure>

            </Col>
          </Row>

        </Col>
        {/* <Col></Col> */}
      </Row>
      <div className="mainPageHeroSpace"></div>

      <Row>
        <Col sm={{ span: 4, offset: 3 }} md={{ span: 4, offset: 4 }}>
          <Button href='/survey' variant='primary' style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '50px',
            fontSize: 'x-large',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            backgroundColor: 'white',
            color: '#20c997',
            borderColor: '#20c997',
          }}>Ready to submit a survey? Click here</Button>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <div className="mainPageHeroSpace"></div>
      </Row>
      <Row className="justify-content-center">
        <Col xs="4" sm="9">
          <h1> Why amphibians? </h1>
          <div className="mainPageContentSpace"></div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs="4" sm="9">
          <h4>Amphibians are <span className="mainPageSpan">incredibly important</span> wetlands animals.
            They act as both <span className="mainPageSpan">predator and prey</span>, eating pest insects and invertebrates like slugs and snails, as well as providing <span className="mainPageSpan">vital food</span> for birds and other animals like otters, badgers and even hedgehogs.</h4>
          <div className="mainPageContentSpace"></div>
          <h4>The loss and degradation of wetland habitat has hit amphibians hard, with 40% of species declining worldwide according to a 2019 UN report, and the UK is no exception. Unfortunately, we just <span className="mainPageSpan"> don`&apos`t know </span> what the status of amphibians in the UK really is.</h4>
        </Col>
      </Row>
      <div className="mainPageContentSpace"></div>
      <div className="mainPageContentSpace"></div>
      <Row className="justify-content-center">
        <Row>
          <Col sm={{ span: 4, offset: 3 }} md={{ span: 4, offset: 4 }}>
            <Button href='/about' variant='primary' style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '50px',
              fontSize: 'x-large',
              boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
              backgroundColor: 'white',
              color: '#20c997',
              borderColor: '#20c997',
            }}>Want to find out more? Click here</Button>
          </Col>
        </Row>
      </Row>
      <Col className="mainPageHeroSpace"></Col>
      <Row className="justify-content-center">
        <Col xs="4" sm="9">
          <h1> How can <span className="mainPageSpan">you</span> help? </h1>
          <div className="mainPageContentSpace"></div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs="4" sm="9">
          <h4>It`&apos`s <span className="mainPageSpan">simple</span>, all you need to do is find amphibians in the wild, and <span className="mainPageSpan">report</span> your findings as a survey. These are our latest surveys - are there any near you?</h4>
          <div className="mainPageContentSpace"></div>
          <Row className="justify-content-center">
            <Col xs="4" sm="11">
              <Container >
                <Map />
              </Container>
            </Col>
          </Row>


          <div className="mainPageContentSpace"></div>
          <div className="mainPageContentSpace"></div>
          <div className="mainPageContentSpace"></div>
        </Col>
      </Row>
    </Container>

  )
}

export default Home