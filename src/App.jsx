import React from 'react'
import ZipcodeSection from './components/zipcode/zipcode-section'
import MapSection from './components/map/Map'
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './App.css'

const location = {
  address: 'University of Florida',
  lat: 29.650721,
  lng: -82.349792,
}

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#title">ProtestPlots</Navbar.Brand>
          <Nav activeKey="/home" onSelect={(selectedKey) => Map}>
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/protestpg">Find Protests</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <MapSection location={location} zoomLevel={17} /> {}
      <ZipcodeSection />
    </div>
  )
}
export default App