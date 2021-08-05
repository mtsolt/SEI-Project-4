import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState } from 'react'
import { Form, Button, Container, Col, Row } from 'react-bootstrap'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { getTokenFromLocalStorage } from '../helpers/auth'
import Map from '../Map'



const Survey = () => {
  const history = useHistory()
  // const [newId, setNewId] = useState('')
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
  // console.log('newId outside', newId)
  return (
    <Container fluid >
      <div className="mainPageHeroSpace"></div>
      <Row className="justify-content-center">
        <Col xs="2" sm="5">
          <h3> First, please give us some detail around the area in which the <span className="mainPageSpan">survey</span> took place:</h3>
          <div className="mainPageHeroSpace"></div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicDate">
              <Form.Label style={{
                backgroundColor: 'white',
                color: '#20c997',
                borderColor: '#20c997',
              }}><h4>When was the Amphibihunt?</h4></Form.Label>
              <Form.FloatingLabel
                controlId="floatingInput"
                label="e.g. 2020-12-25 12:00 for the 25th December 2020 at 12:00">
                <Form.Control
                  onChange={handleChange}
                  value={formData.spotted_on}
                  name="spotted_on"
                  style={{
                    backgroundColor: 'white',
                    color: '#20c997',
                    borderColor: '#20c997',
                  }} />
              </Form.FloatingLabel>
              <div className="mainPageHeroSpace"></div>
            </Form.Group>
            {errors.spotted_on && <p className="help is-danger">{errors.spotted_on}</p>}
            <Form.Group>
              <Form.Label style={{
                backgroundColor: 'white',
                color: '#20c997',
                borderColor: '#20c997',
              }}><h4>Where was the Amphibihunt?</h4></Form.Label>
              <Row style={{
                minHeight: '300px',
              }}>
                <Map />
              </Row>
            </Form.Group>
            <div className="mainPageHeroSpace"></div>

            <Form.Group className="mb-3" controlId="formBasicLocationX">
              <Form.Label style={{
                backgroundColor: 'white',
                color: '#20c997',
                borderColor: '#20c997',
              }}><h4>Latitude of survey</h4></Form.Label>
              <Form.Control
                onChange={handleChange}
                value={formData.location_x}
                name="location_x"
                placeholder="Please enter x co-ordinates of hunt"
                style={{
                  backgroundColor: 'white',
                  color: '#20c997',
                  borderColor: '#20c997',
                }} />
            </Form.Group>
            {errors.location_x && <p className="help is-danger">{errors.location_x}</p>}

            <Form.Group className="mb-3" controlId="formBasicLocationY">
              <Form.Label style={{
                backgroundColor: 'white',
                color: '#20c997',
                borderColor: '#20c997',
              }}><h4>Longitude of survey</h4></Form.Label>
              <Form.Control
                onChange={handleChange}
                value={formData.location_y}
                name="location_y"
                placeholder="Please enter y co-ordinates of the hunt"
                style={{
                  backgroundColor: 'white',
                  color: '#20c997',
                  borderColor: '#20c997',
                }} />
            </Form.Group>
            {errors.location_y && <p className="help is-danger">{errors.location_y}</p>}

            <Form.Group className="mb-3" controlId="formBasicCounty">
              <Form.Label style={{
                backgroundColor: 'white',
                color: '#20c997',
                borderColor: '#20c997',
              }}><h4>In which county?</h4></Form.Label>
              <Form.Select name="county" onChange={handleChange} value={formData.county}
                style={{
                  backgroundColor: 'white',
                  borderColor: '#20c997',
                }}>
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
              <Form.Label style={{
                backgroundColor: 'white',
                color: '#20c997',
                borderColor: '#20c997',
              }}><h4>Which of the following best describes the water environment in the area? </h4></Form.Label>

              {/* <Form.Select {*aria-label="Default select example"> */}
              <Form.Select name="water_habitat" onChange={handleChange} value={formData.water_habitat}
                style={{
                  backgroundColor: 'white',
                  borderColor: '#20c997',
                }}>
                <option>Select from...</option>
                <option value="1">Natural Pond</option>
                <option value="2">Man-Made Pond</option>
                <option value="3">Natural Stream</option>
                <option value="4">Marsh</option>
                <option value="5">River</option>
              </Form.Select>
            </Form.Group>


            <Form.Group className="mb-3" controlId="formBasicSelect">
              <Form.Label style={{
                backgroundColor: 'white',
                color: '#20c997',
                borderColor: '#20c997',
              }}><h4>Which of the following best describes the land environment in the area? </h4></Form.Label>

              <Form.Select name="land_habitat" onChange={handleChange} value={formData.land_habitat}
                style={{
                  backgroundColor: 'white',
                  borderColor: '#20c997',
                }}>
                <option>Select from...</option>
                <option value="1">Woodland</option>
                <option value="2">Open Field</option>
                <option value="3">Garden</option>
                <option value="4">Urban</option>
              </Form.Select>
            </Form.Group>


            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label style={{
                backgroundColor: 'white',
                color: '#20c997',
                borderColor: '#20c997',
              }}><h4>Finally, please add any other relevant information about the survey</h4></Form.Label>

              <Form.Control
                onChange={handleChange}
                value={formData.text}
                name="text"
                placeholder="E.g. were there other animals in the area? Did you recognise the type of vegetation?"
                style={{
                  height: '100px',
                  backgroundColor: 'white',
                  borderColor: '#20c997',
                }} />
            </Form.Group>
            {errors.text && <p className="help is-danger">{errors.text}</p>}
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
                  <h4>Click here to add Amphibians!</h4>
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <div className="mainPageContentSpace"></div>
      <div className="mainPageContentSpace"></div>
    </Container>

  )
}

export default Survey

