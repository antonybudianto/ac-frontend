import React from 'react';
import { Link } from 'react-router-dom';

import './LandingView.css';

const LandingView = () => (
  <div className="landingcontainer" style={{}}>
    <div className="row">
      <div className="col-md-12 mt-3">
        <section
          className="jumbotron text-center"
          style={{
            background: 'none',
          }}
        >
          <div className="container">
            <h1 className="jumbotron-heading bg-black-op text-white">
              Animal Crossing Hub
            </h1>
            <p
              className="lead text-white bg-black-op"
              style={{
                display: 'inline-block',
                paddingLeft: '15px',
                paddingRight: '15px',
                borderRadius: '20px',
              }}
            >
              Your one stop Animal Crossing hub!
            </p>
            <p>
              <Link to="/islands" className="btn btn-primary">
                Explore!
              </Link>
            </p>
          </div>
        </section>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="card text-white custom-card mb-3">
                <div className="card-body">
                  <h4 className="card-title">Share</h4>
                  <p className="card-text">Share your DIY, items, etc.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-white custom-card mb-3">
                <div className="card-body">
                  <h4 className="card-title">Events</h4>
                  <p className="card-text">
                    Visit various events like giveaways, wedding, tour, etc.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-white custom-card mb-3">
                <div className="card-body">
                  <h4 className="card-title">Free</h4>
                  <p className="card-text">Register for free, and forever!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer
          className="text-muted"
          style={{
            width: '80%',
            margin: 'auto',
          }}
        >
          <div
            className="container"
            style={{
              display: 'flex',
              justifyContent: 'center',
              background: 'white',
              padding: '5px',
              borderRadius: '10px',
            }}
          >
            <p>&copy; 2020. AnimalCrossingHub. by Antony Budianto. </p>
          </div>
        </footer>
      </div>
    </div>
  </div>
);

export default LandingView;
