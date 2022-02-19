import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form } from 'react-bootstrap';
import Axios from "axios";
import '../assets/styles/postulacion.css';
// import {useNavigate} from 'react-router-dom';



class Postulacion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      apellido: "",
      email: "",
      observaciones: "",
      nombreArchivo: "",
      extensionArchivo: "",
      pathArchivo: "",
      tipoArchivo: "",
      id_concurso: "",
    };
    this.getIdConcurso();
  }


  getIdConcurso = () =>{
    var urlPersonalizada = window.location.search.substring(1)
    
    Axios.get('http://127.0.0.1:5000/api/registrarConcursos', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Authorization': 'Bearer '+sessionStorage.token
            },
            responseType: "json",
        })
        // commparo si en el arreglo de concursos existe alguno con esa url personalziada. después verifico cuál es el id de ese concurso y retorno el id del concurso concurso
        .then((response) => {
                var responseData = response.data.concursos
                var idEncontrado = -1;
                for (let concurso = 0; concurso < responseData.length; concurso++) {
                  if (responseData[concurso].url === urlPersonalizada){
                    idEncontrado = responseData[concurso].id
                    break;
                  }
                }
                
                this.setState({ id_concurso: idEncontrado}) 
            });
  }

  onNombreChange = e => {
    this.setState({
      nombre: e.target.value
    });
  };

  onApellidoChange = e => {
    this.setState({
      apellido: e.target.value
    });
  };

  onEmailChange = e => {
    this.setState({
      email: e.target.value
    })
  }

  onObservacionesChange = e => {
    this.setState({
      observaciones: e.target.value
    })
  }
  handleSubmit = e => {
    // const navigate=useNavigate();
    e.preventDefault();
    
    const opts={
			method: "POST",
			headers:{
				"Content-Type":"application/json",
				'Access-Control-Allow-Origin' : '*',
			},
			body: JSON.stringify({
        nombre: this.state.nombre,
        apellido: this.state.apellido,
        email: this.state.email,
        observaciones: this.state.observaciones,
        nombreArchivo:'ytru',
        extensionArchivo:'yu',
        pathArchivo:'tyu',
        tipoArchivo:'audio',
        id_concurso: this.state.id_concurso
			})
			
		};
		fetch('http://127.0.0.1:5000/api/locutores', opts)
		.then(resp=>resp.json())
		.then(data=>{
			// sessionStorage.setItem("token",data.access_token)

		})
		// .then(navigate('/'))
    .then(alert("Usuario Creado"))
		.catch(error=>{
			console.error("There was an error", error);
		})

  }

  render() {
    return (
      <div>
        <Container className="p-3">
          <h1 className="header">Registra tu postulacion</h1>
          Supervoices
          <span role="img" aria-label="tada">
            🎉
          </span>
        </Container>
        <Container>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="input" placeholder="Nombre" value={this.state.nombre}
                onChange={this.onNombreChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Apellido</Form.Label>
              <Form.Control type="input" placeholder="Apellido" value={this.state.apellido} 
                onChange={this.onApellidoChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="input" placeholder="Email" value={this.state.email}
                onChange={this.onEmailChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Observaciones</Form.Label>
              <Form.Control type="input" placeholder="Observaciones" value={this.state.observaciones}
                onChange={this.onObservacionesChange} />
            </Form.Group>

            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupFileAddon01">
                  Upload
                </span>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  accept=".avi, .wav, .mp3, .AVI, .WAV, .MP3"
                  // accept="audio/
                  className="custom-file-input"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                />
                <label className="custom-file-label" htmlFor="inputGroupFile01">
                  Extenciones permitidas: .AVI .WAV .MP3
                </label>
              </div>
            </div>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </div>

    )

  }


}


export default Postulacion
