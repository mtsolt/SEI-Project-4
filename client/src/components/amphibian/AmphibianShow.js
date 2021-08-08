import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Container, Figure, Row, Col, Button } from 'react-bootstrap'
// import { getTokenFromLocalStorage, getPayload } from '../../helpers/auth'

const AmphibianShow = () => {
  const [amphibian, setAmphibian] = useState(null)
  const [hasError, setHasError] = useState(false)
  const { pk } = useParams()
  // const history = useHistory()

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/amphibians/${pk}/`)
        console.log('DATA>>>', data)
        setAmphibian(data)
      } catch (err) {
        setHasError(true)
      }
    }
    getData()
  }, [pk])


  // const userIsOwner = (userId) => {
  //   const payload = getPayload()
  //   if (!payload) return false
  //   return userId === payload.sub
  // }

  // const handleDelete = async () => {
  //   try {
  //     await axios.delete(`/api/amphibians/${id}`, {
  //       headers: { 
  //         Authorization: `Bearer ${getTokenFromLocalStorage()}`, 
  //       },
  //     })
  //     history.push('/cheeses')
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  return (

    <>
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col className="mainPageSpace"></Col>
        </Row>
        {amphibian ?
          <Container fluid>
            <Row className="justify-content-center">
              <Col xs="2" sm="10" >
                <Row>
                  <Col className="mainPageHero" xs="2" sm="5" style={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}>
                    <h2 style={{
                      color: '#20c997',
                      display: 'flex',
                      justifyContent: 'center',

                    }}>{amphibian.common_name}</h2>
                    <h3 style={{
                      fontStyle: 'italic',
                      display: 'flex',
                      justifyContent: 'center',
                    }}>{amphibian.scientific_name}</h3>

                    {/* <div className="mainPageContentSpace"></div> */}
                    <h4 style={{
                      display: 'flex',
                      justifyContent: 'center',
                      textAlign: 'center',
                      padding: '40px',
                    }}> {amphibian.identification}</h4>
                  </Col>
                  <Col xs="4" sm="6" style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                    <Figure >
                      <Figure.Image
                        rounded
                        alt={`${amphibian.common_name}`}
                        src={`${amphibian.image}.jpeg`}
                        style={{
                          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',

                        }} />
                    </Figure>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <div className="mainPageHeroSpace"></div>
            </Row>
            <Row>
              <Col sm={{ span: 4, offset: 2 }} md={{ span: 8, offset: 2 }}>
                <h4>{amphibian.about}</h4>
              </Col>
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
                }}>Have you seen one? Let us know!</Button>
              </Col>
            </Row>
            <div className="mainPageHeroSpace"></div>
            <div className="mainPageHeroSpace"></div>
            <Row className="justify-content-center">
              <Col xs="4" sm="10">
                <h2><span className="mainPageSpan"> Fact:</span> </h2>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col xs="4" sm="9">
                <h4>{amphibian.fact}</h4>
              </Col>
            </Row>
            <div className="mainPageHeroSpace"></div>

            <Row className="justify-content-center">
              <Col xs="4" sm="10">
                <h2><span className="mainPageSpan"> Distribution:</span></h2>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col xs="4" sm="9">
                <h4>{amphibian.distribution}</h4>
              </Col>
            </Row>
            <div className="mainPageHeroSpace"></div>

            <Row className="justify-content-center">
              <Col xs="4" sm="10">
                <h2><span className="mainPageSpan"> Life Cycle:</span></h2>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col xs="4" sm="9">
                <h4>{amphibian.life_cycle}</h4>
              </Col>
            </Row>
            <div className="mainPageHeroSpace"></div>

            <Row className="justify-content-center">
              <Col xs="4" sm="10">
                <h2><span className="mainPageSpan"> Protection:</span></h2>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col xs="4" sm="9">
                <h4>{amphibian.protection}</h4>
              </Col>
            </Row>
            <div className="mainPageHeroSpace"></div>
          </Container>
          :
          <Container>
            <Row>
              <Col>
                <h2>{hasError ? 'Something has gone wrong, please refresh page' : '...loading amphibian '}</h2>
              </Col>
            </Row>
          </Container>
        }
      </Container>
    </>
  )
}

export default AmphibianShow
