import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
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
      history.push('/auth/login')
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
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            onChange={handleChange}
            value={formData.username}
            name="username"
            placeholder="Please enter your username" />
        </Form.Group>
        {errors.username && <p className="help is-danger">{errors.username}</p>}

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            onChange={handleChange}
            value={formData.email}
            name="email"
            placeholder="Please enter your email" />
        </Form.Group>
        {errors.email && <p className="help is-danger">{errors.email}</p>}

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={handleChange}
            value={formData.password}
            type="password"
            name="password"
            placeholder="Password" />
        </Form.Group>
        {errors.password && <p className="help is-danger">{errors.password}</p>}

        <Form.Group className="mb-3" controlId="formBasicPasswordConfirmation">
          <Form.Label>Please confirm your password</Form.Label>
          <Form.Control
            onChange={handleChange}
            value={formData.password_confirmation}
            type="password"
            name="password_confirmation"
            placeholder="Please confirm your password" />
        </Form.Group>
        {errors.password_confirmation && <p className="help is-danger">{errors.password_confirmation}</p>}

        <Form.Group className="mb-3" controlId="formBasicFirstName">
          <Form.Label>First Name (optional)</Form.Label>
          <Form.Control
            onChange={handleChange}
            value={formData.first_name}
            name="first_name"
            placeholder="First name" />
        </Form.Group>
        {errors.first_name && <p className="help is-danger">{errors.first_name}</p>}

        <Form.Group className="mb-3" controlId="formBasicLastName">
          <Form.Label>Last Name (optional)</Form.Label>
          <Form.Control
            onChange={handleChange}
            value={formData.last_name}
            name="last_name"
            placeholder="Last name" />
        </Form.Group>
        {errors.last_name && <p className="help is-danger">{errors.last_name}</p>}

        <Form.Group className="mb-3" controlId="formBasicImage">
          <ImageUploadField 
            value={formData.profile_picture}
            name="profile_picture"
            handleImageUrl={handleImageUrl}
          />
        </Form.Group>
        {errors.profile_picture && <p className="help is-danger">{errors.profile_picture}</p>}

        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </Container>

  )
}

export default Register

// "first_name": "Mike",
// 	"last_name": "Solty",
// 	"profile_picture": "image.test"