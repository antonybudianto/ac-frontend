import React, { useEffect, useState } from 'react';

import firebase from 'firebase/app';
import 'firebase/firestore';

function IslandView({ match }) {
  const [island, setIsland] = useState(null);

  useEffect(() => {
    const db = firebase.firestore();
    db.collection('islands')
      .doc(match.params.name)
      .get()
      .then((res) => {
        const data = res.data();
        setIsland({ ...data, id: res.id, diy: data.diy || [] });
      });
  }, [match.params.name]);

  return (
    <div className="container">
      {island ? (
        <>
          <div
            className="jumbotron text-center"
            style={{
              height: '280px',
              backgroundSize: 'cover',
              backgroundImage: `url(${island.cover})`,
            }}
          ></div>
          <div className="py-5 px-5 bg-light">
            <h1>{island.name}</h1>
            <div>{island.fruit} fruit</div>
          </div>
          <div className="py-5 px-5 bg-light">
            <h3>Gallery</h3>
            <div className="gallery-container">
              {(island.gallery || []).map((g, i) => {
                if (!g) {
                  return <div key={i} className="gallery-img img-empty"></div>;
                }
                return (
                  <div
                    key={i}
                    className="gallery-img"
                    style={{
                      backgroundImage: `url(${g})`,
                      backgroundSize: 'cover',
                    }}
                  ></div>
                );
              })}
            </div>
          </div>
          <div className="py-5 px-5 bg-light">
            <h3>Free Items/DIY</h3>
            <div>
              {island.diy.map((d, i) => (
                <div key={i}>{d}</div>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default IslandView;
