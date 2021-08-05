import React from 'react'
// import { useParams } from 'react-router-dom'
// import axios from 'axios'
import { Container, Col, Button, Row } from 'react-bootstrap'

// eslint-disable-next-line
const AmphibianCard = ({ id, common_name, image }) => {
  return (
    <Container className="justify-content-center" style={{
      margin: '10px',
    }}>
      <Row>
        <div className="indexBuffer"></div>
        <Col xs={12}>
          <Button href={`http://localhost:3000/amphibian/${id}`} style={{
            minHeight: '300px',
            backgroundImage: `url("${image}.jpeg")`,
            backgroundSize: 'cover',
            borderColor: '#20c997',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'start',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            // backgroundPosition: 'right',
          }}>
            {/* eslint-disable-next-line */}
            {common_name}</Button>
        </Col>
        <div className="indexBuffer"></div>
      </Row>

    </Container>
  )
}


export default AmphibianCard