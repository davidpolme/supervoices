import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../containers/Home';
import Login from '../containers/Login';
import Register from '../containers/Register';
import NotFound from '../containers/NotFound';
import Layout from '../assets/components/Layout';
import Dashboard from '../containers/Dashboard';
import Concurso from '../containers/Concurso';
import CreateConcurso from '../containers/CreateConcurso';
import Postulacion from '../containers/Postulacion';

const App = () => (
    <BrowserRouter>
        <Layout>
            <Routes>
                <Route exact path="/" element={<Home />} forceRefresh={true} />
                <Route exact path="/home" element={<Home />}/>
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path="/concurso/*" element={<Concurso />} />
                <Route exact path="/createconcurso/*" element={<CreateConcurso />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/postulacion/*" element={<Postulacion />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Layout>
    </BrowserRouter>
);

export default App;
