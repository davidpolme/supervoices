import React from "react";
import '../assets/styles/login.css';
import {Link} from 'react-router-dom';

const Login = () => (

    <section className='login'>
		<section className='login__container'>
			<h2>Inicia sesión</h2>
			<form className='login__container--form'>
				<input className='input' type='text' placeholder='Correo' />
				<input className='input' type='password' placeholder='Contraseña' />
				<button className='button'>Iniciar sesión</button>
				<div className='login__container--remember-me'>
					<a href='/'>Olvidé mi contraseña</a>
				</div>
			</form>
			
			<p className='login__container--register'>
				No tienes ninguna cuenta 
				<Link to="/register"> Regístrate</Link> 
			</p>
		</section>
	</section>

);

export default Login;