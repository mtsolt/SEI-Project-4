import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'


const About = () => {
  const [amphib, setAmphib] = useState('')
  const [errors, setErrors] = useState('')

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/amphibians/')
        console.log(data)
        setAmphib(data)
      } catch (err) {
        setErrors(err)
      }
    }
    getData()
  }, [])

  console.log('errors>>>>', errors)
  return (
    <>
      <h1>THIS IS WHY WE DO WHAT WE DOOOOOOO</h1>
    </>

  )
}

export default About