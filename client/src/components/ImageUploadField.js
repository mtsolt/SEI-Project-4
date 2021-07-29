import React from 'react'
import axios from 'axios'
import { Form } from 'react-bootstrap'


const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET

export const ImageUploadField = ({ handleImageUrl, value }) => {

  const handleUpload = async event => {
    const data = new FormData()
    data.append('file', event.target.files[0])
    data.append('upload_preset', uploadPreset)
    const res = await axios.post(uploadUrl, data)
    handleImageUrl(res.data.url)
  }

  return (
    <>
      <Form.Group className="mb-3" controlId="formBasicImage">
        {value ?
          <div>
            <img src={value} alt="profilePicturePreview" />
          </div>
          :
          <Form.Control
            className="input"
            type="file"
            name="profile_picture"
            onChange={handleUpload}
          />
        }
      </Form.Group>
    </>
  )
}

