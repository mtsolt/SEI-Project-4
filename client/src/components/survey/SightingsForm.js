import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Button, Container, Col, Row } from 'react-bootstrap'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { getTokenFromLocalStorage } from '../helpers/auth'
import { ImageUploadField } from '../ImageUploadField'

const Sighting = () => {
  const { pk } = useParams()
  const history = useHistory()
  const [formData, setFormData] = useState({
    image: '',
    image2: '',
    image3: '',
    number_of: '',
    amphibian: '',
    location: `${pk}`,
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
      const response = await axios.post('/api/sightings/', formData,
        {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        }
      )
      console.log(response.data, 'response data')
      history.push(`/surveys/${pk}`)
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
    <Container fluid >
      <div className="mainPageHeroSpace"></div>
      <Row className="justify-content-center">
        <Col xs="2" sm="5">
          <h3> Please submit <span className="mainPageSpan">one sighting</span> per species found:</h3>
          <div className="mainPageHeroSpace"></div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicSelect">
              <Form.Label style={{
                backgroundColor: 'white',
                color: '#20c997',
                borderColor: '#20c997',
              }}><h4>Which species did you find?</h4></Form.Label>
              <Form.Select name="amphibian" onChange={handleChange} value={formData.amphibian}
                style={{
                  backgroundColor: 'white',

                  borderColor: '#20c997',
                }}>
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

            {/* <Form.Group className="mb-3" controlId="formBasicLocation">
            <Form.Label>LOCATION</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={formData.location}
              name="location"
              placeholder="E.g. 1, 2, or maybe 5 or 10!"/>
          </Form.Group>
          {errors.location && <p className="help is-danger">{errors.location}</p>} */}


            <Form.Group className="mb-3" controlId="formBasicNumber">
              <Form.Label
                style={{
                  backgroundColor: 'white',
                  color: '#20c997',
                  borderColor: '#20c997',
                }}><h4>How many of these did you find?</h4></Form.Label>
              <Form.Control
                onChange={handleChange}
                value={formData.number_of}
                name="number_of"
                placeholder="E.g. 1, 2, or maybe 5 or 10!"
                style={{
                  backgroundColor: 'white',
                  color: '#20c997',
                  borderColor: '#20c997',
                }} />
            </Form.Group>
            {errors.number_of && <p className="help is-danger">{errors.number_of}</p>}

            <Form.Group className="mb-3" controlId="formBasicImage">
              <Form.Label
                style={{
                  backgroundColor: 'white',
                  color: '#20c997',
                  borderColor: '#20c997',
                }}><h4>And most importantly - please provide a picture of the amphibian(s) in question!</h4></Form.Label>
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

            <div className="mainPageContentSpace"></div>
            <Row className="justify-content-center">
              <Col xs="4" sm="7">
                <Button variant="primary" type="submit" style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '50px',
                  // fontSize: 'large',
                  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                  backgroundColor: 'white',
                  color: '#20c997',
                  borderColor: '#20c997',
                  paddingLeft: '50px',
                  paddingRight: '50px',
                }}>
                  <h4>Click here to add Amphibian</h4>
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>

  )
}


export default Sighting