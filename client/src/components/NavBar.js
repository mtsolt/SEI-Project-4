import { React, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Container, Col, Row, Nav } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import Login from './auth/Login'
// import Register from './components/auth/Register'
// import getPayload from './helpers/auth'


const NavBar = () => {

  return (
    <>
      <Navbar className="navbar-colour" variant="dark" >
        <Container>
          <Col></Col>
          <Col  className="justify-content-center" xs="4" sm="9">
            <Row>
            <Col className="logo-nav-items">
                AmphibiHunt
            </Col>
              <Col className="justify-content-center" >
                <Nav>
                  <LinkContainer to='/'>
                    <Nav.Link href="#home">Home</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/about'>
                    <Nav.Link href="#about">About</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/sightings'>
                    <Nav.Link href="#sightings">Sightings</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/survey'>
                    <Nav.Link href="#survey">Survey</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/map'>
                    <Nav.Link href="#map">Map</Nav.Link>
                  </LinkContainer>
                  <Login />
                  {/* <LinkContainer to='/register'>
                    <Nav.Link href="#register" onClick={handleShow}>Register</Nav.Link>
                  </LinkContainer> */}
                </Nav>
              </Col>
            </Row>
          </Col>
          <Col></Col>
        </Container>
      </Navbar>

    </>
    
  )
}

export default NavBar






