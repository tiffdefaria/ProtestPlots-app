import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import MapSection from './components/map/Map'
import SidebarSection from './components/sidebar/sidebar-section'
import { Container } from "semantic-ui-react";
import './ProtestPg.css'
import './components/zipcode/zipcode'
import zipcodeJson from './zipcodes.json'
fetch('../zipcodes.json')

console.log(localStorage["Zipcode"]);

if(localStorage["Zipcode"] == null || localStorage["Zipcode"] === ""){
  localStorage.setItem("Zipcode", 32612);
}

const location = {
    address: 'Current location',
    lat: parseFloat(zipcodeJson[localStorage["Zipcode"]][1]),
    lng: parseFloat(zipcodeJson[localStorage["Zipcode"]][0]),
}

function ProtestPg() {
  return (
    <div className="Protests">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#title">ProtestPlots</Navbar.Brand>
          <Nav className="me-auto" activeKey="/protestpg">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/protestpg">Find Protests</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <MapSection location={location} zoomLevel={15} /> {}
      <SidebarSection />
    </div>
  )
}
export default (ProtestPg)