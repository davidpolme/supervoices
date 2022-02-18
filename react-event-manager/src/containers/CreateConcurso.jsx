import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form } from 'react-bootstrap';
import Axios from "axios";
import { DateTime } from 'react-datetime-bootstrap';


class CreateConcurso extends React.Component{
      constructor(props) {
            super(props);
            this.state = {
              nombre: "",
              url:"",
              valor:"",
              guion:"",
              recomendaciones:""
          };
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
        .post("http://127.0.0.1:5000/api/registrarConcursos", data)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    };

  render(){
     return(
      <div>
      <Container className="p-3">
               <h1 className="header">Registra un concurso</h1>
                 Supervoices
                 <span role="img" aria-label="tada">
                   🎉
                 </span>
       </Container>
       <Container>
             <Form  onSubmit={this.handleSubmit}>
                 <Form.Group className="mb-3" controlId="formBasicEmail">
                   <Form.Label>Nombra el concurso</Form.Label>
                   <Form.Control type="input" placeholder="Nombre del concurso" value={this.state.nombre} 
                   onChange={this.onNombreChange} />
                 </Form.Group>

                 <Form.Group className="mb-3" controlId="formBasicEmail">
                   <Form.Label>Dirección Url</Form.Label>
                   <Form.Control type="input" placeholder="url"  value={this.state.url} 
                   onChange={this.onUrlChange} />
                 </Form.Group>

                 <Form.Group className="mb-3" controlId="formBasicEmail">
                   <Form.Label>Valor</Form.Label>
                   <Form.Control type="number" placeholder="valor"  value={this.state.valor} 
                   onChange={this.onValorChange} />
                 </Form.Group>

                 <Form.Group className="mb-3" controlId="formBasicEmail">
                   <Form.Label>Recomendaciones</Form.Label>
                   <Form.Control type="text" placeholder="Escribe recomendaciones"   value={this.state.recomendaciones}  
                   onChange={this.onRecomendacionesChange}/>
                 </Form.Group>

               <Form.Group className="mb-3" controlId="formBasicPassword">
                 <Form.Label>Fecha Inicio</Form.Label>
                 <DateTime pickerOptions={{format:"LL"}} value=""  />
               </Form.Group>

               <Form.Group className="mb-3" controlId="formBasicPassword">
                 <Form.Label>Fecha Fin</Form.Label>
                 <DateTime pickerOptions={{format:"LL"}} value=""  />
               </Form.Group>

               <Button variant="primary" type="submit">
                 Submit
               </Button>
               </Form>
       </Container>
</div>

     )

  }


}


export default CreateConcurso

// export default function CreateConcurso() {
//         constructor(props) {
//           super(props);
//           this.state = {
//               data_concursos: [],
//               DataisLoaded: false
//           };
//       }



//   return (

//   )
// }
