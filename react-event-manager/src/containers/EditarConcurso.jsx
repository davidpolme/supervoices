import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form } from 'react-bootstrap';
import Axios from "axios";
import { DateTime } from 'react-datetime-bootstrap';


class EditarConcurso extends React.Component{

        constructor(props) {
            super(props);
            this.state = {
                nombre: "",
                url:"",
                valor:"",
                guion:"",
                recomendaciones:"",
                id_concurso: parseInt(window.location.search.substring(1))
            };
        }

      listData(e) {
          console.log("numero de mi concurso")
          console.log(this.state.id_concurso)
          Axios.get('http://127.0.0.1:5000/api/registrarConcursos/{0}'.replace("{0}",this.state.id_concurso), {
              headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
              },
              responseType: "json",
          })
          .then((response) => {

              console.log(response.data.nombre);
              this.setState({ 
                nombre: response.data.nombre,
                url: response.data.url,
                valor: response.data.valor,
                guion: response.data.guion,
                recomendaciones: response.data.recomendaciones
               });
              });
    }

    componentDidMount() {
      this.listData()
    }

    onNombreChange = e => {
      this.setState({
        nombre: e.target.value
      });
    };
  
    onUrlChange = e => {
      this.setState({
        url: e.target.value
      });
    };

    onValorChange = e => {
      this.setState({
        valor: e.target.value
      })
    }

    onRecomendacionesChange = e => {
      this.setState({
        recomendaciones: e.target.value
      })
    }

    handleSubmit = e => {
      console.log("handleSubmti")
      console.log(this.state);
      e.preventDefault();
      const data = {
        nombre: this.state.nombre,
        url: this.state.url,
        valor: this.state.valor,
        guion: this.state.guion,
        recomendaciones: this.state.recomendaciones,
        frontEndUrl: "www.supervoices.com",
        creadopor: "admin"
      };
      Axios
        .put("http://127.0.0.1:5000/api/registrarConcursos/{0}".replace("{0}",this.state.id_concurso), data)
        .then(res => alert("El concurso se ha editado"))
        .catch(err => console.log(err));
    };

  render(){
     return(
      <div>
      <Container className="p-3">
               <h1 className="header">Edita el concurso: {this.state.nombre}</h1>
                 Supervoices
                 <span role="img" aria-label="tada">
                   🎉
                 </span>
       </Container>
       <Container>
             <Form  onSubmit={this.handleSubmit}>
                 <Form.Group className="mb-3" controlId="formBasicEmail">
                   <Form.Label>Edita el nombre del concurso</Form.Label>
                   <Form.Control type="input" placeholder="Nombre del concurso" value={this.state.nombre} 
                   onChange={this.onNombreChange} />
                 </Form.Group>

                 <Form.Group className="mb-3" controlId="formBasicEmail">
                   <Form.Label>Edita la Dirección Url</Form.Label>
                   <Form.Control type="input" placeholder="url"  value={this.state.url} 
                   onChange={this.onUrlChange} />
                 </Form.Group>

                 <Form.Group className="mb-3" controlId="formBasicEmail">
                   <Form.Label>Edita el Valor</Form.Label>
                   <Form.Control type="input" placeholder="valor"  value={this.state.valor} 
                   onChange={this.onValorChange} />
                 </Form.Group>

                 <Form.Group className="mb-3" controlId="formBasicEmail">
                   <Form.Label>Recomendaciones</Form.Label>
                   <Form.Control type="text" placeholder="Escribe recomendaciones"   value={this.state.recomendaciones}  
                   onChange={this.onRecomendacionesChange}/>
                 </Form.Group>

               {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                 <Form.Label>Fecha Inicio</Form.Label>
                 <DateTime pickerOptions={{format:"LL"}} value=""  />
               </Form.Group>

               <Form.Group className="mb-3" controlId="formBasicPassword">
                 <Form.Label>Fecha Fin</Form.Label>
                 <DateTime pickerOptions={{format:"LL"}} value=""  />
               </Form.Group> */}

               <Button variant="primary" type="submit">
                  Submit
               </Button>
               </Form>
       </Container>
</div>

     )

  }


}


export default EditarConcurso


