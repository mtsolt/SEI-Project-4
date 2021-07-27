import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { Form, Button, Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const Login = () => {
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
    <Container fluid="sm" className="login">

      <Form onSubmit={handleSubmit} >
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

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <div>
        <p>Do not have an account? Register here</p>
      </div>
    </Container>

  )
}


export default Login