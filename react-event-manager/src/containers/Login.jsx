import React, {useState} from "react";
import '../assets/styles/login.css';
import {Link} from 'react-router-dom';
import { Button } from "react-bootstrap";
import {useNavigate} from 'react-router-dom';

export const Login = () => {
	const [email, setEmail]=useState();
	const [clave, setClave]=useState();
	const token = sessionStorage.getItem("token");
	const navigate=useNavigate();

	const handleClick=(e)=>{
		const opts={
			method: "POST",
			headers:{
				"Content-Type":"application/json",
				'Access-Control-Allow-Origin' : '*',
			},
			body: JSON.stringify({
				"email":email,
				"clave":clave
			})
			
		};
		fetch('http://127.0.0.1:5000/api/login', opts)
		.then(resp=>resp.json())
		.then(data=>{
			sessionStorage.setItem("token",data.access_token)

		})
		.then(navigate('/concurso'))
		.catch(error=>{
			console.error("There was an error", error);
		})


	}

	return(
		<section className='login'>
		<section className='login__container'>
			<h2>Inicia sesión</h2>
			{token && token !=="" && token !== undefined ?("You are logged in with this token: "+token) : (
			<form className='login__container--form'>
				<input className='input' type='text' placeholder='Correo' value={email} onChange={(e)=> setEmail(e.target.value)}/>
				<input className='input' type='password' placeholder='Contraseña' value={clave} onChange={(e)=> setClave(e.target.value)}/>
				<Button className='button' onClick={handleClick}>Iniciar sesión</Button>
				<div className='login__container--remember-me'>
					<a href='/'>Olvidé mi contraseña</a>
				</div>
			</form>
			)}
			<p className='login__container--register'>
				No tienes ninguna cuenta 
				<Link to="/register"> Regístrate</Link> 
			</p>
		</section>
	</section>
	);
};

export default Login;
