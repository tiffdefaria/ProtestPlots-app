import React from 'react'
import GoogleMapReact from 'google-map-react'
import json from '../../credentials.json'
import './map.css'

fetch('../credentials.json')

const Map = ({ location, zoomLevel }) => (
    <div className="map">
      <h2 className="map-h2">Welcome to Protest Plots!</h2>
  
      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: json.key }}
          defaultCenter={location}
          defaultZoom={zoomLevel}
        >
        </GoogleMapReact>
      </div>
    </div>
  )

  export default Map