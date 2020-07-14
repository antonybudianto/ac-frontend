import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/firestore';

function IslandExploreView(props) {
  const [loading, setLoading] = useState(false);
  const [islands, setIslands] = useState([]);

  useEffect(() => {
    setLoading(true);
    const db = firebase.firestore();
    db.collection('islands')
      .get()
      .then((res) => {
        const list = [];
        res.forEach((doc) => {
          const data = doc.data();
          list.push({ id: doc.id, ...data });
        });
        setIslands(list);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 mt-3">
          <h1>Explore islands</h1>
          <div className="mt-5">
            {loading && (
              <div className="spinner-grow" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )}
            {islands.map((is, i) => (
              <div key={i} className="card mb-3" style={{ maxWidth: '840px' }}>
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <img src={is.cover} className="card-img" alt="..." />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <div className="card-title">
                        <Link to={`/island/${is.id}`}>{is.name}</Link>
                      </div>
                      <p className="card-text">{is.description}</p>
                      <p className="card-text">
                        <small className="text-muted">{is.fruit} fruit.</small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default IslandExploreView;
