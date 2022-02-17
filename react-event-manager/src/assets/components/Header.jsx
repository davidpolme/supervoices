import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/header.css'

const Header = () => (
    <header className="header">
        <div className="header__menu">
            <Link to="/register">Regístrate</Link>
            <Link to="/login">Inicia Sesión</Link>
            <Link to="/">Inicio</Link>
        </div>
    </header>

);

export default Header;