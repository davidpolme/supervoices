import React, {useState} from 'react';
import '../assets/styles/register.css';
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import {useNavigate} from 'react-router-dom';

export const Register = () => {
	const [email, setEmail]=useState();
	const [clave, setClave]=useState();
	const [nombre, setNombre]=useState();
	const [apellido, setApellido]=useState();
	const navigate=useNavigate();

	const handleClick=(e)=>{
		const opts={
			method: "POST",
			headers:{
				"Content-Type":"application/json",
				'Access-Control-Allow-Origin' : '*',
			},
			body: JSON.stringify({
				"nombre":nombre,
				"apellido":apellido,
				"email":email,
				"clave":clave
			})
		};
		fetch('http://127.0.0.1:5000/api/registrarAdmin', opts)
		.then(resp=>resp.json())
		.then(navigate('/login'))
		.catch(error=>{
			console.error("There was an error", error);
		})
	}
	return (
		<section className='register'>
			<section className='register__container'>
				<h2>Regístrate</h2>
				<form className='register__container--form'>
					<input className='input' type='text' placeholder='Nombre' value={nombre} onChange={(e)=> setNombre(e.target.value)}/>
					<input className='input' type='text' placeholder='Apellido' value={apellido} onChange={(e)=> setApellido(e.target.value)}/>
					<input className='input' type='text' placeholder='Correo' value={email} onChange={(e)=> setEmail(e.target.value)}/>
					<input className='input' type='password' placeholder='Contraseña' value={clave} onChange={(e)=> setClave(e.target.value)}/>
					<Button className='button' onClick={handleClick}>Registrarme</Button>
				</form>
				<p className='login__container--register'>
					¿Ya tienes cuenta? 
					<Link to="/login"> Inicia Sesión</Link>
				</p>
			</section>
		</section>
	);
};

export default Register;
