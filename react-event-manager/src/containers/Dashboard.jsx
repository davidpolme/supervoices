import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container } from 'react-bootstrap';
import Axios from "axios";


class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            DataisLoaded: false
        };
    }


    listData(e){
        Axios.get('http://127.0.0.1:5000/locutores',{
            headers: { 
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
              },
              responseType: "json",
    })
    .then((response) => {
        console.log(response.email);
        console.log(response.apellido);
        console.log(response.nombre);
      });
    }



    
    componentDidMount() {
        this.listData()
    }

    render() {
        const { DataisLoaded, items } = this.state;
        if (!DataisLoaded) return (
            <div>
                <h1> Los datos se están cargando... </h1>
            </div>);
        return (
            <Container>
                <br />
                <Button color="success">Agregar audio</Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Locutor</th>
                            <th>Nombre del audio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((postulacion) =>
                            <tr>
                                <td>{postulacion.id}</td>
                                <td>{postulacion.nombre}]</td>
                                <td>{postulacion.observaciones}</td>
                                <td>
                                    <button color="primary">Editar</button>{" "}
                                    <button color="ddanger">Eliminar</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Container>
        )
    }
}


export default Dashboard