import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState } from 'react'
import { Form, Button, Container, Col } from 'react-bootstrap'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { getTokenFromLocalStorage } from '../helpers/auth'



const Survey = () => {
  const history = useHistory()
  const [newId, setNewId] = useState('')
  const [formData, setFormData] = useState({
    text: '',
    spotted_on: '',
    location_x: '',
    location_y: '',
    water_habitat: '',
    land_habitat: '',
    county: '',
  })
  const [errors, setErrors] = useState({
    text: '',
    spotted_on: '',
    location_x: '',
    location_y: '',
    water_habitat: '',
    land_habitat: '',
    county: '',
  })

  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    const newErrors = { ...errors, [event.target.name]: '' }
    console.log('FORM', formData)
    setFormData(newFormData)
    setErrors(newErrors)
  }
  const handleSubmit = async event => {
    event.preventDefault()
    console.log('submitted')
    try {
      const response = await axios.post('/api/surveys/', formData,
        {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        }
      )
      console.log(response.data.id, 'response data')
      history.push(`/surveys/${response.data.id}`)
      
    } catch (err) {
      setErrors(err.response.data.errors)
      console.log('ERRORS>>>>', errors)
    }
  }




  console.log('formData', formData)
  console.log('errors on state', errors)
  console.log('newId outside', newId)
  return (
    <Container fluid="sm">
      <Col></Col>
      <Col>
        <h1> First, please give us some detail around the area in which the hunt took place:</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicDate">
            <Form.Label>When was the Amphibihunt?</Form.Label>
            <Form.FloatingLabel
              controlId="floatingInput"
              label="e.g. 2020-12-25 12:00 for the 25th December 2020 at 12:00">
              <Form.Control
                onChange={handleChange}
                value={formData.spotted_on}
                name="spotted_on" />
            </Form.FloatingLabel>
          </Form.Group>
          {errors.spotted_on && <p className="help is-danger">{errors.spotted_on}</p>}

          <Form.Group className="mb-3" controlId="formBasicLocationX">
            <Form.Label>Location X of hunt</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={formData.location_x}
              name="location_x"
              placeholder="Please enter x co-ordinates of hunt" />
          </Form.Group>
          {errors.location_x && <p className="help is-danger">{errors.location_x}</p>}

          <Form.Group className="mb-3" controlId="formBasicLocationY">
            <Form.Label>Location Y of hunt</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={formData.location_y}
              name="location_y"
              placeholder="Please enter y co-ordinates of the hunt" />
          </Form.Group>
          {errors.location_y && <p className="help is-danger">{errors.location_y}</p>}

          <Form.Group className="mb-3" controlId="formBasicCounty">
            <Form.Label>And that was in which county in the UK?</Form.Label>
            <Form.Select name="county" onChange={handleChange} value={formData.county}>
              <option>Select from...</option>
              <option value="1">Avon</option>
              <option value="2">Bedfordshire</option>
              <option value="3">Berkshire</option>
              <option value="4">Buckinghamshire</option>
              <option value="5">Cambridgeshire</option>
            </Form.Select>
          </Form.Group>
          {errors.county && <p className="help is-danger">{errors.county}</p>}


          <Form.Group className="mb-3" controlId="formBasicSelect">
            <Form.Label>Which of the following best describes the water environment in the area?</Form.Label>
            {/* <Form.Select {*aria-label="Default select example"> */}
            <Form.Select name="water_habitat" onChange={handleChange} value={formData.water_habitat}>
              <option>Select from...</option>
              <option value="1">Natural Pond</option>
              <option value="2">Man-Made Pond</option>
              <option value="3">Natural Stream</option>
              <option value="4">Marsh</option>
              <option value="5">River</option>
            </Form.Select>
          </Form.Group>


          <Form.Group className="mb-3" controlId="formBasicSelect">
            <Form.Label>Which of the following best describes the land environment in the area?</Form.Label>
            <Form.Select name="land_habitat" onChange={handleChange} value={formData.land_habitat}>
              <option>Select from...</option>
              <option value="1">Woodland</option>
              <option value="2">Open Field</option>
              <option value="3">Garden</option>
              <option value="4">Urban</option>
            </Form.Select>
          </Form.Group>


          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Text</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={formData.text}
              name="text"
              placeholder="Please enter any other relevant information about the survey"
              style={{ height: '100px' }} />
          </Form.Group>
          {errors.text && <p className="help is-danger">{errors.text}</p>}

          <Button variant="primary" type="submit">Submit</Button>
        </Form>
      </Col>
      <Col></Col>
    </Container>

  )
}

export default Survey

