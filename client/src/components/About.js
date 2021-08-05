import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Col, Row, Container, Figure } from 'react-bootstrap'
import AmphibianCard from './amphibian/AmphibianCard'


const About = () => {
  const [amphibians, setAmphibians] = useState('')
  const [errors, setErrors] = useState('')

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/amphibians/')
        console.log(data)
        setAmphibians(data)
      } catch (err) {
        setErrors(err)
      }
    }
    getData()
  }, [])

  console.log('errors>>>>', errors)
  console.log('AMPHIBIANS', amphibians)
  return (
    <>
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col className="mainPageSpace"></Col>
        </Row>
        <Row>
          <Col md={{ span: 4, offset: 1 }}>
            <h1> So why Amphibians? </h1>
            <div className="mainPageContentSpace"></div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs="4" sm="9">
            <h4>The <span className="mainPageSpan">loss and degradation of wetland habitat</span> has hit amphibians hard, with 40% of species declining worldwide according to a 2019 UN report, and the <span className="mainPageSpan">UK is no exception</span>. Unfortunately, we just <span className="mainPageSpan"> don`&apos`t know </span> what the status of amphibians in the UK really is. That`&apos`s where you come in.</h4>
          </Col>
        </Row>
        <Row >
          <Col className="mainPageHeroSpace"></Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs="4" sm="6">
            {/* <div className ="mainPageImage">
              <Image src="https://imgur.com/BQfAZbH.jpeg" rounded sm="8" alt="Great Crested Newt"/>
            </div> */}
            <Figure>
              <Figure.Image
                rounded
                alt="Great Crested Newt"
                src="https://imgur.com/BQfAZbH.jpeg"
                style={{
                  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                }}
              />
              <Figure.Caption>
                Great Crested Newt  (Triturus cristatus)
              </Figure.Caption>
            </Figure>
          </Col>
        </Row>
        <Row >
          <Col className="mainPageHeroSpace"></Col>
        </Row>
        <Row>
          <Col md={{ span: 4, offset: 1 }}>
            <h1> Did you know? </h1>
            <div className="mainPageContentSpace"></div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs="4" sm="9">
            <h4>Amphibians are <span className="mainPageSpan">incredibly important</span> animals. They act as both predator and prey, eating pest insects and invertebrates like slugs and snails, as well as providing <span className="mainPageSpan">vital food</span> for birds and other animals like otters, badgers and even hedgehogs.</h4>
            <div className="mainPageContentSpace"></div>
            <h4> There are seven amphibian species native to the UK? And they`&apos`re all<span className="mainPageSpan"> unique</span> and important in their own way</h4>
          </Col>
        </Row>
        <Row >
          <Col className="mainPageHeroSpace"></Col>
        </Row>
        <Row>
          <Col md={{ span: 4, offset: 1 }}>
            <h1>Species </h1>
            {/* <div className="mainPageContentSpace"></div> */}
          </Col>
        </Row>
        <Row >
          <Col className="mainPageContentSpace"></Col>
        </Row>
        <Container fluid className="amphibianIndex" >
          {amphibians.length > 0 ?
            <Row xs="1" sm="2" md="4" className="amphibianIndex">
              {amphibians.map(amphibian => {
                return <AmphibianCard key={amphibian.id} {...amphibian} />
              })}
            </Row>
            :
            <h2>
              {errors ? 'Something has gone wrong!' : 'loading....amphibians'}
            </h2>
          }
        </Container>

      </Container>
    </>
  )
}

export default About

