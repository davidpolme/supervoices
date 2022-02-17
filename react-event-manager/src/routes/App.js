import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Home from '../containers/Home';
import Login from '../containers/Login';
import Register from '../containers/Register';
import NotFound from '../containers/NotFound';
import Layout from '../assets/components/Layout';
//import Home from '../containers/Home';
import Dashboard from '../containers/Dashboard';
import Concurso from '../containers/Concurso';

const App = () => (
    <BrowserRouter>
        <Layout>
            <Routes>
                <Route exact path="/" element={<Dashboard />} />
                <Route exact path="/concurso" element={<Concurso />} />
                <Route exact path="/concurso/*" element={<Concurso />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Layout>
    </BrowserRouter>
);

export default App;