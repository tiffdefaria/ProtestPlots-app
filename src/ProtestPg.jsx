import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {withRouter} from 'react-router';
import MapSection from './components/map/Map'
import SidebarSection from './components/sidebar/sidebar-section'
import { Container } from "semantic-ui-react";
import './ProtestPg.css'

const location = {
    address: 'University of Florida',
    lat: 29.650721,
    lng: -82.349792,
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
          </Nav>
        </Container>
      </Navbar>
      <MapSection location={location} zoomLevel={17} /> {}
      <SidebarSection />
    </div>
  )
}
export default withRouter(ProtestPg)