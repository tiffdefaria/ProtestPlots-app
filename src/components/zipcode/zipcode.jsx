import React from 'react'
import { Icon } from '@iconify/react'
import sendCircle from '@iconify/icons-mdi/map-search'
import './zipcode.css'
const formInputs = [
  { id: 'zipcode', type: 'text', label: 'Enter your zipcode', placeholder: 'Ex. 32612' },
]

const handleSubmit = (e) => {
  e.preventDefault()
  const zipcode = e.target.elements.zipcode.value
  console.log(zipcode)
  window.location.href = '/protestpg/' + zipcode
}

const Zipcode = () => (
  <div class = "background-image">
  <form onSubmit={handleSubmit} className="zipcode">   
    <h1>Welcome to Protest Plots!</h1>
      <h2>Find a protest near you!</h2>
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
            maxLength="5"
            name={input.id}
          />
        )}
      </label>
    ))
    }

   
    { <button onCilck = {(e) => {window.location.href = '/protestpg'}} className="zipcode-submit"> <Icon className="zipcode-submit" icon={sendCircle} /></button> }
  </form>
  </div>
)

export default Zipcode