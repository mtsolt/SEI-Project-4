import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Container, Col, Row, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useLocation, useHistory } from 'react-router-dom'
import Login from './auth/Login'
import { getPayload } from './helpers/auth'
// import Register from './components/auth/Register'
// import getPayload from './helpers/auth'


const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { pathname } = useLocation()
  const history = useHistory()

  // const handleMenuToggle = () => {
  //   setIsOpen(!isOpen)
  // }

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    history.push('/')
  }

  const userIsAuthenticated = () => {
    const payload = getPayload()
    if (!payload) return false
    const now = Math.round(Date.now() / 1000)
    return now < payload.exp
  }

  console.log('isOpen', isOpen)
  return (
    <>
      <Navbar className="navbar-colour" variant="dark" style={{
        fontSize: 'x-large',
      }} >
        <Container>
          <Col></Col>
          <Col className="justify-content-center" xs="4" sm="8">
            <Row>
              <Col className="justify-content-center">
                <Nav >
                  <LinkContainer to='/'>

                    <Nav.Link href="#home"><h2>AmphibiHunt</h2></Nav.Link>
                  </LinkContainer>
                </Nav>
              </Col>
              <Col className="justify-content-center" xs="4" sm="6" >
                <Nav className="justify-content-center">
                  <LinkContainer to='/'>
                    <Nav.Link href="#home">Home</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/about'>
                    <Nav.Link href="#about">About</Nav.Link>
                  </LinkContainer>
                  {/* <LinkContainer to='/sightings'>
                    <Nav.Link href="#sightings">Sightings</Nav.Link>
                  </LinkContainer> */}
                  <LinkContainer to='/survey'>
                    <Nav.Link href="#survey">Survey</Nav.Link>
                  </LinkContainer>
                  {!userIsAuthenticated() ?
                    <>
                      <Login />
                    </>
                    :
                    <LinkContainer to='/'>
                      <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
                    </LinkContainer>
                  }
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






