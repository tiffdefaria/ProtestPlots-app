import React from 'react'
import { Icon } from '@iconify/react'
import sendCircle from '@iconify/icons-mdi/map-search'
import './zipcode.css'

const formInputs = [
  { id: 'zipcode', type: 'text', label: 'Enter your zipcode', placeholder: 'Ex. 32612' },
]

const Zipcode = () => (
  <form className="zipcode">
    <h2 className="zipcode-h2">Find protests based on your location</h2>

    {
    formInputs.map(input => (
      <label key={input.label} id={input.id} className="zipcode-label">
        {input.label}

        {input.type === 'textarea' ? (
          <textarea className="zipcode-textarea" placeholder={input.placeholder} />
        ) : (
          <input
            className="zipcode-input"
            type={input.type}
            placeholder={input.placeholder}
          />
        )}
      </label>
    ))
    }

    <Icon className="zipcode-submit" icon={sendCircle} />

    {/* { <button className="form-submit" type="button">
      Search
    </button> } */}
  </form>
)

export default Zipcode