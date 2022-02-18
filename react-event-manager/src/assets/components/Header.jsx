import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/header.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, NavDropdown,Nav } from 'react-bootstrap';

const Header = () => (
    
        <Navbar bg="light" expand="lg">
               
                <Navbar.Brand href="#home">Super voices</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    <Nav.Link href="/register">Registrate</Nav.Link>
                    <Nav.Link href="/login">Inicia sesión</Nav.Link>
                    <Nav.Link href="/">Inicio</Nav.Link>

                    </Nav>
                </Navbar.Collapse>
                <br />
        </Navbar>


);

export default Header;