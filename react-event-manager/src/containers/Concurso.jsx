import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container } from 'react-bootstrap';
import Axios from "axios";


class Concurso extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data_postulaciones: [],
            DataisLoaded: false
        };
    }

    listData(e) {
        Axios.get('http://127.0.0.1:5000/api/locutores', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
            responseType: "json",
        })
            .then((response) => {
                this.setState({ data_postulaciones: response.data, DataisLoaded: true });
                console.log(this.state.data_postulaciones)
            });
    }




    componentDidMount() {
        this.listData()
    }

    render() {
        const { data_postulaciones, DataisLoaded } = this.state;
        if (!DataisLoaded) return (
            <div>
                <h1> Los datos se están cargando... </h1>
            </div>);
        return (
            <Container>
                <br />
                <Button color="success">Crear postulación</Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre Completo</th>
                            <th>Email</th>
                            <th>Observaciones</th>
                            <th>nombreArchivo</th>
                            <th>Audio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data_postulaciones.map(postulacion => {
                            return (
                                <tr key={postulacion.id}>
                                    <td>{postulacion.id}</td>
                                    <td>{postulacion.nombre + " " + postulacion.apellido}</td>
                                    <td>{postulacion.email}</td>
                                    <td>{postulacion.observaciones}</td>
                                    <td>{postulacion.nombreArchivo}</td>
                                    <td>
                                        <audio controls>
                                            {/* TODO */}
                                            <source src={postulacion.pathArchivo}/>
                                        </audio>

                                    </td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </Table>
            </Container>
        )
    }
}


export default Concurso