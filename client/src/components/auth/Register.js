import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { ImageUploadField } from '../ImageUploadField'


const Register = () => {
  const history = useHistory()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    first_name: '',
    last_name: '',
    profile_picture: '',
  })
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    first_name: '',
    last_name: '',
    profile_picture: '',
  })

  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    const newErrors = { ...errors, [event.target.name]: '' }
    console.log('state', formData)
    setFormData(newFormData)
    setErrors(newErrors)
  }
  const handleSubmit = async event => {
    event.preventDefault()
    console.log('submitted')
    try {
      // await axios.post('http://localhost:8000/auth/register/', formData)
      await axios.post('/api/auth/register/', formData)
      history.push('/')
    } catch (err) {
      setErrors(err.response.data.response)
      console.log('ERRORS>>>>', errors)
    }
  }

  const handleImageUrl = url => {
    setFormData({ ...formData, profile_picture: url })
  }

  console.log('formData', formData)
  console.log('errors on state', errors)
  return (
    <Container fluid="sm">
      <div className="mainPageHeroSpace"></div>
      <Row className="justify-content-center">
        <Col xs="2" sm="5" >
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label style={{
                backgroundColor: 'white',
                color: '#20c997',
                borderColor: '#20c997',
              }}>Username
              </Form.Label>
              <Form.Control
                onChange={handleChange}
                value={formData.username}
                name="username"
                placeholder="Please enter your username"
                style={{
                  backgroundColor: 'white',
                  color: '#20c997',
                  borderColor: '#20c997',
                }} />
            </Form.Group>
            {errors.username && <p className="help is-danger">{errors.username}</p>}

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={{
                backgroundColor: 'white',
                color: '#20c997',
                borderColor: '#20c997',
              }}>Email</Form.Label>
              <Form.Control
                onChange={handleChange}
                value={formData.email}
                name="email"
                placeholder="Please enter your email"
                style={{
                  backgroundColor: 'white',
                  color: '#20c997',
                  borderColor: '#20c997',
                }} />
            </Form.Group>
            {errors.email && <p className="help is-danger">{errors.email}</p>}

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label style={{
                backgroundColor: 'white',
                color: '#20c997',
                borderColor: '#20c997',
              }}>Password</Form.Label>
              <Form.Control
                onChange={handleChange}
                value={formData.password}
                type="password"
                name="password"
                placeholder="Password"
                style={{
                  backgroundColor: 'white',
                  color: '#20c997',
                  borderColor: '#20c997',
                }} />
            </Form.Group>
            {errors.password && <p className="help is-danger">{errors.password}</p>}

            <Form.Group className="mb-3" controlId="formBasicPasswordConfirmation">
              <Form.Label style={{
                backgroundColor: 'white',
                color: '#20c997',
                borderColor: '#20c997',
              }}>Please confirm your password</Form.Label>
              <Form.Control
                onChange={handleChange}
                value={formData.password_confirmation}
                type="password"
                name="password_confirmation"
                placeholder="Please confirm your password"
                style={{
                  backgroundColor: 'white',
                  color: '#20c997',
                  borderColor: '#20c997',
                }} />
            </Form.Group>
            {errors.password_confirmation && <p className="help is-danger">{errors.password_confirmation}</p>}

            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label style={{
                backgroundColor: 'white',
                color: '#20c997',
                borderColor: '#20c997',
              }}>First Name (optional)
              </Form.Label>
              <Form.Control
                onChange={handleChange}
                value={formData.first_name}
                name="first_name"
                placeholder="First name"
                style={{
                  backgroundColor: 'white',
                  color: '#20c997',
                  borderColor: '#20c997',
                }} />
            </Form.Group>
            {errors.first_name && <p className="help is-danger">{errors.first_name}</p>}

            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label style={{
                backgroundColor: 'white',
                color: '#20c997',
                borderColor: '#20c997',
              }}>
                Last Name (optional)
              </Form.Label>
              <Form.Control
                onChange={handleChange}
                value={formData.last_name}
                name="last_name"
                placeholder="Last name"
                style={{
                  backgroundColor: 'white',
                  color: '#20c997',
                  borderColor: '#20c997',
                }} />
            </Form.Group>
            {errors.last_name && <p className="help is-danger">{errors.last_name}</p>}

            <Form.Group className="mb-3" controlId="formBasicImage">
              <Form.Label style={{
                backgroundColor: 'white',
                color: '#20c997',
                borderColor: '#20c997',
              }}>Profile Picture (optional)
              </Form.Label>
              <ImageUploadField
                value={formData.profile_picture}
                name="profile_picture"
                handleImageUrl={handleImageUrl}
                style={{
                  backgroundColor: 'white',
                  color: '#20c997',
                  borderColor: '#20c997',
                }}
              />
            </Form.Group>
            {errors.profile_picture && <p className="help is-danger">{errors.profile_picture}</p>}
            <div className="mainPageContentSpace"></div>
            <Row className="justify-content-center">
              <Col xs="4" sm="5">
                <Button variant="primary" type="submit"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '50px',
                    fontSize: 'large',
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                    backgroundColor: 'white',
                    color: '#20c997',
                    borderColor: '#20c997',
                    paddingLeft: '50px',
                    paddingRight: '50px',
                  }}>Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Col className="mainPageSpace"></Col>
    </Container>

  )
}

export default Register

// "first_name": "Mike",
// 	"last_name": "Solty",
// 	"profile_picture": "image.test"