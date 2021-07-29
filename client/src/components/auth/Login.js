import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { Form, Button, Container, Row, Col, Nav, Modal } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'

const Login = () => {
    const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const history = useHistory()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, hasErrors] = useState({
    email: '',
    password: '',
  })

  const handleChange = (event) => {
    const userData = { ...formData, [event.target.name]: event.target.value }
    setFormData(userData)
  }
  
  const setTokenToLocalStorage = (token) => {
    window.localStorage.setItem('token', token)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/login/', formData)
      setTokenToLocalStorage(data.token)
      console.log('TOKEN>>>>', data.token)
      history.push('/')
    } catch (err) {
      hasErrors(err.response.data.errors)
    }
  }

  console.log('USER LOG IN DATA', formData)
  return (
      <>  
       <Nav.Link onClick={handleShow}>Login</Nav.Link>
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Log In</Modal.Title>
          </Modal.Header>

          <Modal.Body>
          <Container fluid className="login">
            <Row className="justify-content-center">
              <Col xs="4" sm="8" >
                <Form onSubmit={handleSubmit} data-dismiss="modal" >
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      onChange={handleChange}
                      value={formData.email}
                      name="email"
                      placeholder="Enter email" />
                  </Form.Group>
                  {errors.email && <p className="help is-danger">{errors.email}</p>}

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      onChange={handleChange}
                      type="password"
                      value={formData.password}
                      name="password"
                      placeholder="Enter password" />
                  </Form.Group>
                  {errors.password && <p className="help is-danger">{errors.password}</p>}

                  <Button variant="primary" type="submit" onClick={() => handleClose()}>
                    Login
                  </Button>
                </Form>
                    </Col>
                  </Row>
              </Container>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
              <p>Don't have an account? <Link onClick={() => handleClose()} to={'auth/register'}> Sign up here</Link></p>
            </Modal.Footer>
          </Modal>
        </>
  )
}


export default Login