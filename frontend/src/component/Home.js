import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='container'>
      {/* Navigation Bar */}
    

      {/* Hero Section */}
      <div className="hero-section bg-primary text-white text-center py-5 mb-4">
      <div className="container">
          <h1 className="display-4 fw-bold mb-3">Welcome to WhatBytes</h1>
          <p className="lead mb-4">
            WhatBytes is a tech studio combining tech expertise with creative innovation. We drive digital transformation, making cutting-edge technology accessible and impactful.
          </p>
          <a href="/get-started" className="btn btn-light btn-lg">Get Started</a>
        </div>
      </div>

      {/* About Section */}
      <section className="py-5">
        <div className="container">
          <div className="row text-center align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <div className="p-4 bg-light rounded shadow-sm">
                <h2 className="display-4 mb-3">About Us</h2>
                <p className="lead mb-4">
                  WhatBytes is a tech studio that combines technical expertise with creative innovation. Our mission is to make cutting-edge technology accessible and impactful for businesses of all sizes.
                </p>
                <p className="mb-4">
                  Founded by industry veterans with a track record of success, including Y Combinator backing and Forbes 30 Under 30 recognition, we are committed to delivering high-quality solutions tailored to your needs.
                </p>
                <a href="/services" className="btn btn-primary btn-lg">Learn More</a>
              </div>
            </div>
            <div className="col-md-6">
              <img
                src="https://cdn.prod.website-files.com/65cb431fbaab685eab1f5470/65cb431fbaab685eab1f5530_about-01.jpg"
                alt="WhatBytes"
                className="img-fluid rounded"
                style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

    
    <div className="row text-center">
        <div className="col-md-4 mb-4">
          <div className="card border-primary">
            <div className="card-body">
              <h5 className="card-title">Web Design</h5>
              <p className="card-text">Beautiful and functional websites that capture your brand's essence.</p>
              <a href="#" className="btn btn-primary">Learn More</a>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card border-primary">
            <div className="card-body">
              <h5 className="card-title">App Design</h5>
              <p className="card-text">User-centric mobile applications delivering exceptional experiences.</p>
              <a href="#" className="btn btn-primary">Learn More</a>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card border-primary">
            <div className="card-body">
              <h5 className="card-title">DevOps</h5>
              <p className="card-text">Efficient development and operations practices to streamline workflows.</p>
              <a href="#" className="btn btn-primary">Learn More</a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <div className="container">
          <p className="mb-0">&copy; 2024 WhatBytes. All rights reserved.</p>
          <Link className="text-white" to="/privacy-policy">Privacy Policy</Link> | 
          <Link className="text-white" to="/terms-of-service">Terms of Service</Link>
        </div>
      </footer>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    </div>
  );
};

export default Home;
