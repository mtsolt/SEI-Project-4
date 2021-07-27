import { React, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Modal from 'react-bootstrap/Modal'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'




const NavBar = () => {

  

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  return (
    <>
      <Navbar className="navbar-colour" Navbar bg="" variant="dark" >
        <Container>
          <Col></Col>
          <Col>
            <div className="logo-nav-items">
              <div className="logo">
                AMPHIBIHUNT
                {/* <Navbar.Brand href="/"><Image src="https://imgur.com/0C9foJS.jpeg" /></Navbar.Brand> */}
              </div>
              <div className="navbar-items">
                <Nav className="mr-auto">
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
                  <LinkContainer to='/login'>
                    <Nav.Link href="#login" onClick={handleShow}>Login</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                    <Nav.Link href="#register" onClick={handleShow}>Register</Nav.Link>
                  </LinkContainer>
                </Nav>
              </div>
            </div>
          </Col>
          <Col></Col>
        </Container>
      </Navbar>

      <section>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{location.pathname === '/login' ? 'Login Now' : 'Register Now'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{location.pathname === '/login' ? 'Please enter your details now' 

            : 'Please sign up to join our survey!'} </Modal.Body>
          <Modal.Footer>
            <Link onClick={() => handleClose()} to={location.pathname === '/login' ? '/auth/login' : '/auth/register'}>Log in Here</Link>
            <Link onClick={() => handleClose()} to={location.pathname === '/register' ? '/auth/register' : '/auth/login'}>Register an account Here</Link>
          </Modal.Footer>
        </Modal>
      </section>
    </>
    
  )
}

export default NavBar






