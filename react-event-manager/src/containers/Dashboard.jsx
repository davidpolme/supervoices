import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container } from 'react-bootstrap';
import '../assets/styles/dashboard.css';
import Axios from "axios";
// import Concurso from "./Concurso";
import { Link } from 'react-router-dom';


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data_concursos: [],
            DataisLoaded: false
        };
    }


    listData(e) {
        Axios.get('http://127.0.0.1:5000/api/registrarConcursos', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Authorization': 'Bearer ' + sessionStorage.token
            },
            responseType: "json",
        })
            .then((response) => {
                this.setState({ data_concursos: response.data.concursos, DataisLoaded: true });
            });
    }


    deleteConcurso(concurso_id) {
        

        Axios.delete(`http://127.0.0.1:5000/api/registrarConcursos/${concurso_id}`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Authorization': 'Bearer ' + sessionStorage.token
            }
        }).then(alert("Concurso Eliminado, Refrescar página"))
    }



    componentDidMount() {
        this.listData()
    }

    render() {
        const { DataisLoaded } = this.state;
        if (!DataisLoaded) return (
            <div>
                <h1> Los datos se están cargando... </h1>
            </div>);
        return (
            <Container>
                <br />
                <Link className="btn-primary" to={"/CreateConcurso"} > Crear Concurso </Link>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre del concurso</th>
                            <th>Fecha Inicio</th>
                            <th>Fecha Fin</th>
                            <th>URL</th>
                            <th>Costo de inscripción</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data_concursos.map(concurso => {
                            return (
                                <tr key={concurso.id}>
                                    <td>{concurso.id}</td>
                                    <td>{concurso.nombre}]</td>
                                    <td>{concurso.fechainicio}</td>
                                    <td>{concurso.fechafin}</td>
                                    <td>{concurso.url}</td>
                                    <td>{concurso.valor}</td>
                                    <td>
                                        <Link className="btn-primary" to={"/Concurso/?" + concurso.id} > Ver </Link>
                                        <Button className="btn-primary" onClick={() => this.deleteConcurso(concurso.id)} > Eliminar </Button>
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


export default Dashboard