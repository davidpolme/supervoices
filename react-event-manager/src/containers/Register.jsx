import React from 'react';
import '../assets/styles/register.css';
import { Link } from 'react-router-dom';


const Register = () => (
	<section className='register'>
		<section className='register__container'>
			<h2>Regístrate</h2>
			<form className='register__container--form'>
				<input className='input' type='text' placeholder='Nombre' />
				<input className='input' type='text' placeholder='Correo' />
				<input className='input' type='password' placeholder='Contraseña' />
				<button className='button'>Registrarme</button>
			</form>
			<p className='login__container--register'>
				¿Ya tienes cuenta? 
				<Link to="/login"> Inicia Sesión</Link>
			</p>
		</section>
	</section>
);

export default Register;