import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Container } from 'react-bootstrap'
// import { getTokenFromLocalStorage, getPayload } from '../../helpers/auth'

const AmphibianShow = () => {
  const [amphibian, setAmphibian] = useState(null)
  const [hasError, setHasError] = useState(false)
  const { pk } = useParams()
  // const history = useHistory()

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/amphibians/${pk}`)
        console.log('DATA>>>', data)
        setAmphibian(data)
      } catch (err) {
        setHasError(true)
      }
    }
    getData()
  }, [pk])


  // const userIsOwner = (userId) => {
  //   const payload = getPayload()
  //   if (!payload) return false
  //   return userId === payload.sub
  // }

  // const handleDelete = async () => {
  //   try {
  //     await axios.delete(`/api/amphibians/${id}`, {
  //       headers: { 
  //         Authorization: `Bearer ${getTokenFromLocalStorage()}`, 
  //       },
  //     })
  //     history.push('/cheeses')
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  return (
    <Container fluid="sm">
      HI
      <div className="container">
        HI
        {amphibian ?
          <div>
            <h2 className="title has-text-centered">{amphibian.common_name}, {amphibian.scientific_name}</h2>
            <hr />
            <div className="columns">
              <div className="column is-half">
                <figure className="image">
                  <img src={amphibian.image} alt={amphibian.common_name}/>
                </figure>
              </div>
              <div className="column is-half">
                <h4 className="title is-4"><span role="img" aria-label="plate">🍽</span> Native?</h4>
                <p>{amphibian.native}</p>
                <hr />
                <h4 className="title is-4"><span role="img" aria-label="globe">🌍</span> Type?</h4>
                <hr />
                <p>{amphibian.type}</p>
                <hr />
                {/* <h4 className="title is-4"><span role="img" aria-label="wave">🖐</span> Added By</h4>
                <hr />
                <p>{cheese.user.username}</p>
                <hr /> */}
              </div>
            </div>
          </div>
          :
          <h2 className="title has-text-centered">
            {hasError ? 'Oh something went wrong, the sadness 😞' : '...loading 🧀 '}
          </h2>
        }
      </div>
    </Container>
  )
}

export default AmphibianShow
