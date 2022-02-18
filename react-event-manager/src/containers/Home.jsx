import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-icons';

import '../assets/styles/home.css';
const Home = () => {
  return (
    <>
      <section id="hero-static" className="hero-static d-flex align-items-center">
        <div className="container d-flex flex-column justify-content-center align-items-center text-center position-relative" data-aos="zoom-out">
          <h2>Bienvenidos a <span>SUPERVOICES</span></h2>
          <p>El super concurso de voces</p>
        </div>
      </section>

      <main id="main">
        <section id="featured-services" className="featured-services">
          <div className="container">

            <div className="row gy-4">

              <div className="col-xl-3 col-md-6 d-flex" data-aos="zoom-out">
                <div className="service-item position-relative">
                  <div className="icon"><i className="bi bi-activity icon"></i></div>
                  <h4><a href="/" className="stretched-link">Lorem Ipsum</a></h4>
                  <p>Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi</p>
                </div>
              </div>

              <div className="col-xl-3 col-md-6 d-flex" data-aos="zoom-out" data-aos-delay="200">
                <div className="service-item position-relative">
                  <div className="icon"><i className="bi bi-bounding-box-circles icon"></i></div>
                  <h4><a href="/" className="stretched-link">Sed ut perspici</a></h4>
                  <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</p>
                </div>
              </div>

              <div className="col-xl-3 col-md-6 d-flex" data-aos="zoom-out" data-aos-delay="400">
                <div className="service-item position-relative">
                  <div className="icon"><i className="bi bi-calendar4-week icon"></i></div>
                  <h4><a href="/" className="stretched-link">Magni Dolores</a></h4>
                  <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia</p>
                </div>
              </div>

              <div className="col-xl-3 col-md-6 d-flex" data-aos="zoom-out" data-aos-delay="600">
                <div className="service-item position-relative">
                  <div className="icon"><i className="bi bi-broadcast icon"></i></div>
                  <h4><a href="/" className="stretched-link">Nemo Enim</a></h4>
                  <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis</p>
                </div>
              </div>

            </div>

          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
