import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react'
import { Form, Button, Container, Col } from 'react-bootstrap'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { getTokenFromLocalStorage } from '../helpers/auth'
import { ImageUploadField } from '../ImageUploadField'

const Sighting = () => {
  const history = useHistory()
  const [formData, setFormData] = useState({
    image: '',
    image2: '',
    image3: '',
    number_of: '',
    amphibian: '',
    location: '',
  })
  const [errors, setErrors] = useState({
    image: '',
    image2: '',
    image3: '',
    number_of: '',
    amphibian: '',
    location: '',
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
      await axios.post('/api/sightings/', formData,
        {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        }
      )
      useEffect(() => {
        const getData = async () => {
          try {
            const { data } = await axios.get('/api/activities')
            console.log('GROUPS', data)
            setActivities(data)
    
          } catch (err) {
            setHasError(true)
            console.log('ERROR WHILE GETTING GROUP DATA', err)
          }
        }
        getData()
      }, [])
      history.push('/surveys/')
    } catch (err) {
      setErrors(err.response.data.errors)
      console.log('ERRORS>>>>', errors)
    }
  }

  const handleImageUrl = url => {
    setFormData({ ...formData, image: url })
  }

  console.log('formData', formData)
  console.log('errors on state', errors)
  return (
    <Container fluid="sm">
      <Col></Col>
      <Col>
        <h1> Please submit one sighting per species found:</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicSelect">
            <Form.Label>Which species did you find?</Form.Label>
            <Form.Select name="amphibian" onChange={handleChange} value={formData.amphibian}>
              <option>Select from...</option>
              <option value="3">Great Crested Newt (native)</option>
              <option value="8">Smooth Newt (native)</option>
              <option value="9">Palmate Newt (native)</option>
              <option value="4">Natterjack Toad (native)</option>
              <option value="5">Common Toad (native)</option>
              <option value="6">Common Frog (native)</option>
              <option value="7">Pool Frog (native)</option>
              <option value="12">Italian Crested Newt (non-native)</option>
              <option value="13">Alpine Newt (non-native)</option>
              <option value="10">Midwife Toad (non-native)</option>
              <option value="11">Green Frogs (non-native)</option>
              <option value="14">Bull Frog (non-native)</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicLocation">
            <Form.Label>LOCATION</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={formData.location}
              name="location"
              placeholder="E.g. 1, 2, or maybe 5 or 10!"/>
          </Form.Group>
          {errors.location && <p className="help is-danger">{errors.location}</p>}


          <Form.Group className="mb-3" controlId="formBasicNumber">
            <Form.Label>How many of these did you find?</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={formData.number_of}
              name="number_of"
              placeholder="E.g. 1, 2, or maybe 5 or 10!"/>
          </Form.Group>
          {errors.number_of && <p className="help is-danger">{errors.number_of}</p>}

          <Form.Group className="mb-3" controlId="formBasicImage">
            <Form.Label>And most importantly - please provide a picture of the amphibian(s) in question!</Form.Label>
            <ImageUploadField
              value={formData.image}
              name="image"
              handleImageUrl={handleImageUrl}
            />
            <ImageUploadField
              value={formData.image2}
              name="image"
              handleImageUrl={handleImageUrl}
            />
            <ImageUploadField
              value={formData.image3}
              name="image"
              handleImageUrl={handleImageUrl}
            />
          </Form.Group>
          {errors.image && <p className="help is-danger">{errors.image}</p>}

          <Button variant="primary" type="submit">Submit</Button>
        </Form>
      </Col>
      <Col></Col>
    </Container>

  )
}


export default Sighting