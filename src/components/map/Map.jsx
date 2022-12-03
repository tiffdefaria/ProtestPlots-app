import React from 'react'
import GoogleMapReact from 'google-map-react'
import json from '../../credentials.json'
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'
import './map.css'

fetch('../credentials.json')

const LocationPin = ({ text }) => (
  <div className="pin">
    <Icon icon={locationIcon} className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
)

const Map = ({ location, zoomLevel }) => (
    <div className="map">
      <h1 className="map-h2">Find protests across Florida</h1>
  
      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: json.key }}
          defaultCenter={location}
          defaultZoom={zoomLevel}
        >
        <LocationPin
          lat={location.lat}
          lng={location.lng}
          text={location.address}
        />
        </GoogleMapReact>
      </div>
    </div>
  )

  export default Map